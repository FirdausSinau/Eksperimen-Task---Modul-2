# Proyek Modul 2: Vanilla JavaScript & Interaktivitas Web

Proyek praktikum ini berfokus pada implementasi Vanilla JavaScript untuk memanipulasi DOM, menangani form, dan mengelola permintaan data asinkron (AJAX/Fetch API). Proyek ini dibagi menjadi beberapa bagian tugas dan skenario pengujian ketahanan kode.

---

## 🧪 Bagian 1: Eksperimen dan Pengujian Skenario

Bagian ini mendokumentasikan skenario eksperimen yang dilakukan untuk menguji ketahanan aplikasi (terutama pada modul asinkron) terhadap berbagai kegagalan (*failure scenarios*) dan manajemen *state*.

### Eksperimen yang Dilakukan:
1. **Eksperimen Path Salah (Error 404):** 
   Mengubah URL `fetch` ke rute yang salah secara sengaja untuk menguji penangkapan error status HTTP. Hasilnya, UI berhasil beralih ke *state error* (merah) dan memunculkan tombol "Coba Lagi".
2. **Eksperimen JSON Rusak (Syntax Error):** 
   Menghapus tanda baca pada berkas `.json` untuk memicu kegagalan *parsing*. Blok `catch` berhasil mendeteksi kegagalan tersebut dan mencegah aplikasi *crash*.
3. **Eksperimen Data Kosong (State Empty):** 
   Mengosongkan isi array pada JSON untuk memastikan aplikasi dapat menangani kondisi "Tidak ada data" dengan memberikan pesan yang jelas kepada pengguna tanpa memicu error teknis.
4. **Eksperimen Server Mati (Network Error):** 
   Mematikan ekstensi *local server* secara tiba-tiba untuk memicu `TypeError: Failed to fetch`.
5. **Eksperimen Klik Ganda (Race Condition):** 
   Menguji penonaktifan interaksi secara sementara (`disabled = true`) ketika proses *fetching* sedang berjalan, memastikan data tidak ter-*render* lebih dari satu kali (*duplicate*).

---

## 💻 Bagian 2: Daftar Task & Homework

Berikut adalah daftar tugas (*Task*) yang diselesaikan di dalam proyek ini:

### Task 1: JavaScript Logic Builder
*   Membangun fungsi murni (*pure function*) tanpa manipulasi DOM untuk memvalidasi nilai angka, menentukan kategori predikat (A, B, C, D), status kelulusan, serta menghasilkan objek ringkasan statistik (total, rata-rata, lulus/tidak).

### Task 2: DOM dan Form (Daftar Peserta)
*   Membuat form interaktif yang memvalidasi input secara *real-time* (nama tidak boleh kosong, prodi wajib dipilih).
*   Mengelola atribut aksesibilitas `aria-invalid` untuk validasi kolom.
*   Menambahkan fitur *filter* data dan merender ulang DOM menggunakan kombinasi `document.createElement` dan `replaceChildren` agar terhindar dari tumpukan elemen dan celah XSS.

### Task 3: Asynchronous Data Loader (Materi JS)
*   Menerapkan penggunaan `fetch` API dan `async/await` untuk memuat berkas lokal `materi.json`.
*   Membangun sistem *state management* sederhana (`idle`, `loading`, `success`, `error`, `empty`) yang diikat langsung dengan atribut `data-state` pada CSS.

### Task 4 (Homework): Interactive Profile Card
*   **Deskripsi:** Aplikasi kartu profil interaktif yang memuat informasi biodata dan keterampilan (*skills*) dari berkas `profile.json` secara asinkron.
*   **Fitur Utama:**
    *   Sistem *Toggle* detail biodata memanfaatkan `classList.toggle` dan atribut `aria-expanded`.
    *   Penggantian tema antarmuka (Terang / Gelap).
    *   Manajemen *state* lengkap saat memuat profil pertama kali (mendukung fitur muat ulang dan coba lagi jika gagal).
    *   Fitur penambahan keterampilan baru (dengan validasi input kosong) dan penghapusan keterampilan secara individual.

---

## 🚀 Cara Menjalankan Proyek Lokal

Karena proyek ini menggunakan Fetch API yang terkena kebijakan *CORS (Cross-Origin Resource Sharing)* pada *file protocol* (`file://`), proyek **wajib** dijalankan menggunakan *Local Web Server*.

1. Buka folder proyek ini di **Visual Studio Code**.
2. Pastikan ekstensi **Live Server** (oleh Ritwick Dey) sudah terpasang.
3. Buka berkas `index.html` dari Task yang ingin kamu jalankan.
4. Klik kanan pada area editor kode HTML tersebut, lalu pilih **Open with Live Server** (atau klik tombol **Go Live** di *status bar* bawah).
5. Aplikasi akan otomatis terbuka di peramban (browser) bawaan pada alamat `http://127.0.0.1:5500/`.
6. Untuk melihat log proses asinkron dan eksperimen *error*, tekan **F12** untuk membuka **Developer Tools**, lalu pantau tab **Network** dan **Console**.
