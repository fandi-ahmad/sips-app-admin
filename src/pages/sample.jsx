import React, { useEffect, useState, useRef } from 'react'
import paluLogo from '../assets/images/lambang_kota_palu.png'

const Sample = () => {

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
      <button onClick={() => printArea('area')}>print 1</button>

      <div id='area' style={{ width: '595px', height: '842px', border: '1px solid black' }}>
        <div style={{ border: '1px solid red', height: '842px' }}>
          <div className='w-full h-full text-tnr text-2xl font-black flex justify-center'>
            <div className='flex flex-row'>
              <div className='mr-4'>
                <img src={paluLogo} alt="" className='w-16' />
              </div>
              <div className='text-center'>
                <h3>KECAMATAN PALU BARAT</h3>
                <h3>KELURAHAN BALAROA</h3>
                <h5 className='text-lg'>Jalan Yambaere No.5</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Sample