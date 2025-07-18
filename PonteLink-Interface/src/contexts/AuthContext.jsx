import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tenta pegar o usuário da sessão quando o app carrega
        async function checkUser() {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        }

        checkUser();

        // Escuta por futuras mudanças (login/logout)
        const subscription = onAuthStateChange(setUser);

        // Limpa o listener quando o componente desmontar
        return () => subscription.unsubscribe();
    }, []);

    const value = {
        user,
        // Futuramente podemos expor as funções de login/logout aqui
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Hook customizado para facilitar o uso do contexto
export function useAuth() {
    return useContext(AuthContext);
}