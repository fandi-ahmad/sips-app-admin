import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Service from '../pages/Service';
import Setup from '../pages/Setup';
import { Pegawai } from '../pages/Pegawai';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'WPM'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/service" element={<Service/>} />
                <Route path="/setup" element={<Setup/>} />
                <Route path="/pegawai" element={<Pegawai/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate