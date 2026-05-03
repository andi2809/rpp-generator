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
  const isK13 = payload.curriculum === "kurikulum-2013";
  const isFullAi = payload.inputMode === "full-ai";

  const curriculumSpecificRules = isK13
    ? [
        "Gunakan heading persis: Identitas, Kompetensi Inti (KI), Kompetensi Dasar (KD), Indikator Pencapaian Kompetensi, Tujuan Pembelajaran, Materi Pembelajaran, Metode / Model / Pendekatan Pembelajaran, Media / Alat / Bahan / Sumber Belajar, Langkah-Langkah Pembelajaran, Penilaian, Remedial dan Pengayaan.",
        "Di dalam section Langkah-Langkah Pembelajaran, gunakan subheading: Pendahuluan, Kegiatan Inti, Penutup.",
        "Di dalam section Penilaian, gunakan subheading: Penilaian Sikap, Penilaian Pengetahuan, Penilaian Keterampilan.",
        "Gunakan KI/KD sebagai kerangka utama. Turunkan indikator dan tujuan pembelajaran dari KD secara runtut.",
        "Gunakan pendekatan saintifik secara eksplisit bila relevan dengan topik dan konteks pembelajaran.",
        "Jangan menjadikan CP, TP, ATP, atau istilah fase sebagai struktur utama dokumen.",
        "Format penilaian harus jelas, formal, dan terpisah per aspek.",
      ]
    : [
        "Gunakan heading persis: Identitas, Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur Tujuan Pembelajaran (ATP), Materi / Elemen yang Dipelajari, Karakteristik Peserta Didik, Metode / Model / Pendekatan Pembelajaran, Media / Alat / Bahan / Sumber Belajar, Strategi Diferensiasi, Langkah-Langkah Pembelajaran, Asesmen, Refleksi, Tindak Lanjut / Remedial / Pengayaan.",
        "Di dalam section Langkah-Langkah Pembelajaran, gunakan subheading: Kegiatan Awal, Kegiatan Inti, Kegiatan Penutup.",
        "Di dalam section Asesmen, gunakan subheading atau struktur yang jelas untuk: Asesmen Diagnostik, Asesmen Formatif, Asesmen Sumatif.",
        "Gunakan istilah CP, TP, dan ATP secara konsisten sebagai kerangka utama dokumen.",
        "Tekankan pembelajaran yang fleksibel, kontekstual, dan terdiferensiasi.",
        "Asesmen formatif harus terlihat sebagai bagian penting untuk mendukung perbaikan pembelajaran.",
        "Jangan menjadikan KI/KD sebagai struktur utama dokumen.",
        "Bila relevan, selaraskan pembelajaran dengan Profil Pelajar Pancasila secara wajar dan tidak dipaksakan.",
      ];

  const inputModeRules = isFullAi
    ? [
        "Mode input user adalah Isi Full AI.",
        "Anggap user sengaja memberi input sesingkat mungkin pada field utama.",
        "Jika ada bagian yang belum diisi user, Anda boleh melengkapinya secara aktif, wajar, dan pedagogis.",
        "Tetap prioritaskan konsistensi kurikulum, topik, tujuan, dan konteks yang sudah diberikan user.",
        "Jangan membuat isi terlalu generik; gunakan detail yang masuk akal sesuai mapel, kelas/fase, dan topik.",
      ]
    : [
        "Mode input user adalah Fully Custom.",
        "Anggap user ingin kontrol yang lebih tinggi terhadap isi RPP.",
        "Hormati arah isi user semaksimal mungkin dan jangan menimpa keputusan yang sudah jelas dari input user.",
        "Jika ada bagian yang kosong, lengkapi secara konservatif dan hanya seperlunya agar dokumen tetap utuh.",
        "Jangan menggeser fokus, struktur, atau detail yang sudah secara eksplisit diarahkan user.",
      ];

  const systemPrompt = `Anda adalah penyusun RPP profesional yang memahami perbedaan format, istilah, dan logika dokumen pembelajaran antara Kurikulum 2013 dan Kurikulum Merdeka di Indonesia.

Tugas Anda adalah membuat RPP sesuai kurikulum yang dipilih pengguna, dengan format, istilah, struktur, fokus pembelajaran, dan model asesmen yang benar-benar disesuaikan dengan kategori kurikulum tersebut.

Aturan umum:
1. Jangan mencampur istilah antar kurikulum.
2. Jika kurikulum = Kurikulum 2013, gunakan istilah dan struktur khas K13.
3. Jika kurikulum = Kurikulum Merdeka, gunakan istilah dan struktur khas Kurikulum Merdeka.
4. Output harus langsung berupa dokumen RPP final, bukan penjelasan teori.
5. Bahasa harus formal, rapi, profesional, dan layak digunakan guru.
6. Pastikan ada konsistensi antara tujuan, materi/elemen kompetensi, kegiatan pembelajaran, dan asesmen.
7. Jika ada data yang tidak diberikan pengguna, lengkapi sesuai perilaku mode input tanpa membuat isi terlalu generik.
8. Jangan membuat format hybrid antara K13 dan Kurikulum Merdeka.
9. Jangan menulis paragraf pengantar sebelum heading pertama.
10. Output harus berupa markdown final tanpa HTML, tanpa blok kode, dan tanpa meta commentary.`;

  const userPrompt = [
    `Buat satu draft RPP final dengan bahasa ${payload.outputLanguage}.`,
    `Gaya bahasa: ${payload.writingStyle}.`,
    `Tingkat detail: ${payload.detailLevel}.`,
    `Kurikulum terpilih: ${template.label}.`,
    `Mode input terpilih: ${isFullAi ? "Isi Full AI" : "Fully Custom"}.`,
    section("Struktur wajib", [["Section yang harus ada", template.sections.join(", ")]]),
    section("Pedoman kurikulum", template.promptGuidance.map((item, index) => [`Aturan ${index + 1}`, item])),
    section("Perilaku AI berdasarkan mode", inputModeRules.map((item, index) => [`Rule ${index + 1}`, item])),
    section("Aturan khusus template", curriculumSpecificRules.map((item, index) => [`Rule ${index + 1}`, item])),
    section("Identitas", [
      ["Nama sekolah / satuan pendidikan", payload.schoolName],
      ["Mata pelajaran", payload.subject],
      [isK13 ? "Kelas" : "Fase / kelas", payload.gradeLevel],
      ["Semester", payload.semester],
      ["Topik / pokok bahasan", payload.topic],
      ["Tahun ajaran", payload.academicYear],
      ["Alokasi waktu", payload.timeAllocation],
    ]),
    isK13
      ? section("Komponen utama K13", [
          ["Kompetensi acuan / ringkasan KI-KD", payload.learningOutcomes],
          ["Kompetensi Inti (KI)", payload.kompetensiInti],
          ["Kompetensi Dasar (KD)", payload.kompetensiDasar],
          ["Indikator pencapaian kompetensi", payload.indikatorKompetensi],
          ["Tujuan pembelajaran", payload.learningGoals],
          ["Materi pembelajaran", payload.material],
          ["Metode / pendekatan pembelajaran", payload.teachingMethod],
          ["Model pembelajaran", payload.learningModel],
          ["Media / alat / bahan", payload.learningMedia],
          ["Sumber belajar", payload.learningResources],
          ["Rencana penilaian", payload.assessmentPlan],
          ["Remedial dan pengayaan", payload.followUpPlan],
          ["Preferensi format", payload.formatPreference],
          ["Catatan tambahan dari user", payload.notesForAI],
        ])
      : section("Komponen utama Kurikulum Merdeka", [
          ["Capaian Pembelajaran (CP)", payload.learningOutcomes],
          ["Tujuan Pembelajaran (TP)", payload.learningGoals],
          ["Alur Tujuan Pembelajaran (ATP)", payload.atp],
          ["Materi / elemen yang dipelajari", payload.material],
          ["Karakteristik peserta didik", payload.studentCharacteristics],
          ["Metode / pendekatan pembelajaran", payload.teachingMethod],
          ["Model pembelajaran", payload.learningModel],
          ["Media / alat / bahan", payload.learningMedia],
          ["Sumber belajar", payload.learningResources],
          ["Strategi diferensiasi", payload.differentiationStrategy],
          ["Rencana asesmen", payload.assessmentPlan],
          ["Refleksi", payload.reflectionPlan],
          ["Tindak lanjut / remedial / pengayaan", payload.followUpPlan],
          ["Preferensi format", payload.formatPreference],
          ["Catatan tambahan dari user", payload.notesForAI],
        ]),
    "## Aturan output",
    "- Tampilkan hanya dokumen markdown final.",
    "- Heading harus dimulai dari `#` untuk judul utama dan `##` untuk section wajib.",
    "- Jangan gunakan blok kode ``` atau HTML.",
    "- Gunakan bullet list dengan tanda `-`, bukan `*`.",
    "- Gunakan tabel markdown sederhana untuk identitas dan asesmen/penilaian bila membantu kerapian dokumen.",
    isK13
      ? "- Pastikan KI/KD menjadi tulang punggung utama format dan jangan memakai CP/TP/ATP sebagai kerangka utama."
      : "- Pastikan CP/TP/ATP menjadi tulang punggung utama format dan jangan memakai KI/KD sebagai kerangka utama.",
    isFullAi
      ? "- Karena mode yang dipilih adalah Isi Full AI, lengkapi bagian yang kosong secara lebih aktif selama tetap konsisten dengan input utama."
      : "- Karena mode yang dipilih adalah Fully Custom, prioritaskan isi user dan lengkapi bagian yang kosong secara konservatif.",
    `## Draft awal template\nGunakan struktur awal berikut sebagai acuan bentuk dokumen, tetapi isi ulang sesuai input user.\n\n${template.emptyMarkdown}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    systemPrompt,
    userPrompt,
  };
}
