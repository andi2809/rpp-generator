# Pemanfaatan Platform AI untuk Menyusun RPP/Modul Ajar

> **Platform yang dibahas:** RPP Generator AI — aplikasi web berbasis Next.js dan Groq AI
> **Alamat akses:** *(sesuai deployment lokal atau Vercel Anda)*

---

## 1. Tujuan Pembelajaran

Setelah mengikuti praktik ini, guru diharapkan mampu:

1. **Memahami konsep RPP Generator AI** sebagai alat bantu penyusunan Rencana Pelaksanaan Pembelajaran (RPP) berbasis kecerdasan buatan.
2. **Mengoperasikan RPP Generator AI** secara mandiri — mulai dari memilih template kurikulum, mengisi form konteks inti, hingga menghasilkan draft RPP dalam hitungan detik.
3. **Menyunting draft RPP** yang dihasilkan AI langsung di editor markdown bawaan aplikasi, sehingga isi dokumen tetap sesuai dengan konteks pembelajaran di sekolah masing-masing.
4. **Mengekspor hasil RPP** ke format PDF atau DOCX yang siap dicetak atau diunggah ke sistem administrasi sekolah.
5. **Menilai secara kritis** kapan hasil AI sudah cukup baik dan bagian mana yang tetap memerlukan sentuhan profesional dari guru.

> **Tips:** Tujuan utama penggunaan RPP Generator AI bukan untuk menggantikan peran guru, melainkan **mempercepat proses penyusunan draft awal** agar waktu dan energi guru lebih banyak tersedia untuk hal-hal pedagogis yang membutuhkan sentuhan manusia.

---

## 2. Deskripsi Singkat Tools

### Apa itu RPP Generator AI?

**RPP Generator AI** adalah aplikasi web yang dibangun menggunakan framework **Next.js** dan memanfaatkan model bahasa besar (Large Language Model) dari **Groq API** untuk menghasilkan draft Rencana Pelaksanaan Pembelajaran (RPP) secara otomatis dalam format **markdown**.

Aplikasi ini dirancang khusus untuk konteks pendidikan Indonesia dengan dua template kurikulum yang sudah tersedia:

| Template | Struktur Utama |
| --- | --- |
| **Kurikulum Merdeka** | Identitas, Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Alur Tujuan Pembelajaran (ATP), Metode Pembelajaran, Media/Alat/Bahan, Asesmen, Materi |
| **Kurikulum 2013** | Identitas, Kompetensi dan Tujuan Pembelajaran, Pendekatan/Metode Pembelajaran, Media/Alat/Bahan, Langkah Pembelajaran (Pendahuluan, Kegiatan Inti, Penutup), Asesmen |

### Mengapa RPP Generator AI Relevan untuk Guru?

- **Cepat** — Draft RPP bisa dihasilkan dalam hitungan detik, bukan jam.
- **Terstruktur** — Hasil selalu mengikuti template standar kurikulum yang dipilih, termasuk identitas lengkap (satuan pendidikan, mata pelajaran, fase/kelas, semester, tahun ajaran, alokasi waktu).
- **Editable** — Draft bukan output final yang terkunci; guru bisa langsung mengedit di editor markdown bawaan aplikasi.
- **Exportable** — Hasil akhir bisa diunduh sebagai **PDF** (siap cetak) atau **DOCX** (siap diedit lebih lanjut di Microsoft Word).
- **Format administrasi sekolah** — Prompt AI sudah di-*tuning* agar hasil draft terasa **lebih rapi seperti dokumen sekolah**, bukan tulisan generik AI. Identitas menggunakan tabel markdown, asesmen terstruktur jelas, dan model/metode/media/sumber belajar dibedakan secara eksplisit.

### Tech Stack di Balik RPP Generator AI

| Komponen | Teknologi |
| --- | --- |
| Framework | Next.js (App Router) |
| Bahasa | TypeScript |
| AI Backend | Groq Chat Completions API |
| Validasi Form | React Hook Form + Zod |
| Editor Markdown | @mdxeditor/editor |
| Live Preview | react-markdown + remark-gfm |
| Export PDF | html2pdf.js (client-side) |
| Export DOCX | docx library (client-side) |
| Notifikasi | sonner (toast) |

