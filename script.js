// Toggle Menu Mobile
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) navLinks.classList.toggle("show");
}

// Filter Proyek
function filterProyek(kategori, tombol) {
  const semuaTombol = document.querySelectorAll(".filter-btn");
  semuaTombol.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  if (tombol) {
    tombol.classList.remove("btn-outline");
    tombol.classList.add("btn-primary");
  }

  const kartuProyek = document.querySelectorAll(".project-item");
  kartuProyek.forEach((kartu) => {
    if (kategori === "semua" || kartu.dataset.kategori === kategori) {
      kartu.style.display = "flex";
    } else {
      kartu.style.display = "none";
    }
  });
}

// Modal Detail Proyek
function lihatDetailProyek(judul, lokasi, volume, kategori, spek) {
  const modal = document.getElementById("modalProyek");
  if (!modal) return;
  document.getElementById("mJudul").innerText = judul;
  document.getElementById("mLokasi").innerText = lokasi;
  document.getElementById("mVolume").innerText = volume;
  document.getElementById("mKategori").innerText = kategori;
  document.getElementById("mSpek").innerText = spek;
  modal.style.display = "flex";
}

function tutupModalProyek() {
  const modal = document.getElementById("modalProyek");
  if (modal) modal.style.display = "none";
}

// Kirim & Rekam Form RAB ke WhatsApp
function kirimKeWhatsApp(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const perusahaan = document.getElementById("perusahaan").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const layanan = document.getElementById("layanan").value;
  const detail = document.getElementById("detail").value;

  if (!nama || !whatsapp || !detail) {
    alert("Mohon lengkapi data formulir yang wajib diisi!");
    return;
  }

  // Rekam ke LocalStorage
  const dataBaru = {
    nama,
    perusahaan,
    whatsapp,
    layanan,
    detail,
    tanggal: new Date().toLocaleString() + " (Via WhatsApp)",
  };
  let riwayat = JSON.parse(localStorage.getItem("riwayat_rab")) || [];
  riwayat.unshift(dataBaru);
  localStorage.setItem("riwayat_rab", JSON.stringify(riwayat));
  tampilkanRiwayat();

  // Buka WhatsApp
  const nomorAdmin = "6282111809332"; // Nomor WhatsApp Anda
  const pesan = `Halo Tim MCG, saya ingin mengajukan Permintaan RAB:\n\n*Nama:* ${nama}\n*Perusahaan:* ${perusahaan}\n*No WhatsApp:* ${whatsapp}\n*Layanan:* ${layanan}\n*Detail Proyek:* ${detail}`;
  const urlWA = `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

  window.open(urlWA, "_blank");
  alert("Data berhasil terekam di sistem dan WhatsApp akan segera dibuka!");
  document.getElementById("formRab").reset();
}

// Kirim & Rekam Form RAB ke Email
function kirimKeEmail(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const perusahaan = document.getElementById("perusahaan").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const layanan = document.getElementById("layanan").value;
  const detail = document.getElementById("detail").value;

  if (!nama || !whatsapp || !detail) {
    alert("Mohon lengkapi data formulir yang wajib diisi!");
    return;
  }

  // Rekam ke LocalStorage
  const dataBaru = {
    nama,
    perusahaan,
    whatsapp,
    layanan,
    detail,
    tanggal: new Date().toLocaleString() + " (Via Email)",
  };
  let riwayat = JSON.parse(localStorage.getItem("riwayat_rab")) || [];
  riwayat.unshift(dataBaru);
  localStorage.setItem("riwayat_rab", JSON.stringify(riwayat));
  tampilkanRiwayat();

  // Konfigurasi Email Tujuan & Format Pesan
  const emailTujuan = "furqonseeker99@gmail.com"; // Ganti dengan email Anda
  const subjek = `Pengajuan RAB Proyek - ${perusahaan} (${nama})`;
  const isiEmail =
    `Halo Tim Estimator PT Multi Cipta Glass,\n\nBerikut rincian pengajuan RAB proyek kami:\n\n` +
    `Nama PIC       : ${nama}\n` +
    `Perusahaan     : ${perusahaan}\n` +
    `No. WhatsApp   : ${whatsapp}\n` +
    `Jenis Layanan  : ${layanan}\n` +
    `Detail Proyek  : ${detail}\n\n` +
    `Mohon dapat diproses estimasi penawaran harganya. Terima kasih.`;

  // Buka aplikasi Email / Gmail otomatis
  const mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isiEmail)}`;
  window.location.href = mailtoUrl;

  alert(
    "Data berhasil terekam di sistem dan aplikasi Email Anda akan segera dibuka!",
  );
  document.getElementById("formRab").reset();
}

// Tampilkan Riwayat Terekam
function tampilkanRiwayat() {
  const containerRiwayat = document.getElementById("listRiwayat");
  if (!containerRiwayat) return;

  let riwayat = JSON.parse(localStorage.getItem("riwayat_rab")) || [];
  if (riwayat.length === 0) {
    containerRiwayat.innerHTML =
      '<p style="color:#64748b; font-size:0.88rem;">Belum ada pengajuan RAB yang terekam di perangkat ini.</p>';
    return;
  }

  let html = "";
  riwayat.forEach((item, index) => {
    html += `
      <div style="padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 0.88rem;">
        <strong>#${index + 1} - ${item.nama} (${item.perusahaan})</strong><br>
        <span style="color: var(--text-muted);">Layanan: ${item.layanan} | Waktu: ${item.tanggal}</span>
      </div>
    `;
  });
  containerRiwayat.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  tampilkanRiwayat();
});
