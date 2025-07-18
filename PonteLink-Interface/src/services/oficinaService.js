// src/services/oficinaService.js

import { supabase } from '../supaBaseClient.jsx'; // Verifique o caminho
import { Oficina } from '../models/Oficina.js';

/**
 * Busca todas as oficinas de uma escola específica, ordenadas pela data.
 * @param {number} escola_id - O ID da escola.
 * @returns {Promise<Oficina[]>} Uma lista de oficinas.
 */
export async function getOficinasByEscola(escola_id) {
    const { data, error } = await supabase
        .from('oficinas')
        .select('*')
        .eq('escola_id', escola_id)
        .order('data_hora', { ascending: false }); // Mais recentes primeiro

    if (error) {
        console.error("Erro ao buscar oficinas:", error);
        throw new Error("Não foi possível buscar os dados das oficinas.");
    }
    return data.map(item => new Oficina(item));
}

/**
 * Cria uma nova oficina no banco de dados.
 * @param {object} oficinaData - Os dados da nova oficina.
 * @returns {Promise<Oficina>} A oficina criada.
 */
export async function createOficina(oficinaData) {
    const { data, error } = await supabase
        .from('oficinas')
        .insert([oficinaData])
        .select()
        .single();

    if (error) {
        console.error("Erro detalhado do Supabase ao criar oficina:", error);
        throw new Error("Não foi possível agendar a nova oficina.");
    }
    return new Oficina(data);
}

/**
 * ATUALIZA uma oficina existente no banco de dados.
 * @param {number} id - O ID da oficina a ser atualizada.
 * @param {object} oficinaData - Os novos dados da oficina.
 * @returns {Promise<Oficina>} A oficina atualizada.
 */
export async function updateOficina(id, oficinaData) {
    const { data, error } = await supabase
        .from('oficinas')
        .update(oficinaData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Erro detalhado do Supabase ao atualizar oficina:", error);
        throw new Error("Não foi possível atualizar a oficina.");
    }
    return new Oficina(data);
}

/**
 * DELETA uma oficina do banco de dados.
 * @param {number} id - O ID da oficina a ser deletada.
 * @returns {Promise<void>}
 */
export async function deleteOficina(id) {
    const { error } = await supabase
        .from('oficinas')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro detalhado do Supabase ao deletar oficina:", error);
        throw new Error("Não foi possível deletar a oficina.");
    }
}