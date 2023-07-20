import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Pegawai from '../pages/Pegawai';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'SIPS APP'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/pegawai" element={<Pegawai/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate