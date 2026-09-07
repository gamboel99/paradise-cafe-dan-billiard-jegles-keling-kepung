# Paradise Cafe & Billiard — Website Profile

Website profile premium untuk Paradise Cafe & Billiard, Keling, Kepung, Kediri.

## Stack ringan

- Next.js 16 + React + TypeScript
- Vercel untuk hosting/deployment
- GitHub untuk source code
- Cloudinary untuk penyimpanan foto galeri
- WhatsApp untuk booking, order, testimoni, dan pengaduan
- CSS custom tanpa framework UI

**Tidak menggunakan Supabase, database, atau storage Vercel.**

## Fitur

- Landing page premium bergaya hospitality / entertainment
- Profil usaha
- Daftar menu dan harga dari menu yang diberikan
- Booking billiard, karaoke, pengajian, rapat, dan acara via WhatsApp
- Pemesanan makanan via WhatsApp
- Google Maps
- Galeri dokumentasi
- `/admin` untuk login dan upload/hapus foto langsung lewat browser
- Foto galeri otomatis dibaca dari folder Cloudinary
- Testimoni dikirim langsung ke WhatsApp pemilik
- Pengaduan/masukan dikirim langsung ke WhatsApp pemilik
- Program promosi ditampilkan di website tanpa database

## 1. Siapkan Cloudinary (sekali saja)

Buat akun Cloudinary, lalu siapkan:

- Cloud Name
- API Key
- API Secret

Website mengunggah foto melalui server Next.js sehingga **API Secret tidak pernah dikirim ke browser**.

Folder yang dipakai otomatis: `paradise-cafe/gallery`.

Tidak perlu membuat database dan tidak perlu membuat Supabase project.

## 2. Environment Variables

Salin `.env.example` menjadi `.env.local` untuk pengembangan lokal, atau masukkan nilai yang sama di Vercel:

```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_PASSWORD=buat-password-admin-yang-kuat
```

Jangan beri awalan `NEXT_PUBLIC_` pada tiga credential Cloudinary atau password admin.

## 3. Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Halaman admin:
`http://localhost:3000/admin`

## 4. Upload foto tanpa menyentuh kode

1. Buka `/admin`.
2. Masukkan `ADMIN_PASSWORD`.
3. Pilih satu atau banyak foto.
4. Tunggu upload selesai.
5. Foto otomatis muncul di Galeri website.

Untuk menghapus foto, klik ikon tempat sampah pada foto.

Jadi untuk dokumentasi kegiatan baru, Anda cukup memakai HP dan browser. Tidak perlu membuka GitHub, mengedit script, atau melakukan deploy ulang.

## 5. GitHub + Vercel

```bash
git init
git add .
git commit -m "Paradise Cafe & Billiard website"
git branch -M main
git remote add origin https://github.com/USERNAME/paradise-cafe-billiard.git
git push -u origin main
```

Di Vercel:

1. Import repository GitHub.
2. Tambahkan empat Environment Variables dari bagian sebelumnya.
3. Deploy.

Setelah website online, buka `/admin` untuk mengelola galeri.

## Catatan arsitektur

Cloudinary dipakai hanya sebagai media library. Tidak ada tabel/database yang harus dirawat. Data menu, fasilitas, alamat, dan nomor WhatsApp berada di source code karena sifatnya relatif tetap. Galeri bersifat dinamis dan dibaca langsung dari Cloudinary.

Booking, order, testimoni, dan pengaduan diarahkan ke WhatsApp sehingga tidak memerlukan sistem database atau panel administrasi tambahan.
