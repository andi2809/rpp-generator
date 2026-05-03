import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("[smoke] .env.local tidak ditemukan.");
  process.exit(1);
}

const envContent = readFileSync(envPath, "utf8");
for (const rawLine of envContent.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#") || !line.includes("=")) continue;
  const [key, ...rest] = line.split("=");
  process.env[key] = rest.join("=").trim();
}

if (!process.env.GROQ_API_KEY) {
  console.error("[smoke] GROQ_API_KEY belum diatur di .env.local.");
  process.exit(1);
}

if (!process.env.GROQ_MODEL) {
  console.error("[smoke] GROQ_MODEL belum diatur di .env.local.");
  process.exit(1);
}

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const delayMs = Number(process.env.SMOKE_DELAY_MS || 1500);

const cases = [
  {
    name: "merdeka-full-ai",
    payload: {
      curriculum: "kurikulum-merdeka",
      inputMode: "full-ai",
      schoolName: "SMA Contoh",
      subject: "Informatika",
      gradeLevel: "Fase E / Kelas X",
      semester: "Ganjil",
      topic: "Berpikir komputasional",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      kompetensiInti: "",
      kompetensiDasar: "",
      indikatorKompetensi: "",
      learningGoals: "Peserta didik mampu menjelaskan dekomposisi masalah dan menerapkannya pada studi kasus sederhana.",
      learningOutcomes: "Peserta didik memahami konsep dasar berpikir komputasional dan mampu menerapkannya dalam pemecahan masalah sederhana.",
      atp: "",
      material: "",
      studentCharacteristics: "",
      teachingMethod: "",
      learningModel: "",
      learningMedia: "",
      learningResources: "",
      differentiationStrategy: "",
      assessmentPlan: "",
      reflectionPlan: "",
      followUpPlan: "",
      formatPreference: "Gunakan format formal rapi.",
      notesForAI: "Lengkapi bagian kosong dengan tetap menjaga konteks mata pelajaran.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: [
      "## Capaian Pembelajaran (CP)",
      "## Tujuan Pembelajaran (TP)",
      "## Asesmen",
    ],
    mustNotInclude: ["## Kompetensi Inti (KI)", "## Kompetensi Dasar (KD)"],
  },
  {
    name: "merdeka-fully-custom",
    payload: {
      curriculum: "kurikulum-merdeka",
      inputMode: "fully-custom",
      schoolName: "SMA Contoh",
      subject: "Informatika",
      gradeLevel: "Fase E / Kelas X",
      semester: "Ganjil",
      topic: "Berpikir komputasional",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      kompetensiInti: "",
      kompetensiDasar: "",
      indikatorKompetensi: "",
      learningGoals: "Peserta didik mampu menjelaskan dekomposisi masalah dan menerapkannya pada studi kasus sederhana.",
      learningOutcomes: "Peserta didik memahami konsep dasar berpikir komputasional dan mampu menerapkannya dalam pemecahan masalah sederhana.",
      atp: "Eksplorasi masalah, diskusi kelompok, simulasi dekomposisi, dan latihan terstruktur.",
      material: "Dekomposisi masalah, pengenalan pola, abstraksi, dan algoritma sederhana.",
      studentCharacteristics: "Peserta didik memiliki kemampuan beragam, aktif berdiskusi, dan membutuhkan contoh kontekstual.",
      teachingMethod: "Diskusi kelompok, tanya jawab, dan problem based learning.",
      learningModel: "Problem Based Learning",
      learningMedia: "Laptop, proyektor, papan tulis, dan LKPD.",
      learningResources: "Buku Informatika kelas X, LKPD sekolah, dan contoh studi kasus harian.",
      differentiationStrategy: "Diferensiasi proses melalui pendampingan bertingkat dan diferensiasi produk melalui variasi tingkat kompleksitas tugas.",
      assessmentPlan: "Asesmen diagnostik awal singkat, asesmen formatif melalui observasi diskusi dan LKPD, asesmen sumatif melalui tugas individu.",
      reflectionPlan: "Guru dan peserta didik menuliskan refleksi singkat tentang strategi pemecahan masalah yang paling efektif.",
      followUpPlan: "Peserta didik yang belum tuntas mendapat bimbingan tambahan; yang sudah tuntas diberi tantangan studi kasus lanjutan.",
      formatPreference: "Gunakan format formal rapi dengan tabel pada identitas dan asesmen.",
      notesForAI: "Tekankan asesmen formatif dan diferensiasi secara nyata dalam langkah pembelajaran.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: [
      "## Capaian Pembelajaran (CP)",
      "## Tujuan Pembelajaran (TP)",
      "## Alur Tujuan Pembelajaran (ATP)",
      "## Strategi Diferensiasi",
      "## Asesmen",
      "## Refleksi",
      "## Tindak Lanjut / Remedial / Pengayaan",
    ],
    mustNotInclude: ["## Kompetensi Inti (KI)", "## Kompetensi Dasar (KD)"],
  },
  {
    name: "k13-full-ai",
    payload: {
      curriculum: "kurikulum-2013",
      inputMode: "full-ai",
      schoolName: "SMA Contoh",
      subject: "Bahasa Indonesia",
      gradeLevel: "Kelas XI",
      semester: "Genap",
      topic: "Teks prosedur",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      kompetensiInti: "",
      kompetensiDasar: "",
      indikatorKompetensi: "",
      learningGoals: "Peserta didik mampu menyusun teks prosedur dengan struktur dan kebahasaan yang tepat.",
      learningOutcomes: "Ringkasan KI/KD teks prosedur dan kompetensi menyusun teks prosedur.",
      atp: "",
      material: "",
      studentCharacteristics: "",
      teachingMethod: "",
      learningModel: "",
      learningMedia: "",
      learningResources: "",
      differentiationStrategy: "",
      assessmentPlan: "",
      reflectionPlan: "",
      followUpPlan: "",
      formatPreference: "Gunakan format administrasi sekolah yang formal dan sistematis.",
      notesForAI: "Lengkapi bagian kosong tanpa memakai CP, TP, atau ATP sebagai struktur utama.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: [
      "## Kompetensi Inti (KI)",
      "## Kompetensi Dasar (KD)",
      "## Penilaian",
    ],
    mustNotInclude: [
      "## Capaian Pembelajaran (CP)",
      "## Tujuan Pembelajaran (TP)",
      "## Alur Tujuan Pembelajaran (ATP)",
    ],
  },
  {
    name: "k13-fully-custom",
    payload: {
      curriculum: "kurikulum-2013",
      inputMode: "fully-custom",
      schoolName: "SMA Contoh",
      subject: "Bahasa Indonesia",
      gradeLevel: "Kelas XI",
      semester: "Genap",
      topic: "Teks prosedur",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      kompetensiInti: "KI-3 Memahami, menerapkan, dan menganalisis pengetahuan faktual, konseptual, dan prosedural. KI-4 Mengolah, menalar, dan menyaji dalam ranah konkret dan ranah abstrak.",
      kompetensiDasar: "KD 3.7 Menganalisis struktur dan kebahasaan teks prosedur. KD 4.7 Menyusun teks prosedur dengan memperhatikan struktur dan kebahasaan.",
      indikatorKompetensi: "Mengidentifikasi struktur teks prosedur, menjelaskan ciri kebahasaan, dan menyusun teks prosedur sederhana secara runtut.",
      learningGoals: "Peserta didik mampu menganalisis dan menyusun teks prosedur dengan struktur dan kebahasaan yang tepat.",
      learningOutcomes: "Pemahaman tentang struktur dan ciri kebahasaan teks prosedur.",
      atp: "",
      material: "Pengertian teks prosedur, struktur teks prosedur, ciri kebahasaan, dan contoh penyusunan teks prosedur.",
      studentCharacteristics: "",
      teachingMethod: "Pendekatan saintifik, diskusi, tanya jawab, dan penugasan.",
      learningModel: "Pembelajaran berbasis teks",
      learningMedia: "Lembar contoh teks, proyektor, dan papan tulis.",
      learningResources: "Buku Bahasa Indonesia kelas XI dan contoh teks prosedur dari lingkungan sekolah.",
      differentiationStrategy: "",
      assessmentPlan: "Pisahkan penilaian sikap, pengetahuan, dan keterampilan secara jelas.",
      reflectionPlan: "",
      followUpPlan: "Peserta didik yang belum tuntas mengikuti latihan tambahan; yang sudah tuntas membuat contoh teks prosedur lain secara mandiri.",
      formatPreference: "Gunakan format administrasi sekolah yang formal dan sistematis.",
      notesForAI: "Gunakan KI/KD sebagai tulang punggung utama dan tampilkan pendekatan saintifik secara eksplisit bila relevan.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: [
      "## Kompetensi Inti (KI)",
      "## Kompetensi Dasar (KD)",
      "## Indikator Pencapaian Kompetensi",
      "## Materi Pembelajaran",
      "## Penilaian",
      "### Penilaian Sikap",
      "### Penilaian Pengetahuan",
      "### Penilaian Keterampilan",
      "## Remedial dan Pengayaan",
    ],
    mustNotInclude: [
      "## Capaian Pembelajaran (CP)",
      "## Tujuan Pembelajaran (TP)",
      "## Alur Tujuan Pembelajaran (ATP)",
      "## Strategi Diferensiasi",
    ],
  },
];

async function run() {
  for (const testCase of cases) {
    const response = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testCase.payload),
    });

    const body = await response.json();

    if (!response.ok) {
      console.error(`[smoke] Case ${testCase.name} gagal.`, body);
      process.exit(1);
    }

    const content = body.content;
    if (typeof content !== "string" || !content.trim()) {
      console.error(`[smoke] Case ${testCase.name} tidak mengembalikan konten markdown.`);
      process.exit(1);
    }

    for (const text of testCase.mustInclude) {
      if (!content.includes(text)) {
        console.error(`[smoke] Case ${testCase.name} tidak mengandung teks wajib: ${text}`);
        process.exit(1);
      }
    }

    for (const text of testCase.mustNotInclude) {
      if (content.includes(text)) {
        console.error(`[smoke] Case ${testCase.name} mengandung teks yang seharusnya tidak ada: ${text}`);
        process.exit(1);
      }
    }

    console.log(`[smoke] Case ${testCase.name} ok.`);

    if (testCase !== cases[cases.length - 1] && delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  console.log("[smoke] Semua smoke test generate berhasil.");
}

run().catch((error) => {
  console.error("[smoke] Terjadi kesalahan saat menjalankan smoke test.", error);
  process.exit(1);
});
