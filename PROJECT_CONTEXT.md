# PROJECT_CONTEXT

## Nama project
RPP Generator AI

## Ringkasan project
Aplikasi web Next.js untuk menghasilkan draft RPP berbasis kurikulum dalam format markdown, lalu memberi ruang bagi user untuk mengedit langsung hasilnya sebelum export ke PDF atau DOCX. Implementasi saat ini berfokus pada workflow: pilih template kurikulum, isi konteks inti, generate draft, edit di markdown editor, review live preview, lalu export.

## Tujuan utama
- Membantu guru menyusun draft RPP dengan lebih cepat.
- Menjaga hasil AI tetap editable langsung di aplikasi.
- Menyediakan output akhir yang bisa diekspor ke PDF atau Word.

## Scope yang termasuk
- Landing page sederhana untuk menjelaskan produk dan alur kerja.
- Template RPP sederhana untuk dua kurikulum.
- Form input inti untuk generate draft awal.
- Generate draft markdown via API route server-side ke Groq API.
- Markdown editor di sisi client.
- Live preview markdown.
- Copy hasil, regenerate, export PDF, dan export DOCX.
- Rate limiting in-memory sederhana pada endpoint generate.

## Scope yang tidak termasuk
- Login / register / manajemen akun.
- Database dan penyimpanan permanen dokumen.
- Dashboard admin, LMS, atau manajemen data sekolah.
- Riwayat generate lintas session, autosave server-side, atau versioning dokumen.
- Upload PDF reference atau format referensi file lain.
- Streaming response AI.

## Target user
- Guru atau tenaga pendidik yang perlu menyusun RPP.
- Pengguna yang ingin AI membuat draft awal lalu menyunting hasilnya sendiri.

## Alur user
1. User membuka landing page.
2. User memilih template kurikulum.
3. User mengisi konteks inti untuk generate draft.
4. Client mengirim JSON ke `app/api/generate/route.ts`.
5. Server memvalidasi payload, mengecek rate limit, lalu membangun prompt sesuai template kurikulum.
6. Server mengirim request ke Groq API dan menerima draft markdown.
7. Hasil dimasukkan ke editor markdown.
8. User mengedit draft dan melihat live preview di panel kanan.
9. User dapat copy, regenerate, export PDF, atau export DOCX dari draft terbaru.

## Tech stack
- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4 via `app/globals.css`
- React Hook Form + Zod
- Groq Chat Completions API via `fetch`
- `@mdxeditor/editor` untuk editor markdown
- `react-markdown` + `remark-gfm` untuk preview
- `html2pdf.js` untuk export PDF di client
- `docx` untuk export DOCX di client
- `sonner` untuk toast

## Arsitektur
- Aplikasi stateless tanpa database.
- UI utama berada di `app/page.tsx` dan `components/rpp-generator.tsx`.
- Editor markdown berjalan penuh di client.
- Preview markdown berjalan di client dan membaca draft yang sama dengan editor.
- Satu API route utama: `app/api/generate/route.ts`.
- Validasi payload generate memakai `schemas/generate-rpp.ts`.
- Template kurikulum dipusatkan di `lib/rpp-templates.ts`.
- Integrasi AI hanya berjalan di server melalui `lib/groq.ts`.
- Export PDF/DOCX berjalan di client melalui `lib/exporters.ts`.
- Rate limit memakai `Map` in-memory di `lib/rate-limit.ts`.

## Struktur folder penting
- `app/` — page, layout, global style, dan API route.
- `components/` — UI landing page, selector template, generation form, editor, dan preview hasil.
- `lib/` — utilitas, registry template, integrasi Groq, prompt builder, exporter, rate limit.
- `schemas/` — schema Zod untuk payload generate.

## Fitur utama yang benar-benar sudah ada
- Pemilihan template Kurikulum Merdeka dan Kurikulum 2013.
- Form generate yang lebih ringkas untuk konteks inti RPP.
- Generate draft RPP via Groq API.
- Editor markdown dengan toolbar dasar, heading, list, link, dan tabel markdown.
- Live preview markdown yang mengikuti isi editor.
- Copy hasil ke clipboard.
- Regenerate dengan input form saat ini.
- Export hasil ke PDF dan DOCX.

## Cara kerja AI generation
- Payload generate divalidasi dengan `generateRppSchema`.
- Backend membatasi ukuran input total agar prompt tetap efisien.
- `buildRppPrompt` menyusun `systemPrompt` dan `userPrompt` dari template kurikulum + input inti user.
- Template kurikulum memberi struktur section wajib dan skeleton markdown awal.
- `generateRppWithGroq` mengirim request ke endpoint OpenAI-compatible Groq dengan `temperature: 0.3` dan `max_tokens: 2200`.
- Output yang diharapkan adalah draft markdown final yang siap diedit ulang user.

## Cara kerja template kurikulum
- Template disimpan di `lib/rpp-templates.ts`.
- Setiap template punya:
  - metadata tampilan
  - daftar section wajib
  - guidance prompt
  - skeleton markdown awal
- Kurikulum Merdeka memiliki section `Materi`.
- Kurikulum 2013 saat ini tidak memiliki section `Materi` sesuai requirement project.

## Aturan prioritas konteks
Urutan prioritas di prompt saat ini:
1. Instruksi eksplisit user dari form generate.
2. Struktur dan aturan template kurikulum yang dipilih.
3. Konsistensi pedagogis internal dokumen.

## Constraint penting
- Wajib mengandalkan environment variable untuk `GROQ_API_KEY` dan `GROQ_MODEL`.
- Rate limit dikendalikan env.
- Rate limit bersifat in-memory, jadi tidak persisten dan tidak cocok untuk distribusi multi-instance tanpa perubahan arsitektur.
- Tidak ada penyimpanan hasil generate atau draft editor di server.
- DOCX export sudah lebih sadar heading/list/tabel sederhana, tetapi fidelity masih bisa kalah dibanding PDF untuk format kompleks.
- `@mdxeditor/editor` harus dijalankan client-only agar tidak terkena masalah SSR di Next.js.
- Belum ada test suite, database, auth, dan observability khusus yang terlihat dari code.

## Status umum project
MVP baru untuk generate draft RPP berbasis template kurikulum sudah terpasang dengan flow inti: pilih kurikulum → generate draft markdown → edit di editor → preview live → export. Arsitektur tetap sederhana, modular, dan cocok untuk deployment ringan di Vercel gratis.

## Arah pengembangan berikutnya
Yang paling relevan dari gap implementasi saat ini:
- meningkatkan fidelity export DOCX untuk format yang lebih kompleks;
- menambah local persistence draft bila memang dibutuhkan;
- menambah test minimal untuk schema, prompt builder, dan endpoint generate.
