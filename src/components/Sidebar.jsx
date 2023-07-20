import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { GetUser } from '../api/userApi'
import { AlertConfirm } from './SweetAlert'

const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const setActivePage = (id) => {
        document.getElementById(id).classList.add('active')
    }

    const checkToken = async () => {
        try {
            const response = await GetUser()
            if (response.status == 403) {
                localStorage.removeItem("user");
                navigate('/login')
            }
        } catch (error) {
        }
    }

    const logoutUser = () => {
        AlertConfirm({
            title: 'Logout?',
            preConfirm: () => {
                localStorage.removeItem("user");
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        // checkToken()
    }, [])

    useEffect(() => {
        if (location.pathname === '/') {
            setActivePage('dashboard')
        } else if (location.pathname === '/service') {
            setActivePage('service')
        } else if (location.pathname === '/setup') {
            setActivePage('setup')
        }
    }, [location]);

    return (
        <aside className="aside is-placed-left is-expanded">
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
                        <li id='service'>
                            <a onClick={() => navigate('/pegawai')}>
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                <span className="menu-item-label">Pegawai</span>
                            </a>
                        </li>
                        <li id='service'>
                            <a onClick={() => navigate('/service')}>
                                <span className="icon"><i className="mdi mdi-table"></i></span>
                                <span className="menu-item-label">Service</span>
                            </a>
                        </li>
                        <li id='setup'>
                            <a onClick={() => navigate('/setup')}>
                                <span className="icon"><i className="mdi mdi-tools"></i></span>
                                <span className="menu-item-label">Setup</span>
                            </a>
                        </li>
                        <li id='profile'>
                            <a>
                                <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                                <span className="menu-item-label">Profile</span>
                            </a>
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