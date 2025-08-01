
import { supabase } from '../supaBaseClient.jsx'; // Verifique se o caminho do cliente Supabase está correto
import { Oficina } from '../models/Oficina.js';   // Importa o modelo de dados para Oficina


/**
 * Função auxiliar para mapear os dados brutos do banco de dados para uma instância de Oficina.
 * @param {object} dbData - Os dados brutos retornados pelo Supabase.
 * @returns {Oficina | null} Uma instância de Oficina ou null se não houver dados.
 */
function _mapToOficinaInstance(dbData) {
    if (!dbData) return null;
    return new Oficina(dbData);
}

/**
 * Busca todas as oficinas de todas as escolas.
 * @returns {Promise<Oficina[]>} Uma lista de todas as oficinas.
 */
export async function getAllOficinas() {
    const { data, error } = await supabase
        .from('oficinas')
        .select('*')
        .order('data_hora', { ascending: false }); // Mais recentes primeiro

    if (error) {
        console.error("Erro Supabase (get all oficinas):", error);
        throw new Error(`Erro ao buscar todas as oficinas: ${error.message}`);
    }
    return data.map(_mapToOficinaInstance);
}

/**
 * Busca todas as oficinas de uma escola específica.
 * @param {number} escola_id - O ID da escola para a qual as oficinas serão buscadas.
 * @returns {Promise<Oficina[]>} Uma lista de instâncias de Oficina.
 */
export async function getOficinasByEscola(escola_id) {
    const { data, error } = await supabase
        .from('oficinas')
        .select('*')
        .eq('escola_id', escola_id)
        .order('data_hora', { ascending: false }); // Mais recentes primeiro

    if (error) {
        console.error("Erro Supabase (get oficinas):", error);
        throw new Error(`Erro ao buscar as oficinas da escola: ${error.message}`);
    }
    return data.map(_mapToOficinaInstance);
}

/**
 * Busca uma oficina específica pelo seu ID.
 * @param {number} id - O ID da oficina a ser buscada.
 * @returns {Promise<Oficina>} A instância da oficina encontrada.
 */
export async function getOficinaById(id) {
    const { data, error } = await supabase
        .from('oficinas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Erro Supabase (get oficina by id):", error);
        throw new Error(`Erro ao buscar a oficina: ${error.message}`);
    }
    return _mapToOficinaInstance(data);
}


/**
 * Cria uma nova oficina no banco de dados.
 * @param {object} oficinaData - Os dados da nova oficina a ser criada. Deve incluir 'escola_id'.
 * @returns {Promise<Oficina>} A instância da oficina recém-criada.
 */
export async function createOficina(oficinaData) {
    if (!oficinaData.escola_id) {
        throw new Error("O campo 'escola_id' é obrigatório para criar uma oficina.");
    }

    const { data, error } = await supabase
        .from('oficinas')
        .insert([oficinaData])
        .select()
        .single(); // Retorna o objeto recém-criado

    if (error) {
        console.error("Erro Supabase (create oficina):", error);
        throw new Error(`Erro ao criar a oficina: ${error.message}`);
    }
    return _mapToOficinaInstance(data);
}

/**
 * ATUALIZA uma oficina existente no banco de dados.
 * @param {number} id - O ID da oficina a ser atualizada.
 * @param {object} oficinaData - Os novos dados para a oficina.
 * @returns {Promise<Oficina>} A instância da oficina atualizada.
 */
export async function updateOficina(id, oficinaData) {
    const { data, error } = await supabase
        .from('oficinas')
        .update(oficinaData)
        .eq('id', id)
        .select()
        .single(); // Retorna o objeto atualizado

    if (error) {
        console.error("Erro Supabase (update oficina):", error);
        throw new Error(`Erro ao atualizar a oficina: ${error.message}`);
    }
    return _mapToOficinaInstance(data);
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
        console.error("Erro Supabase (delete oficina):", error);
        throw new Error(`Erro ao deletar a oficina: ${error.message}`);
    }
    // A operação de delete não retorna conteúdo em caso de sucesso.
}