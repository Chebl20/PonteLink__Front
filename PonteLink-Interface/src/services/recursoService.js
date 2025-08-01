// src/services/recursoService.js

import { supabase } from '../supaBaseClient.jsx'; // Verifique se o caminho do cliente Supabase está correto
import { Recurso } from '../models/Recurso.js';   // Importa o modelo de dados para Recurso

/**
 * NOTA DE ARQUITETURA:
 * Este serviço gerencia as operações CRUD para a entidade 'Recurso'.
 * Cada recurso está associado a uma 'Escola' através da chave estrangeira 'escola_id'.
 * A estrutura foi padronizada para manter consistência com outros serviços da aplicação.
 */

/**
 * Função auxiliar para mapear os dados brutos do banco de dados para uma instância de Recurso.
 * @param {object} dbData - Os dados brutos retornados pelo Supabase.
 * @returns {Recurso | null} Uma instância de Recurso ou null se não houver dados.
 */
function _mapToRecursoInstance(dbData) {
    if (!dbData) return null;
    return new Recurso(dbData);
}

/**
 * Busca todos os recursos de todas as escolas.
 * @returns {Promise<Recurso[]>} Uma lista de todos os recursos.
 */
export async function getAllRecursos() {
    const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .order('tipo_recurso', { ascending: true });

    if (error) {
        console.error("Erro Supabase (get all recursos):", error);
        throw new Error(`Erro ao buscar todos os recursos: ${error.message}`);
    }
    return data.map(_mapToRecursoInstance);
}

/**
 * Busca todos os recursos de uma escola específica.
 * @param {number} escola_id - O ID da escola para a qual os recursos serão buscados.
 * @returns {Promise<Recurso[]>} Uma lista de instâncias de Recurso.
 */
export async function getRecursosByEscola(escola_id) {
    const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .eq('escola_id', escola_id)
        .order('tipo_recurso', { ascending: true });

    if (error) {
        console.error("Erro Supabase (get recursos):", error);
        throw new Error(`Erro ao buscar os recursos da escola: ${error.message}`);
    }
    return data.map(_mapToRecursoInstance);
}

/**
 * Busca um recurso específico pelo seu ID.
 * @param {number} id - O ID do recurso a ser buscado.
 * @returns {Promise<Recurso>} A instância do recurso encontrado.
 */
export async function getRecursoById(id) {
    const { data, error } = await supabase
        .from('recursos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Erro Supabase (get recurso by id):", error);
        throw new Error(`Erro ao buscar o recurso: ${error.message}`);
    }
    return _mapToRecursoInstance(data);
}


/**
 * Cria um novo recurso no banco de dados.
 * @param {object} recursoData - Os dados do novo recurso a ser criado. Deve incluir 'escola_id'.
 * @returns {Promise<Recurso>} A instância do recurso recém-criado.
 */
export async function createRecurso(recursoData) {
    if (!recursoData.escola_id) {
        throw new Error("O campo 'escola_id' é obrigatório para criar um recurso.");
    }

    const { data, error } = await supabase
        .from('recursos')
        .insert([recursoData])
        .select()
        .single(); // Retorna o objeto recém-criado

    if (error) {
        console.error("Erro Supabase (create recurso):", error);
        throw new Error(`Erro ao criar o recurso: ${error.message}`);
    }
    return _mapToRecursoInstance(data);
}

/**
 * ATUALIZA um recurso existente no banco de dados.
 * @param {number} id - O ID do recurso a ser atualizado.
 * @param {object} recursoData - Os novos dados para o recurso.
 * @returns {Promise<Recurso>} A instância do recurso atualizado.
 */
export async function updateRecurso(id, recursoData) {
    const { data, error } = await supabase
        .from('recursos')
        .update(recursoData)
        .eq('id', id)
        .select()
        .single(); // Retorna o objeto atualizado

    if (error) {
        console.error("Erro Supabase (update recurso):", error);
        throw new Error(`Erro ao atualizar o recurso: ${error.message}`);
    }
    return _mapToRecursoInstance(data);
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
        console.error("Erro Supabase (delete recurso):", error);
        throw new Error(`Erro ao deletar o recurso: ${error.message}`);
    }
    // A operação de delete não retorna conteúdo em caso de sucesso.
}
