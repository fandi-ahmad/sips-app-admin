import React from 'react'
import stmik from './../assets/images/stmikadhigunaicon.svg'

const Footer = () => {
  return (
    <footer className="footer w-full">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 w-full">
        <div className="flex items-center justify-start space-x-3">
          <div>© Mahasiswa KKLP 2023</div>
          <p>STMIK Adhi Guna</p>
          <img src={stmik} alt="logo stmik" className='w-8' />
        </div>
        <div className=''>version: 1.0.0</div>
      </div>
    </footer>
  )
}

export default Footer