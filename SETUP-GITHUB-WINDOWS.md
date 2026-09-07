# Paradise Cafe & Billiard — Panduan Upload GitHub + Vercel + Cloudinary

## A. Siapkan project di komputer

1. Extract ZIP ini.
2. Buka folder `paradise-work` (jika ZIP lama) atau folder project ini.
3. Pastikan file `package.json` terlihat langsung di dalam folder project.
4. Jangan upload file `.env` / `.env.local` ke GitHub.

## B. Buat repository GitHub

1. Masuk ke GitHub.
2. Klik **+** → **New repository**.
3. Nama repository: `paradise-cafe-billiard`
4. Pilih **Private** atau **Public** sesuai kebutuhan.
5. Jangan centang README, .gitignore, atau License karena project sudah memilikinya.
6. Klik **Create repository**.

## C. Upload dengan GitHub Desktop (paling mudah untuk Windows)

1. Install GitHub Desktop.
2. Login dengan akun GitHub.
3. Pilih **File → Add local repository**.
4. Pilih folder project Paradise.
5. Jika diminta bahwa folder belum merupakan Git repository, pilih **create a repository** / **create repository**.
6. Pastikan Local Path menunjuk ke folder yang berisi `package.json`.
7. Commit message: `Initial Paradise Cafe & Billiard website`.
8. Klik **Commit to main**.
9. Klik **Publish repository**.
10. Nama repository: `paradise-cafe-billiard`.
11. Pilih Private/Public.
12. Klik **Publish Repository**.

## D. Alternatif memakai Git Bash / PowerShell

Buka terminal di folder yang berisi `package.json`, lalu:

```bash
git init
git add .
git commit -m "Initial Paradise Cafe & Billiard website"
git branch -M main
git remote add origin https://github.com/USERNAME/paradise-cafe-billiard.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

## E. Cloudinary

Project ini memakai upload server-side menggunakan API Secret. Jadi **tidak perlu membuat unsigned upload preset** untuk fitur admin website ini.

Siapkan tiga nilai dari Cloudinary:

- Cloud Name
- API Key
- API Secret

Jangan pernah memasukkan API Secret ke GitHub.

## F. Vercel

1. Login ke Vercel.
2. **Add New → Project**.
3. Pilih repository `paradise-cafe-billiard`.
4. Framework akan terdeteksi sebagai Next.js.
5. Tambahkan Environment Variables:

```text
CLOUDINARY_CLOUD_NAME = nilai Cloud Name Anda
CLOUDINARY_API_KEY = nilai API Key Anda
CLOUDINARY_API_SECRET = nilai API Secret Anda
ADMIN_PASSWORD = password admin website Anda
```

6. Klik **Deploy**.

## G. Setelah online

Buka:

```text
https://domain-anda.vercel.app/admin
```

Masuk dengan `ADMIN_PASSWORD`.

Kemudian Anda bisa upload foto dari HP/komputer. Foto disimpan di Cloudinary pada folder:

```text
paradise-cafe/gallery
```

## H. Keamanan penting

- Jangan upload `.env` atau `.env.local` ke GitHub.
- Jangan pernah menulis `CLOUDINARY_API_SECRET` di kode frontend.
- Jangan memberikan password admin kepada pelanggan.
- Jika API Secret Cloudinary pernah terlanjur masuk GitHub, segera ganti/regenerate credential di Cloudinary.

## I. Perubahan website di masa depan

Untuk perubahan teks, harga, menu, atau desain yang masih berada di source code:

```text
Edit → git add . → git commit → git push → Vercel deploy otomatis
```

Untuk foto galeri:

```text
/admin → upload foto → langsung tampil
```

Tidak perlu upload ulang GitHub untuk menambah foto.
