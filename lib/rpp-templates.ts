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
  description: "Template dengan struktur CP, TP, ATP, diferensiasi, asesmen formatif, refleksi, dan tindak lanjut yang cocok untuk drafting RPP Kurikulum Merdeka.",
  sections: [
    "Identitas",
    "Capaian Pembelajaran (CP)",
    "Tujuan Pembelajaran (TP)",
    "Alur Tujuan Pembelajaran (ATP)",
    "Materi / Elemen yang Dipelajari",
    "Karakteristik Peserta Didik",
    "Metode / Model / Pendekatan Pembelajaran",
    "Media / Alat / Bahan / Sumber Belajar",
    "Strategi Diferensiasi",
    "Langkah-Langkah Pembelajaran",
    "Asesmen",
    "Refleksi",
    "Tindak Lanjut / Remedial / Pengayaan",
  ],
  promptGuidance: [
    "Gunakan istilah CP, TP, dan ATP secara konsisten sebagai kerangka utama dokumen.",
    "Tekankan pembelajaran yang fleksibel, kontekstual, dan responsif terhadap kebutuhan peserta didik.",
    "Tampilkan strategi diferensiasi secara nyata, bukan hanya disebutkan sepintas.",
    "Asesmen harus menonjolkan asesmen diagnostik, formatif, dan sumatif tanpa membagi struktur secara kaku menjadi sikap, pengetahuan, dan keterampilan.",
    "Jika relevan, selaraskan pembelajaran dengan penguatan Profil Pelajar Pancasila tanpa menjadikannya bagian yang dipaksakan.",
    "Gunakan susunan markdown yang rapi, mudah dibaca di web, dan mudah diedit ulang guru.",
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

Tuliskan CP yang menjadi acuan pembelajaran.

## Tujuan Pembelajaran (TP)

Tuliskan tujuan pembelajaran yang ingin dicapai.

## Alur Tujuan Pembelajaran (ATP)

Tuliskan alur tujuan pembelajaran atau konteks turunan ATP yang relevan.

## Materi / Elemen yang Dipelajari

- Materi inti
- Elemen atau konsep utama
- Keterkaitan dengan konteks pembelajaran

## Karakteristik Peserta Didik

Tuliskan karakteristik umum peserta didik yang perlu diperhatikan dalam pembelajaran.

## Metode / Model / Pendekatan Pembelajaran

- Model pembelajaran
- Metode pembelajaran
- Pendekatan pembelajaran

## Media / Alat / Bahan / Sumber Belajar

- Media pembelajaran
- Alat dan bahan pendukung
- Sumber belajar utama

## Strategi Diferensiasi

- Diferensiasi konten
- Diferensiasi proses
- Diferensiasi produk

## Langkah-Langkah Pembelajaran

### Kegiatan Awal

Tuliskan kegiatan awal pembelajaran.

### Kegiatan Inti

Tuliskan kegiatan inti pembelajaran.

### Kegiatan Penutup

Tuliskan kegiatan penutup pembelajaran.

## Asesmen

| Jenis | Teknik / Bentuk | Keterangan |
| --- | --- | --- |
| Diagnostik |  |  |
| Formatif |  |  |
| Sumatif |  |  |

## Refleksi

Tuliskan refleksi guru dan/atau peserta didik yang relevan.

## Tindak Lanjut / Remedial / Pengayaan

Tuliskan rencana tindak lanjut, remedial, atau pengayaan.
`,
};

const k13Template: RppTemplate = {
  id: "kurikulum-2013",
  label: "Kurikulum 2013",
  shortLabel: "K-13",
  description: "Template formal K-13 dengan struktur KI/KD, indikator, pendekatan saintifik, penilaian per aspek, serta remedial dan pengayaan.",
  sections: [
    "Identitas",
    "Kompetensi Inti (KI)",
    "Kompetensi Dasar (KD)",
    "Indikator Pencapaian Kompetensi",
    "Tujuan Pembelajaran",
    "Materi Pembelajaran",
    "Metode / Model / Pendekatan Pembelajaran",
    "Media / Alat / Bahan / Sumber Belajar",
    "Langkah-Langkah Pembelajaran",
    "Penilaian",
    "Remedial dan Pengayaan",
  ],
  promptGuidance: [
    "Gunakan KI dan KD sebagai kerangka utama, lalu turunkan indikator dan tujuan pembelajaran secara runtut.",
    "Gunakan pendekatan pembelajaran saintifik secara eksplisit bila relevan dengan konteks pelajaran.",
    "Struktur dokumen harus formal, sistematis, dan administratively clear.",
    "Penilaian harus dipisahkan secara jelas ke dalam sikap, pengetahuan, dan keterampilan.",
    "Jangan gunakan CP, TP, ATP, atau istilah fase sebagai tulang punggung dokumen.",
    "Gunakan susunan markdown yang rapi dan mudah diedit ulang dalam dokumen kerja guru.",
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

## Kompetensi Inti (KI)

Tuliskan kompetensi inti yang relevan.

## Kompetensi Dasar (KD)

Tuliskan kompetensi dasar yang menjadi acuan.

## Indikator Pencapaian Kompetensi

Tuliskan indikator pencapaian kompetensi yang diturunkan dari KD.

## Tujuan Pembelajaran

Tuliskan tujuan pembelajaran yang ingin dicapai.

## Materi Pembelajaran

- Fakta, konsep, dan prosedur yang dipelajari
- Pokok materi inti
- Contoh konteks penerapan

## Metode / Model / Pendekatan Pembelajaran

- Pendekatan saintifik
- Model pembelajaran
- Metode pembelajaran utama

## Media / Alat / Bahan / Sumber Belajar

- Media pembelajaran
- Alat dan bahan pendukung
- Sumber belajar utama

## Langkah-Langkah Pembelajaran

### Pendahuluan

Tuliskan kegiatan pendahuluan.

### Kegiatan Inti

Tuliskan kegiatan inti.

### Penutup

Tuliskan kegiatan penutup.

## Penilaian

### Penilaian Sikap

Tuliskan bentuk penilaian sikap.

### Penilaian Pengetahuan

Tuliskan bentuk penilaian pengetahuan.

### Penilaian Keterampilan

Tuliskan bentuk penilaian keterampilan.

## Remedial dan Pengayaan

Tuliskan rencana remedial dan pengayaan.
`,
};

export const rppTemplates = [merdekaTemplate, k13Template] as const;

export function getRppTemplate(curriculum: CurriculumId) {
  return rppTemplates.find((template) => template.id === curriculum) ?? merdekaTemplate;
}
