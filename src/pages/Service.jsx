import React, { useState, useEffect } from 'react'
import { utils, write } from 'xlsx'

// component
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import { BasicButton } from '../components/BaseButton'
import { BaseInput, InputTextArea, InputFile } from '../components/BaseInput'
import { BaseModal, ModalLoading, openModal, closeModal } from '../components/BaseModal'
import { AlertSuccess, AlertConfirm, AlertError } from '../components/SweetAlert'

// api
import { GetService, CreateService, DeleteService, UpdateService } from '../api/serviceApi'

const Service = () => {

  const [serviceList, setServiceList] = useState([])
  const [nul, setNul] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [idService, setIdService] = useState(null)
  const [optText, setOptText] = useState('create')

  const getId = (selector) => {
    return document.getElementById(selector)
  }

  const getAllService = async () => {
    try {
      const respone = await GetService()
      setServiceList(respone.data)
    } catch (error) {

    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name': setName(value);
        break;
      case 'description': setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleInputFile = (e) => {
    const imageSelect = e.target.files[0]
    setImage(imageSelect);
    setImageUrl(URL.createObjectURL(imageSelect));
  };

  const createNew = () => {
    openModal('upsert')
    setOptText('create')
    setName('')
    setDescription('')
    setImage(nul)
    setImageUrl('')
    getId('btnCreate').classList.remove('hidden')
    getId('btnUpdate').classList.add('hidden')
  }

  const createNewService = async () => {
    try {
      if (name === '' || description === '' || image === 0) {
        AlertError('Input cannot be empty')
      } else {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image);
        closeModal('upsert')
        openModal('modal-loading')
        await CreateService(formData)
  
        getAllService()
        closeModal('modal-loading')
        AlertSuccess('Service has been created')
      }
    } catch (error) {
      AlertError()
    }
  }

  const deleteService = (id) => {
    AlertConfirm({
      title: 'Delete?',
      preConfirm: () => {
        confirmDeleteService(id)
      }
    })
  }

  const confirmDeleteService = async (id) => {
    try {
      openModal('modal-loading')
      const respone = await DeleteService(id)
      
      closeModal('modal-loading')
      AlertSuccess(respone.message)
      getAllService()
    } catch (error) {
      AlertError()
    }
  }

  const openUpdateService = (service) => {
    openModal('upsert')
    setOptText('update')
    setIdService(service.id)
    setName(service.name)
    setDescription(service.description)
    setImage(service.image)
    setImageUrl(`http://localhost:8000/${service.image}`)
    getId('btnCreate').classList.add('hidden')
    getId('btnUpdate').classList.remove('hidden')
  }

  const updateService = async () => {
    openModal('modal-loading')
    try {
      const formData = new FormData();
      formData.append('id', idService)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('image', image);

      const respone = await UpdateService(formData)
      closeModal('upsert')
      AlertSuccess(respone.message)
      getAllService()
    } catch (error) {
      AlertError()
    }
    closeModal('modal-loading')
  }

  const handleDownloadImage = async (service) => {
    openModal('modal-loading')
    try {
      const response = await fetch(`http://localhost:8000/${service.image}`);
      const fileBlob = await response.blob();
      const imageUrlLink = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = imageUrlLink;
      link.download = service.image
      link.click();
    } catch (error) {
      AlertError()
    }
    closeModal('modal-loading')
  }

  const downloadData = () => {
    const worksheet = utils.json_to_sheet(serviceList);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'data.xlsx';
    link.click();
  }

  useEffect(() => {
    getAllService()
  }, [])

  return (
    <>
      <Sidebar />
      <TitleBar
        title='Service'
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create New Service'/>}
      />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <table className='text-slate-800'>
              <thead>
                <tr>
                  <th></th>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Created</th>
                  <th className='buttons right nowrap'>
                    <BasicButton onClick={downloadData} title='Download' icon='mdi-download mdi-18px' iconShow='block' className='btn-sm blue p-1 px-2' />
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {serviceList.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index+1}</td>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>
                      <img style={{width: '150px'}} src={`http://localhost:8000/${service.image}`} alt="" />
                    </td>
                    <td>
                      <small>{service.createdAt}</small>
                    </td>
                    <td className="actions-cell">
                      <div className="buttons right nowrap">
                        <button onClick={() => handleDownloadImage(service)} className="button small text-white bg-yellow-500 hover:bg-yellow-600 border-0 --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-download mdi-18px"></i></span>
                        </button>
                        <button onClick={() => openUpdateService(service)} className="button small blue --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-pencil mdi-18px"></i></span>
                        </button>
                        <button onClick={() => deleteService(service.id)} className="button small red --jb-modal" type="button">
                          <span className="icon"><i className="mdi mdi-delete mdi-18px"></i></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== upsert modal ===== */}
      <BaseModal id='upsert' title={`${optText} service`} classSize='w-screen'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <BaseInput value={name} onChange={handleInput} name='name' className='mb-5' />
              <div className='mb-5'>
                <BasicButton onClick={() => getId('imageInput').click()} title='upload image' icon='mdi-upload' iconShow='block' className='btn-sm blue p-1 px-2' />
                <InputFile value={image} onChange={handleInputFile} name='image' id='imageInput' className='hidden' />
                {imageUrl && <img src={imageUrl} alt="preview" className='h-40 rounded-md mt-4' />}
              </div>
            </div>
            <InputTextArea value={description} onChange={handleInput} name='description' rows='12' className='mb-5' />
          </div>
          <div className="modal-action pt-4">
            <BasicButton onClick={() => closeModal('upsert')} title='Close' className='bg-gray-500 text-white' />
            <BasicButton onClick={createNewService} id='btnCreate' title='Create'/>
            <BasicButton onClick={updateService} id='btnUpdate' title='Update'/>
          </div>
      </BaseModal>

      {/* ===== loading ===== */}
      <ModalLoading id='modal-loading' />
    </>
  )
}

export default Service