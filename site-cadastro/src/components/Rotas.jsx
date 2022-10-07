import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Inicio from "../pages/Inicio"
import Cadastro from "../pages/Cadastro"

export default function Rotas() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro />} />
                <Route path="/Inicio" element={<Inicio />} />
            </Routes>
        </Router>
    )
}