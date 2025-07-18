// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Importe NavLink em vez de Link

// Importe os ícones necessários
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function NavBar() {
    return (
        <div className="nav-bar">
            <NavLink to="/dashboard">
                <img src={dashboardIcon} alt="Dashboard" /> Dashboard
            </NavLink>
            <NavLink to="/escolas">
                <img src={escolasIcon} alt="Escolas" /> Escolas
            </NavLink>
            <NavLink to="/oficinas">
                <img src={oficinasIcon} alt="Oficinas" /> Oficinas
            </NavLink>
            <NavLink to="/turmas">
                <img src={turmasIcon} alt="Turmas" /> Turmas
            </NavLink>
            <NavLink to="/recursos">
                <img src={recursosIcon} alt="Recursos" /> Recursos
            </NavLink>
            <NavLink to="/documentos">
                <img src={documentosIcon} alt="Documentos" /> Documentos
            </NavLink>
        </div>
    );
}