---

## 3. Langkah Kerja

Berikut adalah langkah-langkah lengkap menggunakan RPP Generator AI, dari awal hingga mendapatkan dokumen RPP yang siap digunakan.

---

### Langkah 1: Membuka Aplikasi RPP Generator AI

Buka browser dan akses alamat aplikasi RPP Generator AI:

- **Jika di-deploy di Vercel:** Buka URL Vercel yang diberikan (contoh: `https://rpp-generator.vercel.app`)
- **Jika dijalankan secara lokal:** Buka `http://localhost:3000` setelah menjalankan perintah `npm run dev` di terminal

Anda akan disambut oleh **landing page** yang berisi penjelasan singkat mengenai produk dan alur kerja penggunaan.

---

### Langkah 2: Memilih Template Kurikulum

Scroll ke bawah atau klik navigasi ke bagian **"Pilih template kurikulum"**. Di sini Anda akan menemukan **dua pilihan template**:

| Pilihan | Keterangan |
| --- | --- |
| **Kurikulum Merdeka** | Template dengan struktur CP, TP, ATP, Materi, dan asesmen. Cocok untuk sekolah yang sudah menerapkan Kurikulum Merdeka. |
| **Kurikulum 2013** | Template dengan kompetensi, tujuan, langkah pembelajaran (Pendahuluan, Kegiatan Inti, Penutup), dan asesmen. Tidak memiliki section Materi terpisah. |

**Klik salah satu template** untuk memilih. Saat template berubah, editor markdown di bawah akan otomatis menampilkan **skeleton kosong** sesuai template yang dipilih.

> **Penting:** Pemilihan template kurikulum menentukan seluruh struktur draft RPP yang akan dihasilkan AI. Pastikan memilih kurikulum yang sesuai dengan kebijakan sekolah Anda.

---

### Langkah 3: Mengisi Form Konteks Inti

Setelah memilih template, isi form **"Isi konteks inti untuk generate draft"**. Form ini terbagi menjadi beberapa kelompok field:

#### A. Identitas (Wajib Diisi)

| Field | Contoh Isian | Keterangan |
| --- | --- | --- |
| Nama sekolah / satuan pendidikan | SMP Negeri 1 Surabaya | Nama resmi sekolah |
| Mata pelajaran | Bahasa Indonesia | Mata pelajaran yang diajarkan |
| Kelas / fase | Kelas VII / Fase D | Kelas dan fase (khusus Merdeka) |
| Semester | Ganjil | Pilih Ganjil atau Genap |
| Topik / pokok bahasan | Teks Prosedur | Topik utama yang akan diajarkan |
| Tahun ajaran | 2026/2027 | Tahun ajaran aktif |
| Alokasi waktu | 2 x 45 menit | Durasi pembelajaran |

#### B. Konten Pembelajaran

| Field | Keterangan |
| --- | --- |
| Capaian Pembelajaran (CP) / Kompetensi | Capaian atau kompetensi sesuai kurikulum yang dipilih |
| Tujuan Pembelajaran (TP) / Indikator | **(Wajib)** Tujuan pembelajaran yang ingin dicapai |
| ATP / alur pembelajaran | Tahapan atau alur pembelajaran |
| Model pembelajaran | Contoh: Problem Based Learning, Discovery Learning |
| Metode pembelajaran | Contoh: Diskusi, ceramah, tanya jawab, demonstrasi |
| Media / alat / bahan | Contoh: Laptop, proyektor, papan tulis |
| Sumber belajar | Contoh: Buku paket, modul, internet |
| Rencana asesmen | Contoh: Kuis tertulis, proyek kelompok, presentasi |

#### C. Pengaturan Output

| Field | Pilihan | Default |
| --- | --- | --- |
| Gaya bahasa | Formal / Semi formal | Formal |
| Tingkat detail | Ringkas / Sedang / Lengkap | Sedang |
| Bahasa output | Bahasa Indonesia / English | Bahasa Indonesia |

#### D. Catatan Tambahan untuk AI (Opsional)

Field bebas untuk menambahkan instruksi khusus, misalnya:
- "Fokuskan asesmen pada keterampilan menulis"
- "Gunakan pendekatan kontekstual berbasis lingkungan sekolah"
- "Tambahkan kegiatan pembelajaran berbasis proyek"

