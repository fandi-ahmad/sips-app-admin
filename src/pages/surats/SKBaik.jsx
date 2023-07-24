import React, {useState, useEffect} from 'react'
import Layout from '../../layouts/Layout'
import { BasicButton } from '../../components/BaseButton'
import { GetSuratByType, CreateSuratByType, GetWargaByNik, UpdateSuratByType } from '../../api/suratApi'   //api
import { GetPegawai } from '../../api/pegawaiApi'     // api
import { BaseModal, openModal, closeModal, ModalLoading } from '../../components/BaseModal'
import { BaseInput, SelectInput } from '../../components/BaseInput'
import { AlertError, AlertSuccess } from '../../components/SweetAlert'
import { getId } from '../../function/baseFunction'
import logoImage from '../../assets/images/lambang_kota_palu.png'


const SKBaik = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const monthNames = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthRomawis = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" ];
  const monthName = monthNames[month];
  const monthRomawi = monthRomawis[month]
  const suratKey = 200

  let suratName = 'surat keterangan berkelakuan baik'
  const [suratList, setSuratList] = useState([])
  const [pegawaiList, setPegawaiList] = useState([])

  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jk, setJk] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tglLahir, setTglLahir] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [negara, setNegara] = useState('indonesia')
  const [status, setStatus] = useState('')
  const [agama, setAgama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [rtrw, setRtrw] = useState('')
  
  const [idSurat, setIdSurat] = useState('')
  const [idPegawai, setIdPegawai] = useState('')
  const [noSurat, setNoSurat] = useState(`${suratKey}/...../BLR/${monthRomawi}/${year}`)
  const [noSuratNumber, setNoSuratNumber] = useState('')
  const [maksud, setMaksud] = useState('')

  const [namaPegawai, setNamaPegawai] = useState('')
  const [nipPegawai, setNipPegawai] = useState('')
  const [jabatanPegawai, setJabatanPegawai] = useState('')

 
  const getAllData = async () => {
    try {
      const response = await GetSuratByType(suratName)
      setSuratList(response.data)
    } catch (error) {
      console.log(error, '<-- error get data');
    }
  }

  const getAllPegawai = async () => {
    try {
      const response = await GetPegawai()
      setPegawaiList(response.data)
    } catch (error) {
      AlertError()
    }
  }

  const createNew = () => {
    openModal('upsert')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nama': setNama(value); break;
      case 'NIK': setNik(value); break;
      case 'jk': setJk(value); break;
      case 'tempat lahir': setTempatLahir(value); break;
      case 'tanggal lahir': setTglLahir(value); break;
      case 'pekerjaan': setPekerjaan(value); break;
      case 'kewarganegaraan': setNegara(value); break;
      case 'status': setStatus(value); break;
      case 'agama': setAgama(value); break;
      case 'alamat': setAlamat(value); break;
      case 'RT/RW': setRtrw(value); break;
      case 'no surat number': setNoSuratNumber(value); setNoSurat(`${suratKey}/${value}/BLR/${monthRomawi}/${year}`); break;
      case 'maksud': setMaksud(value); break;
      case 'pegawai': setIdPegawai(parseInt(value)); break;
      default: break;
    }
  };

  const createSurat = async () => {
    try {
      closeModal('upsert')
      openModal('modal-loading')

      const response = await CreateSuratByType({
        nama_surat: 'surat keterangan berkelakuan baik',
        nama: nama,
        nik: nik,
        jenis_kelamin: jk,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tglLahir,
        pekerjaan: pekerjaan,
        kewarganegaraan: negara,
        status: status,
        agama: agama,
        alamat: alamat,
        rt_rw: rtrw,
        no_surat: noSurat,
        no_surat_number: noSuratNumber,
        maksud: maksud,
        id_pegawai: idPegawai
      })

      closeModal('modal-loading')
      AlertSuccess('surat berhasil dibuat')
      getAllData()
    } catch (error) {
      AlertError()
      console.log(error, '<-- error create surat');
    }
  }

  const setDataSurat = (surat) => {
    const warga = surat.warga
    setNamaPegawai(surat.pegawai.nama)
    setJabatanPegawai(surat.pegawai.jabatan)
    setNipPegawai(surat.pegawai.nip)
    setNik(warga.nik)
    setNama(warga.nama)
    setTempatLahir(warga.tempat_lahir)
    setTglLahir(warga.tanggal_lahir)
    setJk(warga.jenis_kelamin)
    setPekerjaan(warga.pekerjaan)
    setNegara(warga.kewarganegaraan)
    setStatus(warga.status)
    setAgama(warga.agama)
    setAlamat(warga.alamat)
    setRtrw(warga.rt_rw)
    setIdSurat(surat.id)
    setNoSuratNumber(surat.no_surat_number)
    setNoSurat(surat.no_surat)
    setMaksud(surat.maksud)
    setIdPegawai(surat.pegawai.id_pegawai)
  }

  const editSurat = (surat) => {
    getId('btnCreate').classList.add('hidden')
    getId('btnUpdate').classList.remove('hidden')
    openModal('upsert')
    setDataSurat(surat)
  }

  const updateSurat = async () => {
    try {
      closeModal('upsert')
      openModal('modal-loading')

      const res = await UpdateSuratByType({
        // nama_surat: 'surat keterangan berkelakuan baik',
        id: idSurat,
        nama: nama,
        nik: nik,
        jenis_kelamin: jk,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tglLahir,
        pekerjaan: pekerjaan,
        kewarganegaraan: negara,
        status: status,
        agama: agama,
        alamat: alamat,
        rt_rw: rtrw,
        no_surat: noSurat,
        no_surat_number: noSuratNumber,
        maksud: maksud,
        id_pegawai: idPegawai
      })

      closeModal('modal-loading')
      AlertSuccess('surat berhasil diperbarui')
      getAllData()
    } catch (error) {
      AlertError()
      console.log(error, '<-- error update');
    }
  }

  const checkNikWarga = async () => {
    try {
      const response = await GetWargaByNik(nik)
      response.total_data >= 1 ? getId('nikIcon').classList.remove('hidden') : getId('nikIcon').classList.add('hidden')
    } catch (error) {
      console.log(error);
    }
  }

  const printSuratBySelected = (surat) => {
    openModal('suratPreview')
    setDataSurat(surat)
  }


  const printSurat = () => {
    const printPage = getId('printArea').innerHTML;
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
  


  useEffect(() => {
    getAllData()
    getAllPegawai()
  }, [])

  return (
    <>
      <Layout
        title='Surat keterangan berkelakuan baik'
        button={<BasicButton onClick={createNew} iconShow='block' title='Create New'/>}
      >
        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>No Surat</th>
                  <th>Nama Warga</th>
                  <th>TTL</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {suratList.map((surat, index) => (
                  <tr key={surat.id}>
                   <td className="image-cell">{index+1}</td>
                    <td data-label="No Surat"><small>{surat.no_surat}</small></td>
                    <td data-label="Nama Warga">{surat.warga.nama}</td>
                    <td data-label="TTL">{surat.warga.tempat_lahir}, {surat.warga.tanggal_lahir}</td>
                    <td data-label="Created"><small>{surat.createdAt}</small></td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => printSuratBySelected(surat)} className="button small blue">
                          <span className="icon"><i className="mdi mdi-eye"></i></span>
                        </button>
                        <button onClick={() => editSurat(surat)} id="editButton" className="button small green">
                          <span className="icon"><i className="mdi mdi-pen"></i></span>
                        </button>
                        {/* <button onClick={() => deleteSurat(surat.id)} className="button small red">
                          <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>

      {/* ===== upsert modal ===== */}
      <BaseModal id='upsert' title={`create surat`} classSize='w-screen'>
        <div className='grid grid-cols-4 gap-4'>
          <BaseInput value={nik} onChange={handleInput} onKeyUp={checkNikWarga} name='NIK' label={<>NIK <span className="mdi mdi-circle text-red-500 hidden" id='nikIcon'></span></>} />
          <BaseInput value={nama} onChange={handleInput} name='nama' />
          <BaseInput value={tempatLahir} onChange={handleInput} name='tempat lahir' />
          <BaseInput value={tglLahir} onChange={handleInput} name='tanggal lahir' type='date' />
          <SelectInput value={jk} name='jk' label='jenis kelamin' onChange={handleInput} >
            <option value='l'>laki-laki</option>
            <option value="p">perempuan</option>
          </SelectInput>
          <BaseInput value={pekerjaan} onChange={handleInput} name='pekerjaan' />
          <BaseInput value={negara} onChange={handleInput} name='kewarganegaraan' />
          <BaseInput value={status} onChange={handleInput} name='status' />
          <BaseInput value={agama} onChange={handleInput} name='agama' />
          <BaseInput value={alamat} onChange={handleInput} name='alamat' />
          <BaseInput value={rtrw} onChange={handleInput} name='RT/RW' />
          <BaseInput value={maksud} onChange={handleInput} name='maksud' />
          <BaseInput value={noSuratNumber} onChange={handleInput} name='no surat number' />
          <BaseInput value={noSurat} onChange={handleInput} name='no surat' disabled='on' />
          <SelectInput value={idPegawai} name='pegawai' onChange={handleInput}>
            {pegawaiList.map((pegawai) => (
              <option key={pegawai.id} value={pegawai.id}>{pegawai.nama}</option>
            ))}
          </SelectInput>
        </div>
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={createSurat} id='btnCreate' title='Create'/>
          <BasicButton onClick={updateSurat} id='btnUpdate' title='Update'/>
        </div>
      </BaseModal>

      <BaseModal id='suratPreview' classSize='w-screen min-h-screen'>
        <div id="printArea">
          <div id="letterPreview" className="preview-print">
            <div className="print-preview text-center text-tnr" style={{ width: '100%', height: 'fit-content',}}>
              <div className="flex flex-row gap-4 justify-center items-center">
                <div style={{ width: '80px' }}>
                  <img src={logoImage} alt="" style={{ width: '100%' }} />
                </div>
                <div>
                  <h1 className="text-xl leading-none font-medium">PEMERINTAH KOTA PALU</h1>
                  <p className="text-2xl leading-none" style={{ fontWeight: '900' }}>KECAMATAN PALU BARAT</p>
                  <p className="text-2xl leading-none" style={{ fontWeight: '900' }}>KELURAHAN BALAROA</p>
                  <p className="font-bold leading-none">JL. Yambaere No. 05</p>
                </div>
              </div>

              <hr className="my-2" style={{ border: '1px solid black' }} />

              <div className="mb-2">
                <u><b>SURAT KETERANGAN BERKELAKUAN BAIK</b></u>
                <p className="leading-none">NOMOR: {noSurat}</p>
              </div>

              <div className="my-table mb-2">
                <div className="text-left">Yang bertanda tangan dibawah ini:</div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Nama</div> : {namaPegawai}
                  {/* <div>: <span id="namaPegawai"></span></div> */}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Jabatan</div> : {jabatanPegawai}
                  {/* <div>: <span id="jabatanPegawai"></span> </div> */}
                </div>
              </div>

              <div className="my-table mb-2">
                <div className="text-left">Dengan ini menerangkan bahwa:</div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Nama</div> : {nama}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Jenis kelamin</div> : {jk === 'l' ? 'laki-laki' : 'perempuan'}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Tempat/Tgl. lahir</div>: {tempatLahir}, {tglLahir}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Pekerjaan</div> : {pekerjaan}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Kewarganegaraan</div> : {negara}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Status</div> : {status}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Agama</div> : {agama}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Alamat</div> : {alamat}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">NIK</div> : {nik}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">RT/RW</div> : {rtrw}
                </div>
                <div className="flex flex-row">
                  <div className="w-60 ml-10 text-left">Maksud</div> : {maksud}
                </div>
              </div>

              <p className="text-justify">
                Sepanjang pengamatan kami serta pengetahuan kami, hingga saat ini dikeluarkan surat 
                keterangan ini, Oknum tersebut belum pernah tersangkut dalam perkara pidana kriminal, 
                serta berkelakuan baik terhadap masyarakat sesuai dengan Surat Pengantar RT/RW 
                Nomor: {noSurat}, tanggal {date} {monthName} {year}.
              </p>
            
              <p className="text-justify indent-10">
                Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.
              </p>

              <div className="flex justify-end">
                <div className="ttd">
                  <div className="mb-20">
                    <div className="my-4">Palu, {date} {monthName} {year} </div>
                    <div>An. LURAH BALAROA</div>
                    <div>{jabatanPegawai}</div>
                    {/* <div id="jabatanPegawaiTtd">Kasi Pemberdayaan Masyarakat</div> */}
                    {/* <!-- <div>Dan Kesejahteraan Sosial</div> --> */}
                  </div>

                  <div className="text-md"><u className="uppercase">{namaPegawai}</u></div>
                  <div>NIP: {nipPegawai}</div>
                </div>
              </div>
            
            </div>

          </div>
        </div>
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('suratPreview')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={printSurat} title='Print' />
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}

export default SKBaik