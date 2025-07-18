// src/components/TopBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { signOut } from '../services/authService.js';
import { Bell, User } from 'lucide-react';

export default function TopBar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="top-bar">
            <div className="logo">PonteLink</div>
            <div className="header-actions">
                {user && <span style={{ color: 'white', marginRight: '20px' }}>Olá, {user.email}</span>}
                <button className="notif-btn"><Bell size={18} color="#f3d512" /> Notificações</button>
                <button onClick={handleLogout} className="admin-btn"><User size={18} /> Sair</button>
            </div>
        </div>
    );
}