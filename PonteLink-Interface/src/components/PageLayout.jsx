// src/components/PageLayout.jsx
import React from 'react';
import Header from './TopBar';
import NavBar from './NavBar';
import '../styles/page-layout.css';

export default function PageLayout({ children, className = '' }) {
    return (
        <div className={`page-container ${className}`}>
            <Header />
            <NavBar />

            <main className="page-content">
                {children}
            </main>

            <footer className="main-footer">
                <span>© 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>
        </div>
    );
}