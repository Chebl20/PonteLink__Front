// src/components/Header.jsx
import React from 'react';
import { Bell, User } from 'lucide-react';
import '../styles/header.css';

export default function Header() {
    return (
        <div className="top-bar">
            <div className="logo">PonteLink</div>
            <div className="header-actions">
                <button className="notif-btn">
                    <Bell size={18} color="#f3d512" />
                    <span>Notificações</span>
                </button>
                <button className="admin-btn">
                    <User size={18} />
                    <span>Gestor Admin</span>
                </button>
            </div>
        </div>
    );
}