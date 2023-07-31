import React, {useState, useEffect} from 'react'
import { BasicButton } from '../components/BaseButton'
import { GetPegawai, CreatePegawai, DeletePegawai, UpdatePegawai } from '../api/pegawaiApi'   // api
import { GetSuratByType } from '../api/suratApi'  //api
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import Layout from '../layouts/Layout'
import { BaseInput, InputCheck } from '../components/BaseInput'
import { AlertError, AlertSuccess, AlertConfirm } from '../components/SweetAlert'
import { getId, formatDateFromISO } from '../function/baseFunction'
import { TableHeader, TablePaginate } from '../components/BaseTable'

export const Pegawai = () => {

  const [pegawaiList, setPegawaiList] = useState([])
  const [nama, setNama] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [nip, setNip] = useState('')
  const [idPegawai, setIdPegawai] = useState('')
  const [isActive, setIsActive] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const createNew = () => {
    openModal('upsert')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
  }

  const getAllData = async () => {
    try {
      const response = await GetPegawai(page, limit)
      setPegawaiList(response.data)
      setTotalPage(response.total_page)
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
          nip: nip,
          isActive: isActive
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
      const suratByIdPegawai = await GetSuratByType('', '', '', '', id)
      if (suratByIdPegawai.status === 'failed') {
        const res = await DeletePegawai(id)
        AlertSuccess('Delete Successfully')
        getAllData()
      } else {
        AlertError('pegawai sudah pernah menandatangani surat, menghapusnya akan menyebabkan kehilangan beberapa data surat')
      }
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
    setIsActive(pegawai.isActive)
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
          nip: nip,
          isActive: isActive
        })
        
        closeModal('modal-loading')
        AlertSuccess()
        getAllData()
      }
    } catch (error) {
      AlertError()
    }
  }

  const active = (active) => {
    const classRound = 'rounded-full w-5 h-5 '
    if (active == true) {
      return (
        <div className={classRound + 'bg-green-500'}></div>
      )
    } else {
      return (
        <div className={classRound + 'bg-gray-500'}></div>
      )
    }
  }

  const handleInputToggle = () => {
    isActive == true ? setIsActive(false) : setIsActive(true)
  }

  const activeBtn = 'button py-1 text-white bg-gray-500 border-gray-500 border-1 hover:bg-gray-600 flex items-center'
  const disableBtn = 'button py-1 text-white flex items-center border-0 bg-gray-400'
  const [prevClass, setPrevClass] = useState(activeBtn)
  const [nextClass, setNextClass] = useState(activeBtn)
  const [disabledPrev, setDisabledPrev] = useState(false)
  const [disabledNext, setDisabledNext] = useState(false)
  const [btnPaginateClass, setBtnPaginateClass] = useState('')

  const checkPaginateBtn = () => {
    page == 1 ? setPrevClass(disableBtn) : setPrevClass(activeBtn)
    page == 1 ? setDisabledPrev(true) : setDisabledPrev(false)
    totalPage == page ? setNextClass(disableBtn) : setNextClass(activeBtn)
    totalPage == page ? setDisabledNext(true) : setDisabledNext(false)
    totalPage == 1 ? setBtnPaginateClass('hidden') : setBtnPaginateClass('')
  }

  useEffect(() => {
    getAllData()
    checkPaginateBtn()
  }, [page, totalPage])

  return (
    <>
      <Layout
        title='Pegawai'
        button={<BasicButton onClick={createNew} iconShow='block' title='Create Pegawai'/>}
      >
        <div className="card has-table">
          <div className="card-content">
            <TableHeader title='daftar pegawai'></TableHeader>
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>NIP</th>
                  <th>Active</th>
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
                    <td data-label="Active">{active(pegawai.isActive)}</td>
                    <td data-label="Created">{formatDateFromISO(pegawai.createdAt)}</td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => editPegawai(pegawai)} id="editButton" className="button small blue">
                          <span className="icon"><i className="fa-solid fa-pen-to-square"></i></span>
                        </button>
                        <button onClick={() => deletePegawai(pegawai.id)} className="button small red">
                          <span className="icon"><i className="fa-solid fa-trash"></i></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePaginate>
              <small>Page {page} of {totalPage}</small>
              <div className={`buttons ${btnPaginateClass}`}>
                <button type="button" className={prevClass} onClick={() => setPage(page - 1)} disabled={disabledPrev}>
                  <i className="fa-solid fa-angle-left pr-1"></i>
                  <span className='pb-1'>previous</span>
                </button>
                <button type="button" className={nextClass} onClick={() => setPage(page + 1)} disabled={disabledNext}>
                  <span className='pb-1'>next</span>
                  <i className="fa-solid fa-angle-right pl-1"></i>
                </button>
              </div>
            </TablePaginate>
          </div>
        </div>
      </Layout>


      {/* ===== upsert modal ===== */}
      <BaseModal id='upsert' title={`create pegawai`}>
        <BaseInput value={nama} onChange={handleInput} name='nama' className='mb-5' />
        <BaseInput value={jabatan} onChange={handleInput} name='jabatan' className='mb-5' />
        <BaseInput value={nip} onChange={handleInput} name='nip' className='mb-5' />
        <InputCheck checked={isActive} onChange={handleInputToggle} name='active' />
        <div className="modal-action pt-4">
          <BasicButton onClick={() => closeModal('upsert')} title='Close' className={activeBtn} />
          <BasicButton onClick={createPegawai} id='btnCreate' title='Create'/>
          <BasicButton onClick={updatePegawai} id='btnUpdate' title='Update'/>
        </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />

    </>
  )
}
