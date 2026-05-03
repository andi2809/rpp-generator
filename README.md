# Generator RPP AI

Aplikasi web berbasis Next.js untuk membantu membuat draft RPP dengan AI, lalu mengedit hasilnya langsung dalam markdown editor sebelum diekspor ke PDF atau DOCX.

## Apa yang bisa dilakukan produk ini

- Memilih template **Kurikulum Merdeka** atau **Kurikulum 2013**
- Mengisi konteks inti pembelajaran lewat form yang ringkas
- Menghasilkan draft RPP dengan AI melalui Groq API
- Mengedit hasil generate langsung di markdown editor
- Melihat live preview hasil RPP secara berdampingan
- Menyalin hasil, regenerate, lalu export ke **PDF** atau **DOCX**
- Menjaga struktur output tetap sesuai template kurikulum yang dipilih

## Stack utama

- Next.js 16 + App Router
- React 19 + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Groq API
- `@mdxeditor/editor` untuk editor markdown
- `react-markdown` untuk preview
- `html2pdf.js` dan `docx` untuk export

## Alur penggunaan

1. Pilih template kurikulum.
2. Isi informasi inti seperti nama sekolah, mata pelajaran, kelas/fase, topik, tujuan pembelajaran, dan konteks pendukung lain.
3. Klik **Generate** untuk membuat draft RPP.
4. Hasil generate akan masuk ke **editor markdown**.
5. Tinjau hasil di panel **live preview**.
6. Jika perlu, edit isi draft secara manual.
7. Gunakan tombol **Copy**, **Regenerate**, **PDF**, atau **DOCX** sesuai kebutuhan.

## Field yang diisi user

Beberapa input utama yang dipakai saat generate:

- Nama sekolah / satuan pendidikan
- Mata pelajaran
- Kelas / fase
- Semester
- Topik / pokok bahasan
- Tahun ajaran
- Alokasi waktu
- Tujuan pembelajaran
- Capaian pembelajaran / kompetensi
- ATP / alur pembelajaran
- Model dan metode pembelajaran
- Media, sumber belajar, dan rencana asesmen
- Catatan tambahan untuk AI
- Bahasa output, gaya bahasa, dan tingkat detail

## Perbedaan template kurikulum

### Kurikulum Merdeka
Output diarahkan agar memiliki section:

- Identitas
- Capaian Pembelajaran (CP)
- Tujuan Pembelajaran (TP)
- Alur Tujuan Pembelajaran (ATP)
- Metode Pembelajaran
- Media/Alat/Bahan
- Asesmen
- Materi

### Kurikulum 2013
Output diarahkan agar memiliki section:

- Identitas
- Kompetensi dan Tujuan Pembelajaran
- Pendekatan / Metode Pembelajaran
- Media/Alat/Bahan
- Langkah Pembelajaran
- Asesmen

Catatan: template **Kurikulum 2013** memang tidak menggunakan section `Materi`.

## Cara menjalankan lokal

1. Install dependency

```bash
npm install
```

2. Salin file environment

```bash
cp .env.example .env.local
```

3. Isi environment berikut di `.env.local`

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
NEXT_PUBLIC_APP_NAME=Generator RPP AI
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
```

Keterangan singkat:

- `GROQ_API_KEY`: API key dari Groq
- `GROQ_MODEL`: model yang dipakai untuk generate draft
- `RATE_LIMIT_WINDOW_MS`: durasi window rate limit
- `RATE_LIMIT_MAX_REQUESTS`: jumlah request maksimum per window

4. Jalankan development server

```bash
npm run dev
```

5. Buka aplikasi di browser

```text
http://localhost:3000
```

## Script yang tersedia

```bash
npm run dev
npm run build
npm start
npm run lint
npm run test:generate
```

## Smoke test API generate

Setelah `npm run dev` aktif di `http://localhost:3000`, jalankan:

```bash
npm run test:generate
```

Script ini mengirim request ringan ke `/api/generate` untuk memastikan endpoint generate berjalan dan struktur template tetap sesuai kurikulum yang dipilih.

## Catatan implementasi

- Endpoint generate ada di `app/api/generate/route.ts`
- Validasi input menggunakan Zod sebelum request diteruskan ke Groq
- Prompt dibangun di server agar aturan template tetap konsisten
- Hasil generate disimpan di editor sisi client, lalu bisa diedit ulang sebelum export
- Export PDF dilakukan dari preview HTML, sedangkan export DOCX dibuat dari konten markdown

## Batasan saat ini

- Aplikasi belum memakai database atau sistem login
- Rate limiting masih sederhana dan berbasis memory server
- Kualitas hasil tetap bergantung pada kelengkapan input user
- Export DOCX sudah mendukung heading, bullet, numbering, dan tabel markdown sederhana, tetapi belum ditujukan untuk layout dokumen yang sangat kompleks
