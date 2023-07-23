import React, {useState, useEffect} from 'react'
import Layout from '../../layouts/Layout'
import { BasicButton } from '../../components/BaseButton'
import { GetSuratByType, CreateSuratByType, GetWargaByNik } from '../../api/suratApi'   //api
import { GetPegawai } from '../../api/pegawaiApi'     // api
import { BaseModal, openModal, closeModal, ModalLoading } from '../../components/BaseModal'
import { BaseInput, SelectInput } from '../../components/BaseInput'
import { AlertError, AlertSuccess } from '../../components/SweetAlert'
import { getId } from '../../function/baseFunction'


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
  const [noSurat, setNoSurat] = useState(`400/...../BLR/${monthRomawi}/${year}`)
  const [noSuratNumber, setNoSuratNumber] = useState('')
  const [maksud, setMaksud] = useState('')

 
  const test = () => {
    console.log(monthName);
    console.log(monthRomawi);
    console.log(year);
    console.log(date);
  }

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
      case 'no surat number': setNoSuratNumber(value); setNoSurat(`400/${value}/BLR/${monthRomawi}/${year}`); break;
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


  const checkNikWarga = async () => {
    try {
      const response = await GetWargaByNik(nik)
      response.total_data >= 1 ? getId('nikIcon').classList.remove('hidden') : getId('nikIcon').classList.add('hidden')
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getAllData()
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
                        <button onClick={() => editSurat(surat)} id="editButton" className="button small green">
                          <span className="icon"><i className="mdi mdi-pen"></i></span>
                        </button>
                        <button onClick={() => deleteSurat(surat.id)} className="button small red">
                          <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                        </button>
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
          <SelectInput value={idPegawai} name='pegawai' onChange={handleInput} onClick={getAllPegawai}>
            {pegawaiList.map((pegawai) => (
              <option key={pegawai.id} value={pegawai.id}>{pegawai.nama}</option>
            ))}
          </SelectInput>
        </div>
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          {/* <BasicButton onClick={test} title='test' className='bg-gray-500 text-white' /> */}
          <BasicButton onClick={createSurat} id='btnCreate' title='Create'/>
          {/* <BasicButton onClick={updatePegawai} id='btnUpdate' title='Update'/> */}
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}

export default SKBaik