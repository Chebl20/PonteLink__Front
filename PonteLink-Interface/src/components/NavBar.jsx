// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Importe os ícones necessários
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Fecha o menu quando a rota muda
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navItems = [
        { path: '/dashboard', icon: dashboardIcon, label: 'Dashboard' },
        { path: '/escolas', icon: escolasIcon, label: 'Escolas' },
        { path: '/oficinas', icon: oficinasIcon, label: 'Oficinas' },
        { path: '/turmas', icon: turmasIcon, label: 'Turmas' },
        { path: '/recursos', icon: recursosIcon, label: 'Recursos' },
        { path: '/documentos', icon: documentosIcon, label: 'Documentos' },
    ];

    return (
        <>
            {/* Botão Menu Mobile */}
            <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay Mobile */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Barra de Navegação */}
            <nav className={`nav-bar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <img src={item.icon} alt={item.label} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </>
    );
}