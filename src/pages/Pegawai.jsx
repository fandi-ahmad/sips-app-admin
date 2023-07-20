import React, { useState, useEffect } from 'react'
import Layout from '../layouts/layout'
import TitleBar from '../components/TitleBar'

import { GetPegawai } from '../api/pegawaiApi'
import TableHead from '../components/TableHead'
// import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import { BaseModal, openModal, closeModal } from '../components/BaseModal'
import { BasicButton } from '../components/BaseButton'
import Navbar from '../components/Navbar'
import Sidebar from '../components/sidebar'

const Pegawai = () => {

  const [pegawaiList, setPegawaiList] = useState([])

  const getAllData = async () => {
    try {
      const response = await GetPegawai()

      setPegawaiList(response.data)

    } catch (error) {
      console.log(error, '<-- error get pegawai')
    }
  }

  const createNew = () => {
    // openModal('upsert')
    console.log('test');

    const modalToggle = document.getElementById('upsert')
    modalToggle.checked = true

    console.log(modalToggle)
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <Sidebar />
      <Navbar/>
      <TitleBar title='Pegawai' 
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create New Service'/>} 
      />
      
    
      <div className="card has-table text-gray-800">
        <TableHead title='daftar pegawai' />
        <div className="card-content">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>NIP</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pegawaiList.map((pegawai, index) => (
                <tr key={pegawai.id}>
                  <td className="image-cell">{index + 1}</td>
                  <td data-label="Nama">{pegawai.nama}</td>
                  <td data-label="Jabatan">{pegawai.jabatan}</td>
                  <td data-label="NIP">{pegawai.nip}</td>
                  <td className="actions-cell">
                    <div className="buttons right nowrap">
                      {/* <button id="editButton" className="button small green --jb-modal"  data-target="edit" type="button"
                        data-id="<%= pegawai.id %>"
                        data-nama="<%= pegawai.nama %>"
                        data-jabatan="<%= pegawai.jabatan %>"
                        data-nip="<%= pegawai.nip %>"
                      >
                        <span className="icon"><i className="mdi mdi-pen"></i></span>
                      </button>
                      <button className="button small red --jb-modal" data-target="delete" type="button" data-id="<%= pegawai.id %>">
                        <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-pagination">
            <div className="flex items-center justify-between">
              <div className="buttons">
                <button type="button" className="button active">1</button>
                <button type="button" className="button">2</button>
                <button type="button" className="button">3</button>
              </div>
              <small>Page 1 of 3</small>
            </div>
          </div>
        </div>
        <input type="checkbox" />
      </div>

      <input type="checkbox" id='upsert' className="modal-toggle" />
      <div className="modal">
          <div className={`w-96 modal-box max-w-5xl bg-white text-gray-700`} >
              <h3 className="font-bold text-2xl capitalize mb-4">title</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, quisquam?</p>
          </div>
      </div>


      {/* <BaseModal id='upsert' title='create form' classSize='w-screen'>
        <div className='grid gap-4 md:grid-cols-2'>
          <p>input form</p>
        </div>
        <div className="modal-action pt-4">
          <button>click</button>
        </div>
      </BaseModal> */}


      {/* <div id="create-modal" className="modal">
        <div className="modal-background --jb-modal-close"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">create form</p>
          </header>
          <section className="modal-card-body">
            <div className="field-body">
              
            </div>
            <div className="field grouped mt-2">
              <div className="control">
                <div className="button --jb-modal-close" id="btnCancel">Cancel</div>
              </div>
              <div className="control">
                <button type="submit" className="button red">Create</button>
              </div>
            </div>
          
          </section>
        </div>
      </div> */}
    </>
  )
}

export default Pegawai