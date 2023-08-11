import React, { useState, useEffect } from 'react'
import { createGlobalState } from 'react-hooks-global-state';
import { useGlobalState } from '../state/state';

// component
import Layout from '../layouts/Layout';
import Card from '../components/Card';

// api
import { GetDataDashboard } from '../api/suratApi'

const Dashboard = () => {
  const [pegawai, setPegawai] = useState('')
  const [surat, setSurat] = useState('')

  const getAllData = async () => {
    try {
      const response = await GetDataDashboard()
      setPegawai(response.data.pegawai)
      setSurat(response.data.surat)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllData()
  }, [])
 
  return (
    <Layout title='Dashboard' >
      <div className='grid gap-6 grid-cols-1 md:grid-cols-3 mb-6'>
        <Card title='pegawai' color='blue' value={pegawai} />
        <Card title='surat' icon='fa-file-lines' color='yellow' value={surat} />
      </div>
      <p className='text-yellow-500 hidden'>text</p>
    </Layout>
  )
}

export default Dashboard