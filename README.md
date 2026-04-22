# Generator RPP AI

Website generator draft RPP berbasis Next.js 16, App Router, Tailwind CSS, TypeScript, Groq API, template kurikulum, markdown editor, dan live preview.

## Fitur

- Template Kurikulum Merdeka dan Kurikulum 2013
- Form generate RPP yang lebih ringkas
- Prompt builder modular berbasis template kurikulum
- Integrasi Groq API aman di server
- Markdown editor dengan `@mdxeditor/editor`
- Live preview hasil markdown
- Copy, regenerate, export PDF, dan export DOCX
- Validasi client dan server
- Rate limiting sederhana

## Setup

1. Install dependency

```bash
npm install
```

2. Salin environment

```bash
cp .env.example .env.local
```

3. Isi `GROQ_API_KEY` dan `GROQ_MODEL` (default yang disarankan: `llama-3.3-70b-versatile`)

4. Jalankan lokal

```bash
npm run dev
```

5. Buka `http://localhost:3000`

## Build production

```bash
npm run build
npm start
```

## Smoke test generate API

Setelah `npm run dev` aktif di `http://localhost:3000`, jalankan:

```bash
npm run test:generate
```

Script ini akan mengirim dua request ringan ke `/api/generate` untuk memverifikasi:
- template Kurikulum Merdeka tetap memiliki section `Materi`
- template Kurikulum 2013 tidak menghasilkan section `Materi`
