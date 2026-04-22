import { getRppTemplate } from "@/lib/rpp-templates";
import type { GenerateRppValues } from "@/schemas/generate-rpp";

function section(title: string, items: Array<[string, string | undefined]>) {
  const content = items
    .filter(([, value]) => Boolean(value?.trim()))
    .map(([label, value]) => `- ${label}: ${value}`)
    .join("\n");

  return content ? `## ${title}\n${content}` : "";
}

export function buildRppPrompt(payload: GenerateRppValues) {
  const template = getRppTemplate(payload.curriculum);

  const curriculumSpecificRules =
    payload.curriculum === "kurikulum-2013"
      ? [
          "Gunakan heading persis: Identitas, Kompetensi dan Tujuan Pembelajaran, Pendekatan / Metode Pembelajaran, Media/Alat/Bahan, Langkah Pembelajaran, Asesmen.",
          "Di dalam section Langkah Pembelajaran, gunakan subheading: Pendahuluan, Kegiatan Inti, Penutup.",
          "Jangan menambahkan section Materi dalam bentuk apa pun.",
        ]
      : [
          "Gunakan heading persis: Identitas, Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur Tujuan Pembelajaran (ATP), Metode Pembelajaran, Media/Alat/Bahan, Asesmen, Materi.",
          "Section Materi wajib ada dan harus diisi secara ringkas, jelas, dan relevan dengan topik.",
          "Gunakan istilah CP, TP, dan ATP secara konsisten tanpa mengganti namanya.",
          "Pada Identitas, tampilkan alokasi waktu agar format terasa lebih dekat dengan dokumen sekolah.",
        ];

  const systemPrompt = `Anda adalah AI Curriculum Designer dan penulis RPP profesional untuk konteks pendidikan Indonesia.

Tugas Anda adalah menyusun draft RPP yang utuh, rapi, mudah diedit ulang, dan mengikuti kurikulum yang dipilih user.

Aturan utama:
1. Prioritaskan instruksi eksplisit dari user.
2. Ikuti struktur section wajib dari template kurikulum yang diberikan.
3. Pertahankan nama heading persis sesuai template. Jangan mengganti, menambah, atau menghapus heading wajib.
4. Output harus langsung berupa markdown final, tanpa meta commentary, tanpa penjelasan tambahan, tanpa blok kode, dan tanpa HTML.
5. Gunakan heading yang rapi, bullet list seperlunya, dan tabel markdown sederhana hanya untuk identitas atau asesmen bila memang membantu.
6. Bila ada informasi yang tidak diberikan user, isi seperlunya dengan formulasi aman dan masuk akal tanpa detail fiktif berlebihan.
7. Pastikan asesmen, tujuan, metode, dan langkah pembelajaran tetap konsisten.
8. Susun dokumen agar nyaman dibaca di preview web dan mudah diedit ulang di Word.
9. Jangan menulis paragraf pengantar sebelum heading pertama.`;

  const userPrompt = [
    `Buat satu draft RPP dengan bahasa ${payload.outputLanguage}.`,
    `Gaya bahasa: ${payload.writingStyle}.`,
    `Tingkat detail: ${payload.detailLevel}.`,
    `Kurikulum terpilih: ${template.label}.`,
    section("Struktur wajib", [["Section yang harus ada", template.sections.join(", ")]]),
    section("Pedoman kurikulum", template.promptGuidance.map((item, index) => [`Aturan ${index + 1}`, item])),
    section("Aturan khusus template", curriculumSpecificRules.map((item, index) => [`Rule ${index + 1}`, item])),
    section("Identitas", [
      ["Nama sekolah / satuan pendidikan", payload.schoolName],
      ["Mata pelajaran", payload.subject],
      ["Kelas / fase", payload.gradeLevel],
      ["Semester", payload.semester],
      ["Topik / pokok bahasan", payload.topic],
      ["Tahun ajaran", payload.academicYear],
      ["Alokasi waktu", payload.timeAllocation],
    ]),
    section("Konten utama pembelajaran", [
      [payload.curriculum === "kurikulum-2013" ? "Kompetensi / capaian" : "Capaian pembelajaran (CP)", payload.learningOutcomes],
      [payload.curriculum === "kurikulum-2013" ? "Tujuan pembelajaran / indikator" : "Tujuan pembelajaran (TP)", payload.learningGoals],
      ["ATP / alur pembelajaran", payload.atp],
      ["Model pembelajaran", payload.learningModel],
      ["Metode pembelajaran", payload.teachingMethod],
      ["Media / alat / bahan", payload.learningMedia],
      ["Sumber belajar", payload.learningResources],
      ["Rencana asesmen", payload.assessmentPlan],
      ["Catatan tambahan dari user", payload.notesForAI],
    ]),
    "## Aturan output",
    "- Tampilkan hanya dokumen markdown final.",
    "- Heading harus dimulai dari `#` untuk judul utama dan `##` untuk section wajib.",
    "- Jangan gunakan blok kode ``` atau HTML.",
    "- Gunakan bullet list dengan tanda `-`, bukan `*`.",
    "- Buat tabel markdown sederhana untuk identitas dan asesmen agar rapi dan mudah diexport.",
    "- Gunakan gaya susunan yang menyerupai dokumen administrasi sekolah: identitas ringkas, isi utama sistematis, dan asesmen mudah dibaca.",
    payload.curriculum === "kurikulum-2013"
      ? "- Pastikan tidak ada heading atau section bernama Materi."
      : "- Pastikan section Materi ada sebagai heading `## Materi`.",
    `## Draft awal template\nGunakan struktur awal berikut sebagai acuan bentuk dokumen, tetapi isi ulang sesuai input user.\n\n${template.emptyMarkdown}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    systemPrompt,
    userPrompt,
  };
}
