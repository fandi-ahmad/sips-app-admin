import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { getId } from './baseFunction';

const Sidebar = () => {

  const pathname = window.location.pathname
  const navigate = useNavigate()
  const location = useLocation()

  const checkActivePage = () => {
    if (pathname == '/') {
      getId('dashboard').classList.add('active')
    } else if (pathname == '/pegawai') {
      getId('pegawai').classList.add('active')
    } else if (pathname == '/surat') {
      getId('surat').classList.add('active')
    }
  }

  const checkDropDownMenu = () => {
    const iconDropdown = () => {
      getId('dropdownMenu').classList.add('active')
      getId('iconDropdown').classList.remove('mdi-plus')
      getId('iconDropdown').classList.add('mdi-minus')
    }

    const activeMenu = (idMenu) => {
      getId(idMenu).classList.add('bg-gray-700')
      getId(idMenu).classList.remove('bg-gray-800')
    }
    
    if (pathname == '/surat/berkelakuan-baik') {
      activeMenu('berkelakuan-baik')
      iconDropdown()
    } else if (pathname == '/surat/usaha') {
      activeMenu('usaha')
      iconDropdown()
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }

  const dropDownMenu = () => {
    getId('dropdownMenu').classList.toggle('active')
    getId('iconDropdown').classList.toggle('mdi-plus')
    getId('iconDropdown').classList.toggle('mdi-minus')
  }

  useEffect(() => {
    checkActivePage()
    // checkDropDownMenu()
    // checkToken()
  }, [])

  return (
    <aside className="aside is-placed-left is-expanded">
      <div className="aside-tools">
        <div>
          Admin <b className="font-black">One</b>
        </div>
      </div>
      <div className="menu is-menu-main flex justify-between" style={{ flexDirection: 'column', height: '90vh' }}>
        <div style={{ alignItems: 'flex-start' }}>
          <p className="menu-label">General</p>
          <ul className="menu-list cursor-pointer">
            <li className="" id="dashboard">
              <a onClick={() => navigate('/')}>
                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                <span className="menu-item-label">Dashboard</span>
              </a>
            </li>
            <li className="" id="pegawai">
              <a onClick={() => navigate('/pegawai')}>
                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                <span className="menu-item-label">Pegawai</span>
              </a>
            </li>
            <li className="" id="surat">
              <a onClick={() => navigate('/surat')}>
                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                <span className="menu-item-label">Surat</span>
              </a>
            </li>
            <li className="" id="dropdownMenu" onClick={dropDownMenu}>
              <a className="dropdown">
                <span className="icon"><i className="mdi mdi-view-list"></i></span>
                <span className="menu-item-label">Surat</span>
                <span className="icon"><i className="mdi mdi-plus" id="iconDropdown"></i></span>
              </a>
              <ul>
                <li className="bg-gray-800" id="berkelakuan-baik">
                  <a href="/surat/berkelakuan-baik">
                    <span>S. K. Berkelakuan Baik</span>
                  </a>
                </li>
                <li className="bg-gray-800" id="usaha">
                  <a href="/surat/usaha">
                    <span>S. K. Usaha</span>
                  </a>
                </li>
                <li className="bg-gray-800">
                  <a href="/surat/domisili-usaha">
                    <span>S. K. Domisili Usaha</span>
                  </a>
                </li>
                <li className="bg-gray-800">
                  <a href="/surat/rumah">
                    <span>S. K. Belum Memiliki Rumah</span>
                  </a>
                </li>
                <li className="bg-gray-800">
                  <a href="/surat/sktm">
                    <span>S. K. Tidak Mampu (SKTM)</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex justify-center mt-10" style={{ alignItems: 'flex-end' }}>
          <button onClick={logoutUser} className="button bg-gray-600 hover:bg-gray-700 text-white border-0" data-target="create-modal" type="button">
            <span className="icon"><i className="mdi mdi-logout"></i></span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

