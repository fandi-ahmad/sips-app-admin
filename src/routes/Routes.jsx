import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { Pegawai } from '../pages/Pegawai';
import SKBaik from '../pages/surats/SKBaik';
import Surat from '../pages/Surat';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'WPM'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/pegawai" element={<Pegawai/>} />

                <Route path="/surat" element={<Surat/>} />
                <Route path='/surat/berkelakuan-baik' element={<SKBaik/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate