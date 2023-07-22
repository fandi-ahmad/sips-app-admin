import React, {useState, useEffect} from 'react'
import Layout from '../../layouts/Layout'
import { BasicButton } from '../../components/BaseButton'
import { GetSuratByType } from '../../api/suratApi'   //api
import { BaseModal, openModal, closeModal, ModalLoading } from '../../components/BaseModal'
import { BaseInput, SelectInput } from '../../components/BaseInput'

const SKBaik = () => {

  let suratName = 'surat keterangan berkelakuan baik'
  const [suratList, setSuratList] = useState([])

  const [nama, setNama] = useState('')
  const [nik, setNik] = useState('')
  const [jk, setJk] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tglLahir, setTglLahir] = useState('')
  const [pekerjaan, setPekerjaan] = useState('')
  const [negara, setNegara] = useState('')
  const [status, setStatus] = useState('')
  const [agama, setAgama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [rtrw, setRtrw] = useState('')

  const [noSurat, setNoSurat] = useState('')
  const [maksud, setMaksud] = useState('')


  // "nama_surat": "surat keterangan tidak mampu",
  // "nama": "doni",
  // "nik": "09896095 9090",
  // "jenis_kelamin": "l",
  // "tempat_lahir": "kola-kola",
  // "tanggal_lahir": "2003-07-06T12:00:00Z",
  // "pekerjaan": "wiraswasta",
  // "kewarganegaraan": "indonesia",
  // "status": "belum kawin",
  // "agama": "islam",
  // "alamat": "jl asam",
  // "rt_rw": "001/002",
  
  // "no_surat": "11/50/bcn/2023",
  // "no_surat_number": 11,
  // "maksud": "bantuan",
  // "isi_surat": "-",
  
  // "id_pegawai": 2

  const getAllData = async () => {
    try {
      const response = await GetSuratByType(suratName)
      setSuratList(response.data)
    } catch (error) {
      console.log(error, '<-- error get data');
    }
  }

  const createNew = () => {
    openModal('upsert')
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nama': setNama(value); break;
      case 'nik': setNik(value); break;
      case 'jk': setJk(value); break;
      case 'tempat lahir': setTempatLahir(value); break;
      case 'tanggal lahir': setTglLahir(value); break;
      case 'pekerjaan': setPekerjaan(value); break;
      case 'negara': setNegara(value); break;
      case 'status': setStatus(value); break;
      case 'agama': setAgama(value); break;
      case 'alamat': setAlamat(value); break;
      case 'rtrw': setRtrw(value); break;
      default: break;
    }
  };


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
                    <td data-label="No Surat">{surat.no_surat}</td>
                    <td data-label="Nama Warga">{surat.warga.nama}</td>
                    <td data-label="TTL">{surat.warga.tempat_lahir}, {surat.warga.tanggal_lahir}</td>
                    <td data-label="Created"><small>{surat.createdAt}</small></td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => editPegawai(surat)} id="editButton" className="button small green">
                          <span className="icon"><i className="mdi mdi-pen"></i></span>
                        </button>
                        <button onClick={() => deletePegawai(surat.id)} className="button small red">
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
          <BaseInput value={nama} onChange={handleInput} name='nama' className='mb-5' />
          <SelectInput value={jk} name='jk' label='jenis kelamin' onChange={handleInput} >
            <option value='l'>laki-laki</option>
            <option value="p">perempuan</option>
          </SelectInput>
          <BaseInput value={nik} onChange={handleInput} name='nik' className='mb-5' />
          <BaseInput value={tempatLahir} onChange={handleInput} name='tempat lahir' className='mb-5' />
          <BaseInput value={tglLahir} onChange={handleInput} name='tanggal lahir' type='date' className='mb-5' />
          <BaseInput value={pekerjaan} onChange={handleInput} name='pekerjaan' className='mb-5' />
          <BaseInput value={negara} onChange={handleInput} name='negara' className='mb-5' />
          <BaseInput value={status} onChange={handleInput} name='status' className='mb-5' />
          <BaseInput value={agama} onChange={handleInput} name='agama' className='mb-5' />
          <BaseInput value={alamat} onChange={handleInput} name='alamat' className='mb-5' />
          <BaseInput value={rtrw} onChange={handleInput} name='RT/RW' className='mb-5' />
        </div>
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={() => console.log(jk, '<-- value jenis kelamin')} title='test' className='bg-gray-500 text-white' />
          {/* <BasicButton onClick={createPegawai} id='btnCreate' title='Create'/> */}
          {/* <BasicButton onClick={updatePegawai} id='btnUpdate' title='Update'/> */}
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}

export default SKBaik