> **Catatan:** Tidak semua field harus diisi. Field yang bertanda **wajib** (required) harus diisi agar generate bisa berjalan. Field opsional akan memperkaya konteks bagi AI dan menghasilkan draft yang lebih akurat.

---

### Langkah 4: Klik Tombol "Generate Draft RPP"

Setelah mengisi form, klik tombol **"Generate"** di bagian bawah form. Berikut yang terjadi di balik layar:

1. **Validasi client-side** — Form dicek oleh Zod schema. Jika ada field wajib yang belum diisi, muncul pesan error.
2. **Pengiriman ke server** — Data form dikirim sebagai JSON ke endpoint `/api/generate`.
3. **Validasi server-side** — Server memvalidasi ulang payload dan mengecek rate limit.
4. **Prompt building** — Server membangun prompt yang dioptimalkan berdasarkan template kurikulum + input guru.
5. **Request ke Groq AI** — Prompt dikirim ke Groq API yang akan menghasilkan draft markdown.
6. **Hasilnya dikembalikan** ke client dan otomatis **dimasukkan ke editor markdown**.

> Proses ini biasanya membutuhkan waktu **5–15 detik** tergantung kompleksitas dan beban server Groq.

---

### Langkah 5: Meninjau dan Mengedit Draft di Editor Markdown

Setelah draft berhasil di-generate, hasilnya langsung muncul di **"Editor markdown RPP"** di panel kiri. Anda bisa:

- **Mengedit teks** langsung — ubah kalimat, tambah poin, hapus bagian yang kurang sesuai
- **Menggunakan toolbar** bawaan editor — heading, bold, italic, list, link, dan tabel markdown
- **Melihat perubahan secara real-time** di panel **"Live preview hasil RPP"** di sebelah kanan

Di bagian atas editor, tersedia dua tombol reset:

| Tombol | Fungsi |
| --- | --- |
| 🔄 **Pulihkan hasil generate** | Mengembalikan editor ke hasil generate terakhir (jika sudah diedit terlalu jauh) |
| ✏️ **Kembali ke template** | Mengembalikan editor ke skeleton template kosong |

> **Tips:** Biasakan untuk **selalu meninjau ulang** draft AI sebelum mengekspor. Periksa kesesuaian dengan konteks kelas, keakuratan istilah, dan kelengkapan asesmen.

---

### Langkah 6: Mengekspor Hasil RPP

Jika draft sudah sesuai, ekspor ke format yang diinginkan melalui tombol-tombol di panel **Live preview**:

| Tombol | Format | Keterangan |
| --- | --- | --- |
| 📋 **Copy** | Clipboard | Menyalin seluruh teks markdown ke clipboard untuk di-paste di aplikasi lain |
| 📄 **PDF** | `.pdf` | Mengekspor preview menjadi file PDF siap cetak (format A4) |
| 📝 **DOCX** | `.docx` | Mengekspor markdown menjadi file Word yang bisa diedit lebih lanjut |
| 🔄 **Regenerate** | — | Mengulang proses generate dengan data form yang sama (hasilnya bisa berbeda) |

> **Catatan:** Export PDF dihasilkan dari tampilan preview HTML menggunakan `html2pdf.js`. Export DOCX dihasilkan langsung dari parsing markdown menggunakan library `docx` — termasuk menangani heading, list, bullet, dan tabel sederhana.

---

### Langkah 7: Simpan dan Gunakan

Setelah mengunduh file PDF atau DOCX:
- **Simpan** di folder dokumen administrasi sekolah
- **Lampirkan** dalam persiapan mengajar atau supervisi
- **Edit lebih lanjut** di Microsoft Word jika format DOCX diperlukan (untuk menambahkan kop surat sekolah, logo, tanda tangan kepala sekolah, dll.)

---

## 4. Contoh Penerapan

### Contoh 1: Menyusun RPP Bahasa Indonesia (Kurikulum Merdeka)

**Pengisian form:**

