// src/services/recursoService.js

import { supabase } from '../supaBaseClient.jsx'; // Verifique o caminho
import { Recurso } from '../models/Recurso.js';

/**
 * Busca todos os recursos de uma escola específica.
 * @param {number} escola_id - O ID da escola.
 * @returns {Promise<Recurso[]>} Uma lista de recursos.
 */
export async function getRecursosByEscola(escola_id) {
    const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .eq('escola_id', escola_id)
        .order('tipo_recurso', { ascending: true });

    if (error) {
        console.error("Erro ao buscar recursos:", error);
        throw new Error("Não foi possível buscar os dados dos recursos.");
    }
    return data.map(item => new Recurso(item));
}

/**
 * Cria um novo recurso no banco de dados.
 * @param {object} recursoData - Os dados do novo recurso.
 * @returns {Promise<Recurso>} O recurso criado.
 */
export async function createRecurso(recursoData) {
    const { data, error } = await supabase
        .from('recursos')
        .insert([recursoData])
        .select()
        .single();

    if (error) {
        console.error("Erro detalhado do Supabase ao criar recurso:", error);
        throw new Error("Não foi possível cadastrar o novo recurso.");
    }
    return new Recurso(data);
}

/**
 * ATUALIZA um recurso existente no banco de dados.
 * @param {number} id - O ID do recurso a ser atualizado.
 * @param {object} recursoData - Os novos dados do recurso.
 * @returns {Promise<Recurso>} O recurso atualizado.
 */
export async function updateRecurso(id, recursoData) {
    const { data, error } = await supabase
        .from('recursos')
        .update(recursoData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Erro detalhado do Supabase ao atualizar recurso:", error);
        throw new Error("Não foi possível atualizar o recurso.");
    }
    return new Recurso(data);
}

/**
 * DELETA um recurso do banco de dados.
 * @param {number} id - O ID do recurso a ser deletado.
 * @returns {Promise<void>}
 */
export async function deleteRecurso(id) {
    const { error } = await supabase
        .from('recursos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro detalhado do Supabase ao deletar recurso:", error);
        throw new Error("Não foi possível deletar o recurso.");
    }
}