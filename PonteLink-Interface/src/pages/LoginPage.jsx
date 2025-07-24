// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { signIn } from '../services/authService.js';
import "../styles/login.css";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await signIn(email, password);
            navigate('/escolas');
        } catch (err) {
            setError(err.message || 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">PL</div>
                    <h1 className="login-title">PonteLink</h1>
                    <p className="login-subtitle">Conectando educação ao futuro</p>
                </div>

                {error && (
                    <div className="error-message">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">E-mail</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Senha</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field password-field"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" className="remember-checkbox" />
                            <span className="remember-label">Lembrar-me</span>
                        </label>
                        <a href="#" className="forgot-password">Esqueceu a senha?</a>
                    </div>

                    <button type="submit" disabled={isLoading} className="login-button">
                        {isLoading ? (
                            <div className="login-button-content">
                                <div className="loading-spinner"></div>
                                Entrando...
                            </div>
                        ) : 'Entrar'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Não tem uma conta?{' '}
                        <a href="#" className="signup-link">Entre em contato</a>
                    </p>
                </div>
            </div>

            <div className="login-copyright">
                <p>© 2025 PonteLink. Todos os direitos reservados.</p>
            </div>
        </div>
    );
}
