import React, {useState, useEffect} from 'react'
import { BasicButton } from '../components/BaseButton'
import { GetPegawai, CreatePegawai, DeletePegawai, UpdatePegawai } from '../api/pegawaiApi'   // api
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import Layout from '../layouts/Layout'
import { BaseInput } from '../components/BaseInput'
import { AlertError, AlertSuccess, AlertConfirm } from '../components/SweetAlert'
import { getId } from '../function/baseFunction'

export const Pegawai = () => {

  const [pegawaiList, setPegawaiList] = useState([])
  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [nip, setNip] = useState('')
  const [idPegawai, setIdPegawai] = useState('')

  const createNew = () => {
    openModal('upsert')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
  }

  const getAllData = async () => {
    try {
      const response = await GetPegawai()
      setPegawaiList(response.data)
    } catch (error) {
      console.log(error);      
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'nama': setNama(value); break;
      case 'jabatan': setJabatan(value); break;
      case 'nip': setNip(value); break;
      default: break;
    }
  };

  const resetData = () => {
    setNama(''); setJabatan(''); setNip('')
  }

  const createPegawai = async () => {
    try {
      if (nama === '' || jabatan === '' || nip === '') {
        AlertError('input tidak boleh kosong')
      } else {
        closeModal('upsert')
        openModal('modal-loading')
        const response = await CreatePegawai({
          nama: nama,
          jabatan: jabatan,
          nip: nip
        })
  
        closeModal('modal-loading')
        getAllData()
        AlertSuccess('Pegawai berhasil dibuat')
        resetData()
      }
    } catch (error) {
      AlertError()
    }
  }

  const deletePegawai = (id) => {
    AlertConfirm({
      title: 'delete?',
      preConfirm: () => confirmDeletePegawai(id)
    })
  }

  const confirmDeletePegawai = async (id) => {
    openModal('modal-loading')
    try {
      const res = await DeletePegawai(id)
      AlertSuccess('Delete Successfully')
      getAllData()
    } catch (error) {
      AlertError()
    }
    closeModal('modal-loading')
  }

  const editPegawai = (pegawai) => {
    getId('btnCreate').classList.add('hidden')
    getId('btnUpdate').classList.remove('hidden')
    openModal('upsert')
    setNama(pegawai.nama)
    setJabatan(pegawai.jabatan)
    setNip(pegawai.nip)
    setIdPegawai(pegawai.id)
  }

  const updatePegawai = async () => {
    try {
      if (nama === '' || jabatan === '' || nip === '') {
        AlertError('input tidak boleh kosong')
      } else {
        closeModal('upsert')
        openModal('modal-loading')

        const res = await UpdatePegawai({
          id: idPegawai,
          nama: nama,
          jabatan: jabatan,
          nip: nip
        })
        
        closeModal('modal-loading')
        AlertSuccess()
        getAllData()
      }
    } catch (error) {
      AlertError()
    }
  }


  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <Layout
        title='Pegawai'
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create Pegawai'/>}
      >
        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>NIP</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {pegawaiList.map((pegawai, index) => (
                  <tr key={pegawai.id}>
                   <td className="image-cell">{index+1}</td>
                    <td data-label="Nama">{pegawai.nama}</td>
                    <td data-label="Jabatan">{pegawai.jabatan}</td>
                    <td data-label="NIP">{pegawai.nip}</td>
                    <td data-label="Created"><small>{pegawai.createdAt}</small></td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => editPegawai(pegawai)} id="editButton" className="button small green">
                          <span className="icon"><i className="mdi mdi-pen"></i></span>
                        </button>
                        <button onClick={() => deletePegawai(pegawai.id)} className="button small red">
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
      <BaseModal id='upsert' title={`create pegawai`}>
        <BaseInput value={nama} onChange={handleInput} name='nama' className='mb-5' />
        <BaseInput value={jabatan} onChange={handleInput} name='jabatan' className='mb-5' />
        <BaseInput value={nip} onChange={handleInput} name='nip' className='mb-5' />
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
          <BasicButton onClick={createPegawai} id='btnCreate' title='Create'/>
          <BasicButton onClick={updatePegawai} id='btnUpdate' title='Update'/>
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}
