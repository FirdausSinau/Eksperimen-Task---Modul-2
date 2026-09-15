'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  const hasil = {
    valid: true,
    errorNama: '',
    errorProdi: ''
  };

  const namaBersih = (calon.nama || '').trim();

  if (namaBersih.length < 3) {
    hasil.valid = false;
    hasil.errorNama = 'Nama minimal 3 karakter';
  }

  if (!calon.prodi) {
    hasil.valid = false;
    hasil.errorProdi = 'Program studi wajib dipilih';
  }

  return hasil;
}

function buatKartuPeserta(item) {
  const article = document.createElement('article');
  article.classList.add('kartu');

  // Sesuai instruksi modul: menggunakan h2 dan p
  const h2 = document.createElement('h2');
  h2.textContent = item.nama;

  const p = document.createElement('p');
  p.textContent = item.prodi;

  article.appendChild(h2);
  article.appendChild(p);

  return article;
}

function renderPeserta(data) {
  daftar.replaceChildren();

  if (!Array.isArray(data) || data.length === 0) {
    const pesanKosong = document.createElement('p');
    pesanKosong.textContent = 'Tidak ada peserta';
    daftar.appendChild(pesanKosong);
    return;
  }

  for (const item of data) {
    const kartu = buatKartuPeserta(item);
    daftar.appendChild(kartu);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const calon = {
    nama: namaInput.value,
    prodi: prodiInput.value
  };

  const hasilValidasi = validasiPeserta(calon);

  if (!hasilValidasi.valid) {
    errorNama.textContent = hasilValidasi.errorNama;
    errorProdi.textContent = hasilValidasi.errorProdi;

    namaInput.setAttribute('aria-invalid', hasilValidasi.errorNama ? 'true' : 'false');
    prodiInput.setAttribute('aria-invalid', hasilValidasi.errorProdi ? 'true' : 'false');
    return;
  }

  // Jika valid: bersihkan error
  errorNama.textContent = '';
  errorProdi.textContent = '';
  namaInput.setAttribute('aria-invalid', 'false');
  prodiInput.setAttribute('aria-invalid', 'false');

  // Push object baru dengan ID unik
  peserta.push({
    id: Date.now(),
    nama: calon.nama.trim(),
    prodi: calon.prodi
  });

  form.reset();
  renderPeserta(peserta);
});

filterInput.addEventListener('change', () => {
  const pilihan = filterInput.value;

  if (pilihan === 'semua') {
    renderPeserta(peserta);
  } else {
    const terfilter = peserta.filter((item) => item.prodi === pilihan);
    renderPeserta(terfilter);
  }
});

renderPeserta(peserta);