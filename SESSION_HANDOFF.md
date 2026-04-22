# SESSION_HANDOFF

## Ringkasan status project saat ini
Project saat ini sudah bergeser dari generator RPP berbasis form besar + PDF reference menjadi workspace drafting berbasis template kurikulum. Flow inti sekarang adalah: pilih kurikulum, isi konteks inti, generate draft markdown, edit di editor kiri, review live preview di kanan, lalu export PDF atau DOCX. Implementasi tetap stateless, tanpa database, dan memakai backend tipis Next.js untuk validasi, prompt building, rate limit, dan call ke Groq.

## Yang sudah dikerjakan / sudah terimplementasi
- Landing page dasar dengan header, hero, section cara kerja, generator, dan footer.
- Pemilihan template Kurikulum Merdeka dan Kurikulum 2013.
- Form generate yang lebih ringkas untuk konteks inti RPP.
- Validasi schema Zod di client dan server dengan schema baru khusus generate.
- Prompt builder baru berbasis template kurikulum.
- Integrasi Groq API di server untuk generate draft markdown.
- Penanganan timeout request AI dengan `AbortController`.
- Editor markdown menggunakan `@mdxeditor/editor`.
- Live preview hasil menggunakan `react-markdown`.
- Aksi copy, regenerate, export PDF, dan export DOCX dari draft terbaru.
- Rate limiting sederhana berbasis IP/header `x-forwarded-for`.
- Penghapusan alur upload PDF reference dari flow utama.

## File atau modul penting
- `app/page.tsx` — komposisi halaman utama.
- `components/rpp-generator.tsx` — workspace utama: template selector, form, editor, dan preview.
- `components/template-selector.tsx` — pemilihan kurikulum.
- `components/generation-form.tsx` — input inti untuk generate draft.
- `components/markdown-editor.tsx` — wrapper client-only `@mdxeditor/editor`.
- `components/result-preview.tsx` — live preview + export actions.
- `app/api/generate/route.ts` — validasi server, rate limit, build prompt, dan call AI.
- `schemas/generate-rpp.ts` — schema Zod dan default values workflow baru.
- `lib/rpp-templates.ts` — registry template kurikulum dan skeleton markdown.
- `lib/prompt-builder.ts` — pembentukan prompt berdasarkan template + input user.
- `lib/groq.ts` — request ke Groq API dengan batas output lebih rendah.
- `lib/exporters.ts` — export PDF dan DOCX dari markdown editable.
- `lib/rate-limit.ts` — rate limiter in-memory.

## Keputusan teknis yang terlihat dari code
- Integrasi model tetap memakai Groq API, bukan provider lain.
- API key disimpan server-side; client hanya mengirim JSON payload generate.
- Editor markdown dijalankan client-only karena `@mdxeditor/editor` tidak SSR-safe.
- Hasil AI diposisikan sebagai draft editable, bukan output final yang read-only.
- Preview dan export selalu membaca draft markdown terbaru.
- PDF export tetap client-side dari preview HTML.
- DOCX export tetap client-side, tetapi parser sekarang sudah menangani heading, list bernomor, bullet, dan tabel markdown sederhana.
- Rate limiting tetap tidak memakai Redis/database; hanya `Map` in-memory.
- Token usage dikurangi lewat schema yang lebih kecil, batas total karakter input, dan `max_tokens` Groq yang lebih rendah.

## Yang belum selesai / belum terlihat implementasinya
- Belum ada persistence untuk draft editor atau histori generate.
- Belum ada auth, multi-user support, atau dashboard.
- Belum ada test otomatis unit/integration/e2e.
- Belum ada streaming output AI.
- Belum ada retry/backoff khusus untuk error provider.
- Belum ada mekanisme observability/logging yang jelas dari code.
- Belum ada evidence dari code bahwa DOCX export menangani semua kasus tabel/markdown kompleks dengan baik.
- Belum dapat dipastikan dari code apakah aplikasi ini sudah pernah dipakai di production nyata.

## Risiko / catatan penting
- Rate limit in-memory akan reset saat restart process dan tidak sinkron antar instance.
- `getClientKey` bergantung pada `x-forwarded-for`; fallback `unknown` bisa membuat banyak request berbagi bucket yang sama.
- `@mdxeditor/editor` bisa bermasalah jika integrasi client-only tidak dijaga saat refactor berikutnya.
- DOCX export tetap berpotensi turun kualitas untuk markdown kompleks atau tabel yang tidak sederhana.
- Kualitas draft AI sekarang lebih bergantung pada kekuatan template kurikulum dan kualitas input ringkas user.
- Belum ada test yang terlihat untuk menjaga regresi saat schema/form/prompt berubah.

## Next step yang paling masuk akal
- Audit kualitas hasil generate untuk dua template kurikulum dan perbaiki prompt bila hasil belum konsisten.
- Tambahkan test minimal untuk schema, prompt builder, dan endpoint generate.
- Tingkatkan fidelity DOCX bila user butuh hasil Word yang lebih formal.
- Pertimbangkan local persistence draft (mis. localStorage) bila user sering menyunting lama sebelum export.