| Field | Isian |
| --- | --- |
| Template kurikulum | Kurikulum Merdeka |
| Nama sekolah | SMP Negeri 1 Surabaya |
| Mata pelajaran | Bahasa Indonesia |
| Kelas / fase | Kelas VII / Fase D |
| Semester | Ganjil |
| Topik | Teks Prosedur |
| Tahun ajaran | 2026/2027 |
| Alokasi waktu | 2 x 45 menit |
| Tujuan Pembelajaran (TP) | Siswa mampu mengidentifikasi ciri-ciri teks prosedur, menyusun langkah-langkah teks prosedur, dan mempresentasikan teks prosedur sederhana. |
| Model pembelajaran | Discovery Learning |
| Metode pembelajaran | Diskusi kelompok, tanya jawab, demonstrasi |
| Media / alat / bahan | Laptop, proyektor, contoh teks prosedur cetak |
| Sumber belajar | Buku paket Bahasa Indonesia kelas VII, modul pembelajaran |
| Rencana asesmen | Asesmen formatif: kuis ciri-ciri teks prosedur. Asesmen sumatif: menyusun teks prosedur mandiri. |
| Gaya bahasa | Formal |
| Tingkat detail | Sedang |

**Hasil yang dihasilkan AI (contoh representasi):**

```markdown
# RPP - Kurikulum Merdeka

## Identitas

| Komponen | Keterangan |
| --- | --- |
| Satuan Pendidikan | SMP Negeri 1 Surabaya |
| Mata Pelajaran | Bahasa Indonesia |
| Fase / Kelas | Fase D / Kelas VII |
| Semester | Ganjil |
| Tahun Ajaran | 2026/2027 |
| Alokasi Waktu | 2 x 45 menit |
| Topik | Teks Prosedur |

## Capaian Pembelajaran (CP)

Peserta didik mampu memahami, menganalisis, dan memproduksi teks prosedur
sesuai dengan kaidah kebahasaan dan struktur teks yang berlaku.

## Tujuan Pembelajaran (TP)

- Siswa mampu mengidentifikasi ciri-ciri teks prosedur dengan tepat.
- Siswa mampu menyusun langkah-langkah teks prosedur secara runtut.
- Siswa mampu mempresentasikan teks prosedur sederhana di depan kelas.

## Alur Tujuan Pembelajaran (ATP)

1. Mengamati contoh teks prosedur dan mengidentifikasi ciri-cirinya.
2. Menganalisis struktur teks prosedur (tujuan, bahan/alat, langkah-langkah).
3. Menyusun teks prosedur secara mandiri.
4. Mempresentasikan hasil kerja dan menerima umpan balik.

## Metode Pembelajaran

- Model pembelajaran: Discovery Learning
- Metode: Diskusi kelompok, tanya jawab, demonstrasi
- Langkah model: Stimulasi → Identifikasi masalah → Pengumpulan data →
  Pengolahan data → Verifikasi → Generalisasi

## Media/Alat/Bahan

- Media: Laptop, proyektor
- Alat/bahan: Contoh teks prosedur cetak, lembar kerja siswa
- Sumber belajar: Buku paket Bahasa Indonesia kelas VII, modul pembelajaran

## Asesmen

| Jenis | Teknik / Bentuk | Keterangan |
| --- | --- | --- |
| Diagnostik | Tanya jawab lisan | Mengecek pemahaman awal tentang teks prosedur |
| Formatif | Kuis tertulis | Ciri-ciri dan struktur teks prosedur |
| Sumatif | Tugas mandiri | Menyusun teks prosedur secara individu |

## Materi

- Pengertian teks prosedur
- Ciri-ciri teks prosedur (kalimat perintah, konjungsi temporal, kata kerja imperatif)
- Struktur teks prosedur: tujuan, bahan/alat, langkah-langkah
- Contoh teks prosedur sederhana (cara membuat minuman, cara menggunakan alat)
```

> **Penting:** Draft di atas adalah *contoh representasi*. Hasil aktual AI akan lebih lengkap dan bervariasi. Guru **tetap harus mereview dan menyesuaikan** agar sesuai dengan kondisi kelas masing-masing.

---

### Contoh 2: Menyusun RPP Matematika (Kurikulum 2013)

**Pengisian form:**

