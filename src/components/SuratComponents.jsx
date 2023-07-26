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
    <p id={props.id} className={`text-justify mt-2 ${props.className}`}>{props.children}</p>
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

const FormTitle = (props) => {
  return (
    <div className={`flex flex-row ${props.className}`} id={props.id}>
      <div className="w-60 ml-10 text-left">{props.title}</div> : {props.data}
    </div>
  )
}

export const BiodataWarga = (props) => {
  return (
    <div className="my-table mb-2">
      <div className="text-left">Dengan ini menerangkan bahwa:</div>
      <FormTitle title='Nama' data={props.nama} />
      <FormTitle title='NIK' data={props.nik} />
      <FormTitle title='Jenis Kelamis' data={props.jk === 'l' ? 'laki-laki' : 'perempuan'} />
      <FormTitle title='Tempat/Tanggal Lahir' data={props.ttl} />
      <FormTitle title='Pekerjaan' data={props.kerja} />
      <FormTitle title='Kewarganegaraan' data={props.negara} />
      <FormTitle title='Status' data={props.status} />
      <FormTitle title='Agama' data={props.agama} />
      <FormTitle title='Alamat' data={props.alamat} />
      <FormTitle title='RT/RW' data={props.rtrw} />
      <FormTitle title='maksud' data={props.maksud} id='maksudWarga' className='italic' />
    </div>
  )
}

export const DataUsaha = (props) => {
  return (
    <div className="my-table mb-2">
      <div className="text-left">Benar yang bersangkutan diatas mempunyai Usaha yaitu:</div>
      <div className="flex flex-row">
        <div className="w-60 ml-10 text-left">Nama Usaha</div> : -
      </div>
      <FormTitle title='Jenis Usaha' data='Jualan Kue' />
      <FormTitle title='NPWP' data='' />
      <FormTitle title='Nomor Izin Usaha' data='' />
      <FormTitle title='Nomor Fiskal' data='' />
      <FormTitle title='Luas Tempat Usaha' data='' />
      <FormTitle title='Alamat Usaha' data='' />
      <FormTitle title='Tahun Berdiri Usaha' data='' />
      <FormTitle title='Maksud' data='' />

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
