import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
// import { GetUser } from '../api/userApi'
import { AlertConfirm } from './SweetAlert'

const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const setActivePage = (id) => {
        document.getElementById(id).classList.add('active')
    }

    // const checkToken = async () => {
    //     try {
    //         const response = await GetUser()
    //         if (response.status == 403) {
    //             localStorage.removeItem("user");
    //             navigate('/login')
    //         }
    //     } catch (error) {
    //     }
    // }

    const logoutUser = () => {
        AlertConfirm({
            title: 'Logout?',
            preConfirm: () => {
                localStorage.removeItem("user");
                navigate('/login')
            }
        })
    }

    const dropdownMenu = () => {
        document.getElementById('dropdownMenu').classList.toggle('active')
        document.getElementById('iconDropdown').classList.toggle('mdi-plus')
        document.getElementById('iconDropdown').classList.toggle('mdi-minus')
    }


    const checkActiveMenu = () => {
        const activeMenu = () => {
            document.getElementById('iconDropdown').classList.remove('mdi-plus')
            document.getElementById('dropdownMenu').classList.add('active')
            document.getElementById('iconDropdown').classList.add('mdi-minus')
        }

        if (location.pathname === '/surat/berkelakuan-baik') {
            activeMenu()
        } else {
            
        }
    }

    useEffect(() => {
        // checkToken()
        checkActiveMenu()
    }, [])

    useEffect(() => {
        if (location.pathname === '/') {
            setActivePage('dashboard')
        } else if (location.pathname === '/pegawai') {
            setActivePage('pegawai')
        } else if (location.pathname === '/surat/berkelakuan-baik') {
            setActivePage('berkelakuan-baik')
        }
    }, [location]);

    return (
        <aside className="aside is-placed-left is-expanded" style={{ minHeight: '100vh', maxHeight: 'fit-content', overflowY: 'auto' }}>
            <div className='h-5/6'>
                <div className="aside-tools">
                    <div>
                        <b className="font-black">Kel. Balaroa</b>
                    </div>
                </div>
                <div className="menu is-menu-main">
                    <p className="menu-label">Menu</p>
                    <ul className="menu-list">
                        <li id='dashboard'>
                            <a onClick={() => navigate('/')}>
                                <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                                <span className="menu-item-label">Dashboard</span>
                            </a>
                        </li>
                        <li id='pegawai'>
                            <a onClick={() => navigate('/pegawai')}>
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                <span className="menu-item-label">Pegawai</span>
                            </a>
                        </li>
                        <li className="" id="dropdownMenu" onClick={dropdownMenu} >
                            <a className="dropdown">
                                <span className="icon"><i className="mdi mdi-view-list"></i></span>
                                <span className="menu-item-label">Surat</span>
                                <span className="icon"><i className="mdi mdi-plus" id="iconDropdown"></i></span>
                            </a>
                            <ul className='p-0'>
                                <li className="bg-gray-800" id="berkelakuan-baik">
                                    <a onClick={() => navigate('/surat/berkelakuan-baik')}>
                                        <span>S. K. Berkelakuan Baik</span>
                                    </a>
                                </li>
                                <li className="bg-gray-800" id="usaha">
                                    <a onClick={() => navigate('/surat/usaha')}>
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
            </div>
            <div className='flex justify-center'>
                <ul onClick={logoutUser} className="bg-slate-700 hover:bg-slate-600 cursor-pointer p-2 rounded-md w-full mx-2 text-center">
                    <li className="--set-active-profile-htm">
                        <a className='text-white'>
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span className="menu-item-label">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
          
        </aside>
    )
}

export default Sidebar