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

export const formatDateFromISO = (dateString) => {
  const tanggalISO = dateString
  const tanggalObjek = new Date(tanggalISO);
  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const tanggal = tanggalObjek.getUTCDate();
  const bulan = namaBulan[tanggalObjek.getUTCMonth()];
  const tahun = tanggalObjek.getUTCFullYear();
  const hasil = `${tanggal} ${bulan} ${tahun}`;
  return hasil
}

export const formatedNoSurat = (inputString) => {
  const regex = /^\d{3}/; // Memilih tiga digit angka di bagian depan string
  return inputString.replace(regex, '- '); // Mengganti tiga digit angka dengan tanda "-"
}

export const formatedNoSuratDesc = (value1, value2) => {
  // Mengganti karakter '/' menjadi '-' pada value2
  const formattedValue2 = value2.replace(/\//g, '.');

  // Mengambil bagian value1 setelah karakter kedua '/'
  const remainingValue1 = value1.substring(value1.indexOf('/', value1.indexOf('/') + 1));

  // Menggabungkan hasil akhir dengan format yang diinginkan
  const result = `- ${formattedValue2}${remainingValue1}`;

  return result;
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

export const formatToDot = (input) => {
  // "/" => "."
  const parts = input.split("/");
  const part1 = parseInt(parts[0]);
  const part2 = parseInt(parts[1]);

  // Menggunakan format angka dengan 3 digit, misalnya: 001, 004
  const formattedPart1 = part1.toString().padStart(3, '0');
  const formattedPart2 = part2.toString().padStart(3, '0');

  const result = `${formattedPart1}.${formattedPart2}`;
  return result;
}