import React, {useState, useEffect} from 'react'
import Layout from '../layouts/Layout'
import { BasicButton } from '../components/BaseButton'
import { GetSuratByType, CreateSuratByType, GetWarga, UpdateSuratByType } from '../api/suratApi'   //api
import { GetPegawai } from '../api/pegawaiApi'     // api
import { BaseModal, openModal, closeModal, ModalLoading } from '../components/BaseModal'
import { BaseInput, SelectInput } from '../components/BaseInput'
import { AlertError, AlertSuccess } from '../components/SweetAlert'
import { getId, formatDateMounth, formatedNoSurat, printSurat } from '../function/baseFunction'
import { FooterTtd, BiodataWarga, HeadPegawai, KopSurat, BaseSurat, Paragraf } from '../components/SuratComponents'


const Surat = () => {

  const [suratList, setSuratList] = useState([])

  const getAllData = async () => {
    try {
      const response = await GetSuratByType('', '', '')
      setSuratList(response.data)
    } catch (error) {
      console.log(error, '<-- error get surat');
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <Layout
        title='semua surat'
        button={<BasicButton iconShow='block' title='Create New'/>}
      >
        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>No Surat</th>
                  <th>Nama Surat</th>
                  <th>Nama Warga</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {suratList.map((surat, index) => (
                  <tr key={surat.id}>
                   <td className="image-cell">{index+1}</td>
                    <td data-label="Nama Surat"><small>{surat.nama_surat}</small></td>
                    <td data-label="No Surat"><small>{surat.no_surat}</small></td>
                    <td data-label="Nama Warga">{surat.warga.nama}</td>
                    <td data-label="Created"><small>{surat.createdAt}</small></td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => console.log('testing')} className="button small blue">
                          <span className="icon"><i className="mdi mdi-eye"></i></span>
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
    </>
  )
}

export default Surat