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

const cases = [
  {
    name: "merdeka",
    payload: {
      curriculum: "kurikulum-merdeka",
      schoolName: "SMA Contoh",
      subject: "Informatika",
      gradeLevel: "Fase E / Kelas X",
      semester: "Ganjil",
      topic: "Berpikir komputasional",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      learningGoals: "Peserta didik mampu menjelaskan dekomposisi masalah dan menerapkannya pada studi kasus sederhana.",
      learningOutcomes: "Peserta didik memahami konsep dasar berpikir komputasional.",
      atp: "Eksplorasi masalah, diskusi kelompok, dan latihan terstruktur.",
      teachingMethod: "Diskusi kelompok dan problem based learning.",
      learningModel: "Problem Based Learning",
      learningMedia: "Laptop, proyektor, LKPD.",
      learningResources: "Buku Informatika kelas X dan LKPD sekolah.",
      assessmentPlan: "Asesmen formatif melalui diskusi dan lembar kerja; sumatif melalui tugas individu.",
      notesForAI: "Gunakan tabel markdown sederhana pada identitas dan asesmen.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: ["## Materi", "## Asesmen", "## Identitas"],
    mustNotInclude: [],
  },
  {
    name: "k13",
    payload: {
      curriculum: "kurikulum-2013",
      schoolName: "SMA Contoh",
      subject: "Bahasa Indonesia",
      gradeLevel: "Kelas XI",
      semester: "Genap",
      topic: "Teks prosedur",
      academicYear: "2026/2027",
      timeAllocation: "2 x 45 menit",
      learningGoals: "Peserta didik mampu menyusun teks prosedur dengan struktur yang benar.",
      learningOutcomes: "Peserta didik memahami ciri kebahasaan dan struktur teks prosedur.",
      atp: "Mengamati contoh, diskusi struktur, latihan menulis mandiri.",
      teachingMethod: "Diskusi dan penugasan.",
      learningModel: "Pembelajaran berbasis teks",
      learningMedia: "Lembar contoh teks dan proyektor.",
      learningResources: "Buku Bahasa Indonesia kelas XI dan contoh teks prosedur sekolah.",
      assessmentPlan: "Penilaian proses diskusi dan hasil teks prosedur akhir.",
      notesForAI: "Pastikan template K-13 tidak menampilkan section Materi.",
      outputLanguage: "Bahasa Indonesia",
      writingStyle: "formal",
      detailLevel: "sedang",
    },
    mustInclude: ["## Identitas", "## Langkah Pembelajaran", "## Asesmen"],
    mustNotInclude: ["## Materi"],
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
  }

  console.log("[smoke] Semua smoke test generate berhasil.");
}

run().catch((error) => {
  console.error("[smoke] Terjadi kesalahan saat menjalankan smoke test.", error);
  process.exit(1);
});
