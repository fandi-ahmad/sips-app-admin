import React, { useEffect, useState, useRef } from 'react'
import paluLogo from '../assets/images/lambang_kota_palu.png'
import Layout from '../layouts/layout'
import TitleBar from '../components/TitleBar'

const Dashboard = () => {

  const printArea = (area) => {
    var printPage = document.getElementById(area).innerHTML
    var oriPage = document.body.innerHTML
    document.body.innerHTML = printPage
    window.print()
    document.body.innerHTML = oriPage
    location.reload()
  }

  // const [paluLogo, setPaluLogo] = useState('../assets/images/lambang_kota_palu.png')

  return (
    <>
      <Layout>
        <TitleBar title='dashboard' />
        <h1>ini bagian isi</h1>
      </Layout>

    </>
  )
}

export default Dashboard