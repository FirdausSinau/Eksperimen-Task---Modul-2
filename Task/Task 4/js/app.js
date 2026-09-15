'use strict';

const statusEl = document.querySelector('#status');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');
const tombolTema = document.querySelector('#btn-tema');

const kartuProfil = document.querySelector('#kartu-profil');
const profilNama = document.querySelector('#profil-nama');
const profilPeran = document.querySelector('#profil-peran');
const profilBio = document.querySelector('#profil-bio');

const tombolDetail = document.querySelector('#btn-detail');
const detailProfil = document.querySelector('#profil-detail');

const formSkill = document.querySelector('#form-skill');
const inputSkill = document.querySelector('#input-skill');
const errorSkill = document.querySelector('#error-skill');
const daftarSkillEl = document.querySelector('#daftar-skill');
const pesanSkillKosong = document.querySelector('#pesan-skill-kosong');

let daftarSkill = [];

function aturState(state, pesan) {
  statusEl.dataset.state = state;
  statusEl.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilProfil() {
  const response = await fetch('data/profile.json');
  if (!response.ok) {
    throw new Error(`Gagal memuat profil (Status HTTP ${response.status})`);
  }
  return await response.json();
}

function renderSkills() {
  daftarSkillEl.replaceChildren();

  if (daftarSkill.length === 0) {
    pesanSkillKosong.hidden = false;
    return;
  }

  pesanSkillKosong.hidden = true;

  daftarSkill.forEach((skill, index) => {
    const li = document.createElement('li');
    li.textContent = skill;

    const btnHapus = document.createElement('button');
    btnHapus.textContent = 'Hapus';
    btnHapus.classList.add('btn-hapus');
    btnHapus.type = 'button';
    btnHapus.addEventListener('click', () => {
      daftarSkill.splice(index, 1);
      renderSkills();
    });

    li.appendChild(btnHapus);
    daftarSkillEl.appendChild(li);
  });
}

async function muatProfil() {
  aturState('loading', 'Memuat data profil...');
  tombolMuat.disabled = true;
  kartuProfil.hidden = true;

 await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const data = await ambilProfil();

    if (!data || Object.keys(data).length === 0) {
      aturState('empty', 'Data profil kosong.');
    } else {
      profilNama.textContent = data.nama;
      profilPeran.textContent = data.peran;
      profilBio.textContent = data.bio;
      daftarSkill = [...(data.keterampilan || [])];

      renderSkills();
      kartuProfil.hidden = false;
      aturState('success', 'Profil berhasil dimuat.');
    }
  } catch (error) {
    console.error(error);
    aturState('error', `Terjadi kesalahan: ${error.message}`);
  } finally {
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatProfil);
tombolCobaLagi.addEventListener('click', muatProfil);

tombolTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

tombolDetail.addEventListener('click', () => {
  const isExpanded = tombolDetail.getAttribute('aria-expanded') === 'true';
  tombolDetail.setAttribute('aria-expanded', !isExpanded);
  
  detailProfil.classList.toggle('is-open');
  detailProfil.hidden = isExpanded;
  
  tombolDetail.textContent = isExpanded ? 'Tampilkan Detail' : 'Sembunyikan Detail';
});

formSkill.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = inputSkill.value.trim();

  if (!val) {
    errorSkill.textContent = 'Keterampilan tidak boleh kosong!';
    inputSkill.setAttribute('aria-invalid', 'true');
    return;
  }

  errorSkill.textContent = '';
  inputSkill.setAttribute('aria-invalid', 'false');

  daftarSkill.push(val);
  inputSkill.value = '';
  renderSkills();
});

muatProfil();