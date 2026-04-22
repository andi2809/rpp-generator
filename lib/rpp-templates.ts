export type CurriculumId = "kurikulum-merdeka" | "kurikulum-2013";

type RppTemplate = {
  id: CurriculumId;
  label: string;
  shortLabel: string;
  description: string;
  sections: string[];
  promptGuidance: string[];
  emptyMarkdown: string;
};

const merdekaTemplate: RppTemplate = {
  id: "kurikulum-merdeka",
  label: "Kurikulum Merdeka",
  shortLabel: "Merdeka",
  description: "Template dengan struktur CP, TP, ATP, Materi, dan asesmen yang cocok untuk drafting cepat berbasis kurikulum merdeka.",
  sections: [
    "Identitas",
    "Capaian Pembelajaran (CP)",
    "Tujuan Pembelajaran (TP)",
    "Alur Tujuan Pembelajaran (ATP)",
    "Metode Pembelajaran",
    "Media/Alat/Bahan",
    "Asesmen",
    "Materi",
  ],
  promptGuidance: [
    "Gunakan istilah CP, TP, dan ATP secara konsisten.",
    "Buat susunan markdown yang rapi dan mudah diedit guru.",
    "Gunakan tabel markdown untuk bagian identitas dan rincian asesmen bila membantu kejelasan.",
    "Jangan tambahkan section di luar struktur wajib kecuali benar-benar diperlukan untuk koherensi dokumen.",
    "Utamakan kalimat yang ringkas, konkret, dan siap dipakai sebagai draft kerja guru.",
    "Usahakan susunan dokumen terasa seperti format administrasi sekolah: identitas ringkas, isi utama jelas, dan asesmen mudah dibaca.",
  ],
  emptyMarkdown: `# RPP - Kurikulum Merdeka

## Identitas

| Komponen | Keterangan |
| --- | --- |
| Satuan Pendidikan |  |
| Mata Pelajaran |  |
| Fase / Kelas |  |
| Semester |  |
| Tahun Ajaran |  |
| Alokasi Waktu |  |
| Topik |  |

## Capaian Pembelajaran (CP)

Tuliskan capaian pembelajaran yang menjadi acuan.

## Tujuan Pembelajaran (TP)

Tuliskan tujuan pembelajaran yang ingin dicapai.

## Alur Tujuan Pembelajaran (ATP)

Tuliskan alur singkat pembelajaran atau tahapan pembelajaran utama.

## Metode Pembelajaran

- Model pembelajaran
- Metode pembelajaran
- Langkah penggunaan model secara singkat

## Media/Alat/Bahan

- Media pembelajaran
- Alat dan bahan pendukung
- Sumber belajar utama

## Asesmen

| Jenis | Teknik / Bentuk | Keterangan |
| --- | --- | --- |
| Diagnostik |  |  |
| Formatif |  |  |
| Sumatif |  |  |

## Materi

Tuliskan materi inti yang akan diajarkan secara ringkas dan terstruktur.
`,
};

const k13Template: RppTemplate = {
  id: "kurikulum-2013",
  label: "Kurikulum 2013",
  shortLabel: "K-13",
  description: "Template pembeda untuk K-13 tanpa section Materi, dengan fokus pada kompetensi, tujuan, kegiatan, dan asesmen.",
  sections: [
    "Identitas",
    "Kompetensi dan Tujuan Pembelajaran",
    "Pendekatan / Metode Pembelajaran",
    "Media/Alat/Bahan",
    "Langkah Pembelajaran",
    "Asesmen",
  ],
  promptGuidance: [
    "Jangan menambahkan section Materi.",
    "Gunakan bahasa formal dan struktur yang mudah diedit guru di dokumen Word.",
    "Gunakan tabel markdown untuk identitas dan asesmen bila membantu kejelasan.",
    "Fokus pada penyusunan kompetensi, tujuan, kegiatan, dan asesmen secara runtut.",
    "Buat langkah pembelajaran yang jelas dibagi menjadi Pendahuluan, Kegiatan Inti, dan Penutup.",
    "Usahakan susunan dokumen terasa seperti format administrasi sekolah yang rapi dan siap print.",
  ],
  emptyMarkdown: `# RPP - Kurikulum 2013

## Identitas

| Komponen | Keterangan |
| --- | --- |
| Satuan Pendidikan |  |
| Mata Pelajaran |  |
| Kelas |  |
| Semester |  |
| Tahun Ajaran |  |
| Alokasi Waktu |  |
| Topik |  |

## Kompetensi dan Tujuan Pembelajaran

Tuliskan kompetensi, indikator, dan tujuan pembelajaran yang relevan.

## Pendekatan / Metode Pembelajaran

- Pendekatan pembelajaran
- Model pembelajaran
- Metode pembelajaran utama
- Strategi pelaksanaan singkat

## Media/Alat/Bahan

- Media pembelajaran
- Alat dan bahan pendukung
- Sumber belajar utama

## Langkah Pembelajaran

### Pendahuluan

Tuliskan kegiatan pendahuluan.

### Kegiatan Inti

Tuliskan kegiatan inti.

### Penutup

Tuliskan kegiatan penutup.

## Asesmen

| Aspek | Teknik / Bentuk | Keterangan |
| --- | --- | --- |
| Sikap / diagnostik |  |  |
| Pengetahuan / formatif |  |  |
| Keterampilan / sumatif |  |  |
`,
};

export const rppTemplates = [merdekaTemplate, k13Template] as const;

export function getRppTemplate(curriculum: CurriculumId) {
  return rppTemplates.find((template) => template.id === curriculum) ?? merdekaTemplate;
}
