'use strict';

const tombolMuat = document.querySelector('#muat-data');
const status = document.querySelector('#status');
const daftarFitur = document.querySelector('#daftar-fitur');

function tampilkanState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
}

function buatKartu(item) {
  const article = document.createElement('article');
  const heading = document.createElement('h2');
  const description = document.createElement('p');

  article.classList.add('feature-card');
  heading.textContent = item.judul;
  description.textContent = item.deskripsi;
  article.append(heading, description);

  return article;
}

function renderFitur(items) {
  daftarFitur.textContent = '';
  for (const item of items) {
    daftarFitur.append(buatKartu(item));
  }
}

async function ambilFitur() {
  const response = await fetch('data/features.json');
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  return response.json();
}

async function muatFitur() {
  tombolMuat.disabled = true;
  tombolMuat.setAttribute('aria-busy', 'true');
  daftarFitur.textContent = '';
  tampilkanState('loading', 'Memuat data...');

  await new Promise((resolve) => setTimeout(resolve, 2000));
  //ditunda 2 detik karena fetch() terlalu cepat, sehingga tidak terlihat efek loading ny

  try {
    const data = await ambilFitur();
    if (!Array.isArray(data)) {
      throw new Error('Format data bukan array.');
    }

    if (data.length === 0) {
      tampilkanState('empty', 'Data kosong.');
      return;
    }

    renderFitur(data);
    tampilkanState('success', `${data.length} data berhasil ditampilkan.`);
  } catch (error) {
    console.error(error);
    tampilkanState('error', `Gagal: ${error.message}`);
  } finally {
    tombolMuat.disabled = false;
    tombolMuat.removeAttribute('aria-busy');
  }
}

tombolMuat.addEventListener('click', muatFitur);
