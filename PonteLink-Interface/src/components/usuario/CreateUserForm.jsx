import React, { useState } from 'react';
// Importa a função que chama nossa Edge Function, vinda do nosso "tradutor"
import { adminCreateUser } from '../../services/authService';
// Importa os estilos de botão que já criamos
import '../../index.css'; // ou o caminho para o seu CSS principal

export default function CreateUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);

        try {
            // Chama a função do authService
            await adminCreateUser(email, password);
            setMessage('Usuário criado com sucesso!');
            // Limpa o formulário após o sucesso
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Erro ao criar usuário: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Usando as classes de formulário do seu CSS
        <form onSubmit={handleSubmit} className="modal-form">
            <div>
                <label htmlFor="email">Email do Novo Usuário:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="password">Senha:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>

            {/* Usando a classe de botão que já definimos */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Criando...' : 'Criar Usuário'}
            </button>

            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
    );
} 