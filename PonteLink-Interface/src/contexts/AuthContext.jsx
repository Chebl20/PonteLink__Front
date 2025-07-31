import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supaBaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState({
        user: null,
        profile: null,
        loading: true,
    });

    useEffect(() => {
        /**
         * Busca o perfil do usuário e atualiza o estado final da sessão.
         * @param {object} user - O objeto de usuário do Supabase Auth.
         */
        const fetchProfile = async (user) => {
            try {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('perfil, nome_completo')
                    .eq('user_id', user.id)
                    .maybeSingle(); // Ótima escolha, continua aqui!

                if (error) throw error;

                // Atualiza o estado com o perfil e FINALIZA o carregamento
                setSession({ user, profile: data, loading: false });

                // --- Seus console.logs para depuração ---
                console.log("Sessão finalizada:", { user, profile: data });
                // ------------------------------------

            } catch (error) {
                console.error("Erro ao buscar perfil:", error.message);
                // Mesmo com erro, finaliza o carregamento para não travar
                setSession({ user, profile: null, loading: false });
            }
        };

        // onAuthStateChange já lida com o estado inicial, login e logout.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user;
                if (currentUser) {
                    // Se há um usuário, busca o perfil. O loading será finalizado dentro de fetchProfile.
                    fetchProfile(currentUser);
                } else {
                    // Se não há usuário (logout ou sessão expirada), finaliza o carregamento.
                    setSession({ user: null, profile: null, loading: false });
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        user: session.user,
        profile: session.profile,
    };

    return (
        <AuthContext.Provider value={value}>
            {session.loading ? <p>Carregando...</p> : children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}