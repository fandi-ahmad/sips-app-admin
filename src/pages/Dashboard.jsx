import React, { useState, useEffect } from 'react'
import { createGlobalState } from 'react-hooks-global-state';
import { useGlobalState } from '../state/state';

// component
import Layout from '../layouts/Layout';
import { Card, CardSurat } from '../components/Card';

// api
import { GetDataDashboard } from '../api/suratApi'

const Dashboard = () => {
  const [pegawai, setPegawai] = useState('')
  const [surat, setSurat] = useState('')

  // nama/jenis surat
  const [skBaik, setSkBaik] = useState('')
  const [skRumah, setSkRumah] = useState('')
  const [skKerja, setSkKerja] = useState('')
  const [skNikah, setSkNikah] = useState('')

  const [skUsaha, setSkUsaha] = useState('')
  const [skDomUsaha, setSkDomUsaha] = useState('')
  const [skPenghasilan, setSkPenghasilan] = useState('')
  const [skKematian, setSkKematian] = useState('')

  const getAllData = async () => {
    try {
      const response = await GetDataDashboard()
      setPegawai(response.data.pegawai)
      setSurat(response.data.surat)

      const s = response.surat
      setSkBaik(s.sk_baik)
      setSkRumah(s.sk_rumah)
      setSkKerja(s.sk_kerja)
      setSkNikah(s.sk_menikah)
      setSkUsaha(s.sk_usaha)
      setSkDomUsaha(s.sk_dom_usaha)
      setSkPenghasilan(s.sk_penghasilan)
      setSkKematian(s.sk_kematian)
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
      <hr className='mb-4 border-2 rounded-md' />
      <div className='grid gap-6 grid-cols-1 md:grid-cols-4 mb-6'>
        <CardSurat title='s. k. berkelakuan baik' value={skBaik} />
        <CardSurat title='s. k. belum memiliki rumah' value={skRumah} />
        <CardSurat title='s. k. belum bekerja' value={skKerja} />
        <CardSurat title='s. k. belum menikah' value={skNikah} />
        <CardSurat title='s. k. usaha' value={skUsaha} />
        <CardSurat title='s. k. domisili usaha' value={skDomUsaha} />
        <CardSurat title='s. k. penghasilan' value={skPenghasilan} />
        <CardSurat title='s. k. kematian' value={skKematian} />
      </div>
      <p className='text-yellow-500 hidden'>text</p>
    </Layout>
  )
}

export default Dashboard