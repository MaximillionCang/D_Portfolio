# Darren Ryusa — Creative Portfolio

Portfolio berbahasa Inggris untuk menampilkan karya dan membantu Darren melamar kerja. Dibangun dengan Astro 5, TypeScript, dan CSS; hasil build berupa website statis untuk Vercel.

## Menjalankan

Gunakan Node.js 22 atau lebih baru dari folder Portfolio_Darren:

```powershell
npm install
npm run dev
```

Sebelum publikasi:

```powershell
npx tsc --noEmit
npm run build
```

Vercel: preset **Astro**, build command `npm run build`, output `dist`, root direktori proyek. Tidak perlu environment variable. Build memakai media web yang sudah masuk Git, sehingga folder asli Asset tidak diperlukan di Vercel.

## Isi dan tampilan

- 11 proyek, dengan filter Graphic Design, Social media content, Illustration, dan Photography.
- 62 gambar proyek dan 8 video, termasuk 29 foto dan dua reel Mantra Talks.
- Galeri gambar layar besar dengan tombol Close, Previous, Next dan kontrol keyboard.
- Video native dengan kontrol browser, tanpa autoplay; portrait memakai bingkai ponsel, landscape memakai bingkai tablet.
- Email, telepon, dan LinkedIn memiliki ikon dan label. Informasi kontak berada di `src/layouts/BaseLayout.astro`.

Font: Instrument Serif, DM Sans, Space Mono. Palet tampilan: #4B86B0, #C6D8E6, #F4F5F9, #F8F5B0, #4D2A0A. Tidak ada latar UI pink; warna asli karya/foto dipertahankan. Arahan desain ada di DESIGN.md.

## Mengubah konten

`src/data/projects.ts` menyimpan judul, kategori, deskripsi, kontribusi, software, sampul, galeri, dan video setiap proyek. Urutan array menentukan urutan beranda dan tautan Next project. Slug real-food dipertahankan untuk proyek yang sekarang bernama **Keep It Real**, agar URL lama tetap berfungsi.

`src/data/skills.ts` menyimpan tujuh nilai software yang diberikan klien. Label self-rated membedakan penilaian pribadi dari sertifikasi. Angka Sportlight 15.1k views dan 606 shares berasal dari klien dan bukan penghitung langsung.

Untuk menambah gambar, letakkan file asli di subfolder Asset, jalankan penyiapan media, lalu referensikan path sumbernya melalui data proyek. Alt text harus mendeskripsikan gambar sebenarnya. Software Tutorising dan Sportlight sengaja tidak diisi karena klien belum menyebutkannya.

## Menyiapkan media

Folder Asset berisi file asli dan diabaikan Git. Versi web berada di `src/assets/portfolio` dan `public/videos`, serta **harus** masuk Git. Untuk menyiapkan ulang, pasang FFmpeg dan jalankan:

```powershell
npm run portfolio:prepare
```

Jika FFmpeg tidak berada di PATH:

```powershell
node scripts/prepare-portfolio.mjs Asset "C:\path\ke\ffmpeg.exe"
```

Script mempertahankan file asli. Gambar diorientasikan dari EXIF, dikonversi menjadi WebP maksimum 2000 px, dan memiliki thumbnail 720 px. PNG transparan dipangkas; kanvas putih luar papan Carnival dibuang tanpa menghapus putih di dalam desain. Mockup Mantra diputar menjadi portrait. Video dikonversi ke MP4 H.264/AAC dengan faststart. Cache hash di `src/data/media-manifest.json` menghindari konversi ulang file yang sama.

Dua reel Mantra disimpan di `Asset/Graphic_Design/mantra talks/reels` sebagai mantra-talks-reel-01.mp4 dan mantra-talks-reel-02.mp4. Versi web lokal dapat diputar tanpa login Instagram; tautan posting aslinya tetap tersedia.

`assets:prepare` dan `videos:prepare` adalah script lama untuk aset hero/kursor dan dua video Carnival. Gunakan `portfolio:prepare` untuk seluruh koleksi proyek terbaru.

## Pemeriksaan sebelum push

Periksa beranda dan detail proyek di desktop/HP, filter, galeri keyboard, semua video, serta informasi kontak. Laporan QC terakhir dan batas verifikasinya ada di docs/QC-2026-11-04.md.

Kursor menggunakan PNG transparan sRGB 32×32, hotspot 16,16 dan fallback sistem. Mouse/trackpad memakai kursor khusus; input teks tetap memakai kursor teks. Pengujian langsung Safari/macOS tetap memerlukan perangkat Mac. Nomor 0177340593 dipertahankan sesuai data klien; format internasional belum dikonfirmasi.

```powershell
git push origin main
```

Push ke branch yang terhubung akan memicu build Vercel. Folder dist tidak perlu dimasukkan Git.
