import { React, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../pages/Dashboard';

export const RoutesTemplate = () => {

    useEffect(() => {
        document.title = 'SIPS APP'
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesTemplate