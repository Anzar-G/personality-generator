# Dokumentasi Sistem Web: Paham Diam

Dokumen ini menjelaskan arsitektur teknis, alur aplikasi, dan fitur utama dari web app "Personality Generator".

---

## 1. Overview Aplikasi

**Paham Diam** adalah aplikasi web berbasis React yang berfungsi sebagai tes kepribadian interaktif. Aplikasi ini dirancang untuk:

1. Mengumpulkan respon user melalui 15 pertanyaan psikologis.
2. Menghitung skor berdasarkan matriks kompleks (Dark Triad, Attachment Style, Trauma Response, Emotional Health).
3. Menampilkan hasil dalam bentuk "Personality Card" yang visual, dinamis, dan dapat diunduh.

---

## 2. Alur Pengguna (User Flow)

### A. Quiz Phase (`QuizPage.tsx`)

1. **Input User**: User memasukkan nama.
2. **Pertanyaan**: User menjawab 15 pertanyaan secara berurutan.
    - *State Management*: Jawaban disimpan sementara di React State (`answers`).
    - *Scoring*: Setiap jawaban memiliki bobot skor tersembunyi.
3. **Kalkulasi**: Setelah pertanyaan terakhir, sistem menghitung total skor:
    - Menjumlahkan poin untuk setiap metric.
    - Menentukan Archetype pemenang berdasarkan logic `IF-THEN`.
4. **Navigasi**: Data hasil dikompres (Base64) dan dikirim via URL ke halaman hasil.
    - *Kenapa URL?* Agar aplikasi stateless (tidak butuh database) tapi hasil tetap bisa di-share/bookmark.

### B. Result Phase (`ResultPage.tsx`)

1. **Parsing Data**: Halaman membaca data dari URL parameter.
2. **Visualisasi**:
    - **Dynamic Theme**: Halaman mendeteksi `color` dari archetype (misal: Merah untuk Manipulator) dan mengubah seluruh aksen warna (Progress bar, Glow effek, Tombol).
    - **Stats**: Menampilkan persentase Dark Triad & Emotional Health.
3. **Fitur Interaktif**:
    - **Download Card**: Menggunakan `html2canvas` untuk memotret elemen kartu menjadi PNG.
    - **Join Challenge**: Form simulasi untuk menangkap email user.

---

## 3. Arsitektur Teknis

### Stack

- **Framework**: React 19 (Component-based UI).
- **Language**: TypeScript (Type-safe, meminimalisir bug saat manipulasi data skor).
- **Build Tool**: Vite (Cepat, Hot Module Replacement).
- **Styling**: Tailwind CSS (Utility-first, responsive design).

### Struktur Komponen Penting

| Komponen | Lokasi | Fungsi Utama |
| :--- | :--- | :--- |
| `QuizPage` | `src/pages/QuizPage.tsx` | Menangani logika kuis, transisi soal, dan perhitungan skor awal. |
| `ResultPage` | `src/pages/ResultPage.tsx` | Menampilkan hasil, logika visual dinamis, dan fitur download. |
| `scoring.ts` | `src/utils/scoring.ts` | "Otak" aplikasi. Berisi rumus normalisasi skor & logika prioritas archetype. |
| `Data Layer` | `src/data/*.ts` | Memisahkan konten (teks/data) dari kode logika agar mudah diedit. |

---

## 4. Dependensi Kunci

- **`react-router-dom`**: Untuk navigasi antar halaman tanpa reload.
- **`html2canvas`**: Library vital untuk fitur "Simpan Gambar".
- **`lucide-react`**: Library icon ringan (Zap, Download, Share).
- **`clsx` & `tailwind-merge`**: Utility untuk menangani class CSS dinamis.

---

## 5. Deployment

Aplikasi ini bersifat **Static Web App**.

- Tidak memerlukan backend server (Node.js/Python/PHP).
- Bisa di-hosting gratis di **Vercel**, **Netlify**, atau **GitHub Pages**.
- Cukup upload folder `dist/` setelah menjalankan perintah `npm run build`.
