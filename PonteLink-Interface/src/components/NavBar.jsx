import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Ícones com versões ativas (brancas) e inativas (pretas)
import dashboardBranco from "../assets/dashboard-branco.svg";
import dashboardPreto from "../assets/dashboard-preto.svg";
import escolasBranco from "../assets/escola-branco.svg";
import escolasPreto from "../assets/escola-preto.svg";
import oficinaBranco from "../assets/oficina-branco.svg";
import oficinaPreto from "../assets/oficina-preto.svg";
import turmaBranco from "../assets/turma-branco.svg";
import turmaPreto from "../assets/turma-preto.svg";
import recursosBranco from "../assets/recursos-branco.svg";
import recursosPreto from "../assets/recursos-preto.svg";
import documentosBranco from "../assets/documento-branco.svg";
import documentosPreto from "../assets/documento-preto.svg";

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navItems = [
        {
            path: '/dashboard',
            icon: dashboardPreto,
            activeIcon: dashboardBranco,
            label: 'Dashboard',
            isDualIcon: true
        },
        {
            path: '/escolas',
            icon: escolasPreto,
            activeIcon: escolasBranco,
            label: 'Escolas',
            isDualIcon: true
        },
        {
            path: '/oficinas',
            icon: oficinaPreto,
            activeIcon: oficinaBranco,
            label: 'Oficinas',
            isDualIcon: true
        },
        {
            path: '/turmas',
            icon: turmaPreto,
            activeIcon: turmaBranco,
            label: 'Turmas',
            isDualIcon: true
        },
        {
            path: '/recursos',
            icon: recursosPreto,
            activeIcon: recursosBranco,
            label: 'Recursos',
            isDualIcon: true
        },
        {
            path: '/documentos',
            icon: documentosPreto,
            activeIcon: documentosBranco,
            label: 'Documentos',
            isDualIcon: true
        }
    ];

    return (
        <>
            <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <nav className={`nav-bar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={isActive ? 'active' : ''}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <img
                                src={isActive ? item.activeIcon : item.icon}
                                alt={item.label}
                            />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </>
    );
}