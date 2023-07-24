import React from 'react'

export const getId = (id) => document.getElementById(id)

const convertToIndonesianMonth = (month) => {
  const months = [
    'januari', 'februari', 'maret', 'april', 'mei', 'juni',
    'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
  ];
  return months[month - 1] || '';
}

export const formatDateMounth = (dateString) => {
  const dateParts = dateString.split('-');
  if (dateParts.length !== 3) {
    return 'Format tanggal tidak valid.';
  }

  const year = dateParts[0];
  const month = parseInt(dateParts[1]);
  const day = dateParts[2];

  // Mengonversi angka bulan menjadi teks bulan
  const monthInIndonesian = convertToIndonesianMonth(month);

  // Menggabungkan kembali dalam format yang diinginkan
  const formattedDate = `${day} ${monthInIndonesian} ${year}`;

  return formattedDate;
}

export const formatedNoSurat = (inputString) => {
  const regex = /^\d{3}/; // Memilih tiga digit angka di bagian depan string
  return inputString.replace(regex, '- '); // Mengganti tiga digit angka dengan tanda "-"
}

export const printSurat = (elementId) => {
  const printPage = getId(elementId).innerHTML;
  const printContent = document.createElement('div');
  printContent.innerHTML = printPage;

  // Sembunyikan elemen-elemen yang tidak perlu dicetak
  // Anda bisa menyesuaikan elemen-elemen ini sesuai dengan halaman Anda
  const elementsToHide = document.querySelectorAll('.header, .sidebar');
  elementsToHide.forEach(element => {
    element.style.display = 'none';
  });

  // Tampilkan elemen-elemen yang ingin dicetak
  document.body.appendChild(printContent);

  // Cetak halaman
  window.print();

  // Hapus elemen printContent setelah mencetak selesai
  document.body.removeChild(printContent);

  // Kembalikan tampilan elemen yang disembunyikan
  elementsToHide.forEach(element => {
    element.style.display = '';
  });
};