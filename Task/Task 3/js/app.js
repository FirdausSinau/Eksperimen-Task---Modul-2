'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  const response = await fetch('data/materi.json');

  if (!response.ok) {
    throw new Error(`Gagal memuat data (Status HTTP: ${response.status})`);
  }

  return await response.json();
}

function renderMateri(data) {
  daftar.replaceChildren();

  for (const item of data) {
    const article = document.createElement('article');
    article.classList.add('kartu');

    const h3 = document.createElement('h3');
    h3.textContent = item.judul;

    const p = document.createElement('p');
    p.textContent = `Durasi: ${item.durasi} menit`;

    article.appendChild(h3);
    article.appendChild(p);
    daftar.appendChild(article);
  }
}

async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const data = await ambilMateri();

    if (!Array.isArray(data) || data.length === 0) {
      aturState('empty', 'Tidak ada materi yang dapat ditampilkan.');
    } else {
      renderMateri(data);
      aturState('success', 'Data materi berhasil dimuat.');
    }
  } catch (error) {
    console.error(error);
    aturState('error', `Terjadi kesalahan saat memuat data (${error.message}).`);
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);