| Field | Isian |
| --- | --- |
| Template kurikulum | Kurikulum 2013 |
| Nama sekolah | SMA Negeri 2 Bandung |
| Mata pelajaran | Matematika |
| Kelas | Kelas X |
| Semester | Genap |
| Topik | Trigonometri: Perbandingan Trigonometri pada Segitiga Siku-siku |
| Tahun ajaran | 2026/2027 |
| Alokasi waktu | 3 x 45 menit |
| Kompetensi / capaian | KD 3.7: Menjelaskan rasio trigonometri. KD 4.7: Menyelesaikan masalah kontekstual yang berkaitan dengan rasio trigonometri pada segitiga siku-siku. |
| Tujuan pembelajaran | Siswa mampu menentukan nilai sinus, cosinus, dan tangen dari sudut istimewa serta menerapkannya dalam pemecahan masalah kontekstual. |
| Model pembelajaran | Problem Based Learning |
| Metode pembelajaran | Ceramah singkat, diskusi kelompok, latihan soal |
| Media / alat / bahan | Papan tulis, kalkulator, lembar kerja siswa |
| Sumber belajar | Buku Matematika Kelas X Kementerian, GeoGebra online |
| Rencana asesmen | Latihan soal individu, tugas kelompok penerapan trigonometri |

**Hasil yang dihasilkan AI:**

Draft RPP akan mengikuti format Kurikulum 2013 — **tanpa section Materi** — dengan langkah pembelajaran yang terbagi jelas menjadi:

- **Pendahuluan** — Apersepsi, motivasi, penyampaian tujuan
- **Kegiatan Inti** — Orientasi masalah, pengumpulan informasi, diskusi kelompok, presentasi
- **Penutup** — Refleksi, penguatan, penugasan

Tabel asesmen menggunakan kolom **Aspek**, **Teknik/Bentuk**, dan **Keterangan** (misalnya: Sikap — Observasi, Pengetahuan — Tes tertulis, Keterampilan — Tugas proyek).

---

## 5. Catatan Penting

Berikut beberapa hal penting yang perlu diperhatikan saat menggunakan RPP Generator AI:

### Tentang Peran AI

1. **Draft ≠ dokumen final.** Hasil generate adalah *draft awal* yang dirancang untuk dipercepat, bukan langsung dicetak. Guru **wajib** mereview, memverifikasi, dan menyesuaikan setiap bagian.

2. **AI tidak mengenal konteks kelas Anda.** AI tidak tahu karakteristik siswa, fasilitas sekolah, atau kebijakan lokal. Informasi-informasi ini harus ditambahkan secara manual oleh guru.

3. **Hasil bisa berbeda setiap kali di-generate.** Meskipun prompt dan input sama, AI bisa menghasilkan variasi draft. Fitur **Regenerate** bisa digunakan untuk mendapatkan alternatif yang lebih cocok.

### Tentang Data dan Privasi

4. **Tidak ada data yang disimpan di server.** Aplikasi ini bersifat *stateless* — tidak ada database, tidak ada penyimpanan draft, dan tidak ada akun pengguna. Setiap sesi bersifat sementara.

5. **Data dikirim ke Groq API.** Konteks yang Anda isi di form akan dikirim ke server Groq untuk diproses. Pastikan **tidak memasukkan data sensitif siswa** (nama lengkap, nomor identitas, dll.) ke dalam form.

### Tentang Kualitas Output

6. **Kualitas input menentukan kualitas output.** Semakin lengkap dan jelas informasi yang dimasukkan di form, semakin akurat dan relevan draft yang dihasilkan. Field opsional seperti model pembelajaran, sumber belajar, dan rencana asesmen sangat membantu AI menghasilkan draft yang lebih sesuai.

7. **Format sudah di-tuning untuk administrasi sekolah.** Prompt AI sudah dioptimalkan agar draft terasa seperti dokumen administratif sekolah — bukan esai generik. Identitas menggunakan tabel, asesmen terstruktur, dan model/metode dibedakan secara eksplisit.

### Tentang Export

8. **PDF digenerate dari preview HTML.** Kualitas PDF sangat baik untuk format standar. Untuk format yang sangat kompleks, DOCX mungkin lebih fleksibel karena bisa diedit lanjut di Word.

