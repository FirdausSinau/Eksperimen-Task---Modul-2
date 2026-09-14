# Eksperimen-Task---Modul-2

# 🚀 Praktikum Vanilla JavaScript (Eksperimen 1–4)

Repositori ini berisi dokumentasi, eksplorasi kode, dan analisis diagnosis error dari rangkaian eksperimen **Vanilla JavaScript**. Proyek ini bertujuan untuk memperdalam pemahaman mengenai konsep dasar JavaScript, manipulasi DOM, eksekusi asinkron, hingga teknik debugging menggunakan Chrome DevTools.

---

## 📁 Struktur Proyek

```text
.
├── eksperimen-1-console-data-types/
│   └── app.js                 # Eksplorasi typeof, konversi tipe, dan operator perbandingan
├── eksperimen-2-dom-events/
│   ├── index.html             # Struktur UI eksperimen DOM
│   ├── css/style.css          # Styling & mode tema
│   └── js/app.js              # Manipulasi DOM, defensive programming, event listener
├── eksperimen-3-async-fetch/
│   ├── index.html             # UI dengan status indicator
│   ├── css/style.css          # Styling state (loading, error, success)
│   ├── data/features.json     # Mock database JSON
│   └── js/app.js              # Async/Await, fetch, penanganan state UI, try/catch/finally
└── eksperimen-4-debugging/
    ├── index.html             # Form kalkulator total
    ├── css/style.css          # Layout form kalkulator
    └── js/app.js              # Simulasi & perbaikan 5 kasus error JavaScript

📌 Intisari Eksperimen
1. Eksperimen 1: Console dan Tipe Data
Manajemen Tipe Data: JavaScript tidak memiliki tipe data char atau int terpisah. Semua teks diolah sebagai string dan semua angka sebagai number.

Konkatenasi vs Penjumlahan: Operator + pada data bertipe string akan menyambungkan teks (string concatenation). Konversi eksplisit seperti Number() diperlukan sebelum operasi matematika.

Perbandingan Ketat (===): Memahami bahwa === mengecek nilai sekaligus tipe data tanpa konversi otomatis (implicit type coercion), menjadikannya lebih aman dibanding ==.

Penanganan NaN: Konversi teks non-angka menggunakan Number() menghasilkan nilai khusus NaN (Not-a-Number).

2. Eksperimen 2: DOM dan Event
Manipulasi Node & Teks: Menggunakan document.querySelector untuk memilih elemen dan textContent untuk memperbarui teks antarmuka secara aman.

Defensive Programming: Menerapkan pengecekan null sebelum memanipulasi elemen DOM untuk mencegah runtime error TypeError: Cannot read properties of null.

Pemisahan Peran JS & CSS: JavaScript bertugas mengelola logika dan status (classList.toggle), sedangkan CSS bertanggung jawab penuh atas gaya visual antarmuka.

Aksesibilitas (A11y): Memperbarui atribut seperti aria-pressed secara dinamis saat status komponen berubah.

3. Eksperimen 3: Promise, Fetch, dan State UI
Konsep Event Loop: Membuktikan bahwa setTimeout(fn, 0) tetap dieksekusi setelah seluruh kode sinkron di Call Stack selesai dihabiskan.

Manajemen State UI: Mengelola 5 status antarmuka secara terstruktur: idle, loading, success, empty, dan error.

Pencegahan Klik Ganda (Double-Click Prevention): Menonaktifkan tombol (disabled = true) selama proses pemuatan data untuk mencegah request HTTP berulang yang merusak antarmuka.

Diagnosis Error Asinkron: Menganalisis perbedaan Network Error/HTTP Status (misal 404) vs Parsing Error (SyntaxError pada format JSON rusak).

Jaminan Cleanup (finally): Menggunakan blok finally untuk memastikan tombol antarmuka selalu diaktifkan kembali, baik saat proses berhasil maupun gagal.

4. Eksperimen 4: Diagnosis Error JavaScript (Debugging)
Selector Mismatch: Mengidentifikasi dan memperhitungkan error TypeError akibat ketidakcocokan ID elemen antara HTML dan JavaScript.

Case-Sensitivity & Typo: Menangani ReferenceError akibat kesalahan penulisan nama variabel.

Default Form Submission: Menggunakan event.preventDefault() pada handler submit untuk mencegah pemuatan ulang halaman (page reload) dan hilangnya memori aplikasi.

Event Listener Duplikasi: Mengatasi pemanggilan fungsi ganda akibat pendaftaran event listener berulang pada elemen yang sama.

💡 Pembelajaran Utama (Key Takeaways)
Defensive Coding Pertama: Selalu validasi ketersediaan elemen DOM dan tipe data sebelum memprosesnya untuk menghindari aplikasi crash.

Kesadaran Event Loop: Kode asinkron tidak berjalan "bersamaan", melainkan ditangguhkan di queue sampai stack eksekusi sinkron bersih.

State-Driven UI: Pengguna harus selalu mendapatkan umpan balik visual yang jelas (loading indicator, tombol ter-disable, pesan error) di setiap perubahan status proses.

DevTools sebagai Alat Diagnosis: Menggunakan kombinasi tab Console, Elements, dan Network untuk melacak akar masalah (root cause) secara terstruktur.
