# Darren Ryusa — Creative Portfolio

Website portfolio berbahasa Inggris untuk Darren Ryusa. Dibangun dengan Astro, TypeScript, CSS, dan aset lokal dari folder `Asset`. Hasilnya adalah situs statis yang siap dihubungkan ke Vercel.

## Menjalankan website

Gunakan Node.js 22 atau lebih baru. Dari folder `Portfolio_Darren`:

```powershell
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan. Sebelum mengirim perubahan ke Vercel, jalankan `npm run build`. Folder `dist` adalah hasil build dan tidak perlu diedit.

## Memperbarui karya

1. Simpan gambar baru di `src/assets` dalam format web yang ringan, misalnya WebP. File asli boleh tetap berada di `Asset`.
2. Tambahkan atau ubah proyek di `src/data/projects.ts`. Isi `slug`, `title`, `category`, ringkasan, gambar sampul, `overview`, dan `gallery`. Setiap gambar perlu alt text yang menjelaskan isinya.
3. Jalankan `npm run dev`, buka kartu proyek, coba filternya, lalu cek tampilan ponsel.
4. Jalankan `npm run build` sebelum publikasi.

Kategori yang tersedia adalah **All projects**, **Graphic Design**, **Social media content**, **Illustration**, dan **Photography**. Kategori kosong otomatis menampilkan pesan “More to come”. Urutan proyek mengikuti urutan dalam array `projects`. Properti `featured: true` menentukan kartu unggulan.

Untuk membuat ulang versi web dari aset sumber yang sekarang, jalankan `npm run assets:prepare`. Script `scripts/prepare-assets.mjs` membaca folder `Asset` tanpa mengubah file asli. Jika nama atau lokasi aset sumber berubah, sesuaikan daftar `selections` di script tersebut.

Kursor bintang dibuat dari `Asset/Element/Pointer.png` dan disimpan sebagai PNG sRGB transparan 32×32 di `public/cursor-star.png`. Ukuran dan hotspot 16,16 mengikuti rekomendasi kompatibilitas [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/cursor). CSS memakai `any-pointer: fine` dan `any-hover: hover` untuk mouse/trackpad, dengan fallback sistem dan kursor teks standar. Safari/macOS perlu dicek langsung pada perangkat Mac; preview pengembangan memakai Chromium di Windows.

Struktur aset terbaru memakai `Asset/Element`, `Asset/Graphic_Design`, dan `Asset/Social_Media_Content`; foto profil bernama `Photo_Profile.JPG`. Script penyiapan gambar sudah mengikuti struktur ini. Logo berada di properti `logo`, sedangkan `cover` tetap berisi gambar utama halaman detail. Warna kotak logo diatur melalui `cardTone`.

Gambar proyek dipangkas mengikuti batas transparansinya. Khusus papan Carnival, `scripts/image-canvas.mjs` menghapus hanya kanvas putih yang tersambung ke tepi; putih di dalam karya dipertahankan. Mockup Mantra Talks diputar 90° menjadi portrait saat penyiapan aset, dan `coverLayout: 'portrait'` membuat framenya mengikuti orientasi itu. Seluruh file asli di `Asset` tetap utuh.

Kontak di `src/layouts/BaseLayout.astro` mencakup email, telepon, dan [LinkedIn Darren Ryusa](https://www.linkedin.com/in/darren-ryusa-31659b30b/). Teks berjalan memiliki tombol pause/resume serta mengikuti preferensi reduced motion. Di HP, filter dapat digeser mendatar tanpa membuat halaman ikut melebar.

Halaman Carnival menampilkan dua video dengan poster cuplikan dan kontrol pemutaran. Untuk membuat ulang MP4 dan posternya, pasang FFmpeg lalu jalankan `npm run videos:prepare`. Jika FFmpeg tidak ada di PATH, jalankan `node scripts/prepare-videos.mjs Asset "path/ke/ffmpeg.exe"`. Video memakai `preload="none"` dan tidak diputar otomatis. Lihat `docs/ASSET_AUDIT.md` untuk inventaris 44 aset dan rekomendasi penempatan media tambahan.

## Hal yang perlu dilengkapi sebelum dipublikasikan sebagai portfolio final

- Minta Darren meninjau semua deskripsi proyek serta menambahkan brief, kontribusi pribadi, proses, dan hasil yang benar-benar dapat diklaim. Teks saat ini hanya mendeskripsikan karya yang terlihat pada aset.
- Konfirmasi apakah Mantra Talks memang masuk kategori Social media content.
- Tambahkan karya Social media content, Illustration, dan Photography lain saat aset dan ceritanya tersedia.
- Konfirmasi format internasional untuk nomor telepon `0177340593` bila website ditujukan kepada perekrut lintas negara.

## Struktur penting

- `src/pages/index.astro`: beranda, About, filter karya.
- `src/pages/work/[slug].astro`: halaman detail otomatis untuk tiap proyek.
- `src/data/projects.ts`: daftar dan penjelasan proyek.
- `src/styles/global.css`: seluruh arahan visual dan tampilan responsif.
- `src/layouts/BaseLayout.astro`: navigasi, metadata, dan kontak.
- `src/assets`: gambar versi web; `public`: kursor, favicon, video.

Vercel dapat membangun proyek Astro statis ini dengan build command `npm run build` dan output directory `dist`. Belum ada konfigurasi server atau kredensial yang diperlukan.
