import { supabase } from '../supaBaseClient';

/**
 * Realiza o cadastro de um novo usuário.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

/**
 * Realiza o login de um usuário existente.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>}
 */
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

/**
 * Realiza o logout do usuário atual.
 * @returns {Promise<void>}
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

/**
 * Obtém os dados do usuário logado na sessão atual.
 * @returns {Promise<object | null>}
 */
export async function getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session?.user ?? null;
}

/**
 * Escuta por mudanças no estado de autenticação (login, logout).
 * @param {function} callback - Função a ser chamada quando o estado mudar.
 * @returns {object} O subscription que pode ser cancelado.
 */
export function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        callback(session?.user ?? null);
    });
    return subscription;
}