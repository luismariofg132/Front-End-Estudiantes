import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from '../Components/Home'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default AppRouter