import React from 'react'
import logoImage from '../assets/images/lambang_kota_palu.png'

export const BaseSurat = (props) => {
  return (
    <div id={props.id || 'printArea'}>
      <div id="letterPreview" className="preview-print text-black">
        <div className="print-preview text-center text-tnr" style={{ width: '100%', height: 'fit-content' }}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export const Paragraf = (props) => {
  return (
    <p className={`text-justify mt-2 ${props.className}`}>{props.children}</p>
  )
}

export const KopSurat = (props) => {
  return (
    <>
      <div className="flex flex-row gap-4 justify-center items-center">
        <div style={{ width: '80px' }}>
          <img src={logoImage} alt="" style={{ width: '100%' }} />
        </div>
        <div>
          <h1 className="text-xl leading-none font-medium">PEMERINTAH KOTA PALU</h1>
          <p className="text-3xl leading-none" style={{ fontWeight: '900' }}>KECAMATAN PALU BARAT</p>
          <p className="text-3xl leading-none" style={{ fontWeight: '900' }}>KELURAHAN BALAROA</p>
          <p className="font-bold text-xl leading-none">JL. Yambaere No. 05</p>
        </div>
      </div>

      <hr className="mt-2" style={{ border: '1px solid black' }} />
      <hr className="mb-2" style={{ border: '2px solid black', marginTop: '1px' }} />

      <div className="mb-4">
        <u><b className='uppercase text-xl'>{props.surat}</b></u>
        <p className="leading-none">NOMOR: {props.no}</p>
      </div>
    </>
  )
}

export const HeadPegawai = (props) => {
  return (
    <div className="my-table mb-2">
      <div className="text-left my-2">Yang bertanda tangan dibawah ini:</div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Nama</div> : <div className='pl-1 uppercase font-bold'>{props.nama}</div>
        {/* <div>: <span id="namaPegawai"></span></div> */}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Jabatan</div> : {props.jabatan}
        {/* <div>: <span id="jabatanPegawai"></span> </div> */}
      </div>
    </div>
  )
}

export const BiodataWarga = (props) => {
  return (
    <div className="my-table mb-2">
      <div className="text-left">Dengan ini menerangkan bahwa:</div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Nama</div> : {props.nama}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">NIK</div> : {props.nik}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Jenis kelamin</div> : {props.jk === 'l' ? 'laki-laki' : 'perempuan'}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Tempat/Tgl. lahir</div>: {props.ttl}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Pekerjaan</div> : {props.kerja}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Kewarganegaraan</div> : {props.negara}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Status</div> : {props.status}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Agama</div> : {props.agama}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Alamat</div> : {props.alamat}
      </div>
      
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">RT/RW</div> : {props.rtrw}
      </div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Maksud</div> : {props.maksud}
      </div>
    </div>
  )
}

export const FooterTtd = (props) => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthNames = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthName = monthNames[month];

  return (
    <div className="flex justify-end">
      <div className="ttd">
        <div className="mb-20">
          {/* <div className="my-4">Palu, {date} {monthName} {year} </div> */}
          {/* <div className="my-4">Palu, {props.date} {props.month} {props.year} </div> */}
          <div className="my-4">Palu, {props.date}</div>
          <div>An. LURAH BALAROA</div>
          <div>{props.jabatan}</div>
          {/* <div id="jabatanPegawaiTtd">Kasi Pemberdayaan Masyarakat</div> */}
          {/* <!-- <div>Dan Kesejahteraan Sosial</div> --> */}
        </div>

        <div className="text-md"><u className="uppercase font-bold">{props.nama}</u></div>
        <div>NIP: {props.nip}</div>
      </div>
    </div>
  )
}