9. **DOCX sudah menangani heading, list, dan tabel sederhana.** Namun untuk tabel yang sangat kompleks, hasilnya mungkin perlu penyesuaian manual di Microsoft Word.

> **Peringatan:** Jangan bergantung sepenuhnya pada hasil AI tanpa verifikasi. Kesalahan faktual, istilah yang kurang tepat, atau struktur yang kurang sesuai bisa saja terjadi. **Tanggung jawab akhir atas isi RPP tetap ada pada guru.**

---

## 6. Refleksi

Setelah menggunakan RPP Generator AI, luangkan waktu sejenak untuk merefleksikan pengalaman Anda dengan menjawab pertanyaan-pertanyaan berikut:

### Efisiensi Proses

> **Apakah RPP Generator AI mempermudah penyusunan RPP/Modul Ajar dibandingkan cara konvensional?**
>
> Pikirkan: berapa lama biasanya Anda menyusun satu RPP dari nol? Dengan RPP Generator AI, draft awal bisa dihasilkan dalam hitungan detik. Waktu yang sebelumnya dihabiskan untuk menyusun kerangka dapat dialihkan untuk menyempurnakan isi dan strategi pembelajaran.

### Kualitas Output

> **Bagian mana dari draft RPP yang masih perlu disesuaikan secara signifikan oleh guru?**
>
> Biasanya, bagian yang paling memerlukan penyesuaian adalah:
> - Konteks lokal (karakteristik siswa, fasilitas sekolah)
> - Detail kegiatan inti yang spesifik per pertemuan
> - Instrumen asesmen yang detail dan terukur
> - Kesesuaian dengan kebijakan satuan pendidikan

### Potensi Pengembangan

> **Bagaimana RPP Generator AI dapat membantu efisiensi persiapan mengajar sehari-hari?**
>
> Pertimbangkan skenario: setiap awal semester, guru perlu menyusun belasan RPP untuk berbagai topik. Dengan RPP Generator AI, kerangka awal seluruh RPP bisa disiapkan dalam waktu singkat, lalu guru tinggal menyempurnakan satu per satu sesuai kebutuhan.

### Literasi Digital

> **Apakah pengalaman menggunakan RPP Generator AI meningkatkan pemahaman Anda tentang pemanfaatan AI dalam pendidikan?**
>
> Penggunaan RPP Generator AI merupakan salah satu contoh nyata bagaimana literasi digital dan pemanfaatan teknologi AI dapat diintegrasikan dalam tugas administratif guru — tanpa mengurangi peran sentral guru dalam proses pembelajaran.

### Evaluasi Kritis

> **Bagaimana Anda menilai kelebihan dan keterbatasan penggunaan AI dalam penyusunan dokumen pembelajaran?**

| Kelebihan | Keterbatasan |
| --- | --- |
| Menghemat waktu penyusunan draft | Tidak mengenal konteks lokal kelas |
| Menghasilkan struktur yang konsisten | Butuh verifikasi akurasi konten |
| Mendorong eksplorasi metode/model baru | Tidak bisa menggantikan kreativitas pedagogis guru |
| Format sudah sesuai standar administrasi | Kualitas bergantung pada kualitas input |
| Mudah digunakan tanpa keahlian teknis khusus | Memerlukan koneksi internet |

---

## Saran Pengembangan

- Jika sekolah Anda memiliki format RPP khusus (misalnya kop surat, tata letak tertentu), draft yang dihasilkan bisa diedit lebih lanjut di Microsoft Word setelah diexport sebagai DOCX.
- Gunakan field **"Catatan tambahan untuk AI"** untuk mengarahkan gaya penulisan agar lebih sesuai dengan budaya dokumentasi di sekolah Anda.
- Manfaatkan fitur **Regenerate** untuk mendapatkan beberapa variasi draft, lalu pilih yang paling sesuai sebagai dasar penyuntingan.

---

*Dokumen ini disusun berdasarkan arsitektur dan kode sumber project RPP Generator AI — sebuah aplikasi web Next.js yang memanfaatkan Groq AI untuk membantu guru Indonesia menyusun draft RPP dengan lebih cepat, terstruktur, dan sesuai format administrasi sekolah.*
