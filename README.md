# Paham Diam - Personality Card Generator

Web app psikologi interaktif untuk menganalisis "Dark Triad" dan "Shadow Archetypes" user.
Dibangun menggunakan **React**, **TypeScript**, **Tailwind CSS**, dan **Vite**.

## 🚀 Cara Menjalankan Project

1. **Install Dependencies** (hanya pertama kali):

    ```bash
    npm install
    ```

2. **Jalankan Mode Development** (biar bisa diedit live):

    ```bash
    npm run dev
    ```

    Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

3. **Build untuk Production** (kalau mau upload/hosting):

    ```bash
    npm run build
    ```

    Hasil file ada di folder `dist/`.

---

## 📂 Struktur Folder Penting

- **`src/data/`**: Pusat data konten. Ganti pertanyaan/hasil di sini.
  - `questions.ts`: Daftar 15 pertanyaan & skornya.
  - `archetypes.ts`: Daftar 12 tipe kepribadian (judul, deskripsi, warna).
  - `quotes.ts`: Kumpulan quotes untuk setiap tipe.
- **`src/utils/`**: Logika penghitungan.
  - `scoring.ts`: Rumus matematika & IF-THEN logic penentuan hasil.
- **`src/pages/`**: Tampilan halaman.
  - `QuizPage.tsx`: Halaman quiz.
  - `ResultPage.tsx`: Halaman hasil (kartu).

## 📝 Panduan Update Konten

Untuk panduan lengkap cara mengganti pertanyaan, menambah archetype, atau mengubah logika scoring, lihat file:
👉 **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)**

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v3
- **Build Tool**: Vite
- **Fitur Khusus**: `html2canvas` (Download Kartu), Dynamic Themes.
