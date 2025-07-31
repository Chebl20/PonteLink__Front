// src/components/TopBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { signOut } from '../services/authService.js';
import { Bell, User, ChevronDown } from 'lucide-react';

export default function TopBar() {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCreateUserClick = () => {
        navigate('/admin/criar-usuario');
        setIsDropdownOpen(false);
    };

    return (
        <div className="top-bar">
            <div className="logo">PonteLink</div>
            <div className="header-actions">
                {user && (
                    <div className="user-menu-container">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="admin-btn">
                            <User size={18} />
                            <span>{profile?.nome_completo || user.email}</span>
                            <ChevronDown size={16} />
                        </button>

                        {isDropdownOpen && (
                            <div className="user-dropdown">
                                {/* Opção de Criar Usuário SÓ para admins */}
                                {profile?.perfil === 'admin' && (
                                    <button
                                        onClick={handleCreateUserClick}
                                        className="submit-btn" // <<< APLICANDO A CLASSE EXISTENTE
                                    >
                                        Criar Usuário
                                    </button>
                                )}
                                {/* Botão para Sair */}
                                <button
                                    onClick={handleLogout}
                                    className="btn-cancel" // <<< APLICANDO A CLASSE EXISTENTE
                                >
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button className="notif-btn"><Bell size={18} color="#f3d512" /> Notificações</button>
            </div>
        </div>
    );
}