import { supabase } from '../supaBaseClient.jsx'; // Verifique se o caminho do cliente Supabase está correto
import { Documento } from '../models/Documento.js'; // Importa o modelo de dados para Documento


/**
 * Função auxiliar para mapear os dados brutos do banco de dados para uma instância de Documento.
 * @param {object} dbData - Os dados brutos retornados pelo Supabase.
 * @returns {Documento | null} Uma instância de Documento ou null se não houver dados.
 */
function _mapToDocumentoInstance(dbData) {
    if (!dbData) return null;
    return new Documento(dbData);
}

/**
 * Busca todos os documentos de todas as escolas e oficinas.
 * @returns {Promise<Documento[]>} Uma lista de todos os documentos.
 */
export async function getAllDocumentos() {
    const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .order('data_atualizacao', { ascending: false }); // Mais recentes primeiro

    if (error) {
        console.error("Erro Supabase (get all documentos):", error);
        throw new Error(`Erro ao buscar todos os documentos: ${error.message}`);
    }
    return data.map(_mapToDocumentoInstance);
}

/**
 * Busca todos os documentos de uma escola específica.
 * @param {number} escola_id - O ID da escola para a qual os documentos serão buscados.
 * @returns {Promise<Documento[]>} Uma lista de instâncias de Documento.
 */
export async function getDocumentosByEscola(escola_id) {
    const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('escola_id', escola_id)
        .order('data_atualizacao', { ascending: false });

    if (error) {
        console.error("Erro Supabase (get documentos by escola):", error);
        throw new Error(`Erro ao buscar os documentos da escola: ${error.message}`);
    }
    return data.map(_mapToDocumentoInstance);
}

/**
 * Busca todos os documentos de uma oficina específica.
 * @param {number} oficina_id - O ID da oficina para a qual os documentos serão buscados.
 * @returns {Promise<Documento[]>} Uma lista de instâncias de Documento.
 */
export async function getDocumentosByOficina(oficina_id) {
    const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('oficina_id', oficina_id)
        .order('data_atualizacao', { ascending: false });

    if (error) {
        console.error("Erro Supabase (get documentos by oficina):", error);
        throw new Error(`Erro ao buscar os documentos da oficina: ${error.message}`);
    }
    return data.map(_mapToDocumentoInstance);
}

/**
 * Busca um documento específico pelo seu ID.
 * @param {number} id - O ID do documento a ser buscado.
 * @returns {Promise<Documento>} A instância do documento encontrado.
 */
export async function getDocumentoById(id) {
    const { data, error } = await supabase
        .from('documentos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Erro Supabase (get documento by id):", error);
        throw new Error(`Erro ao buscar o documento: ${error.message}`);
    }
    return _mapToDocumentoInstance(data);
}


/**
 * Cria um novo documento no banco de dados.
 * @param {object} documentoData - Os dados do novo documento. Deve incluir 'escola_id' ou 'oficina_id'.
 * @returns {Promise<Documento>} A instância do documento recém-criado.
 */
export async function createDocumento(documentoData) {
    if (!documentoData.escola_id && !documentoData.oficina_id) {
        throw new Error("O documento deve estar associado a um 'escola_id' ou 'oficina_id'.");
    }

    const { data, error } = await supabase
        .from('documentos')
        .insert([documentoData])
        .select()
        .single(); // Retorna o objeto recém-criado

    if (error) {
        console.error("Erro Supabase (create documento):", error);
        throw new Error(`Erro ao criar o documento: ${error.message}`);
    }
    return _mapToDocumentoInstance(data);
}

/**
 * ATUALIZA um documento existente no banco de dados.
 * @param {number} id - O ID do documento a ser atualizado.
 * @param {object} documentoData - Os novos dados para o documento.
 * @returns {Promise<Documento>} A instância do documento atualizado.
 */
export async function updateDocumento(id, documentoData) {
    // Adiciona a data de atualização automaticamente
    documentoData.data_atualizacao = new Date().toISOString();

    const { data, error } = await supabase
        .from('documentos')
        .update(documentoData)
        .eq('id', id)
        .select()
        .single(); // Retorna o objeto atualizado

    if (error) {
        console.error("Erro Supabase (update documento):", error);
        throw new Error(`Erro ao atualizar o documento: ${error.message}`);
    }
    return _mapToDocumentoInstance(data);
}

/**
 * DELETA um documento do banco de dados.
 * @param {number} id - O ID do documento a ser deletado.
 * @returns {Promise<void>}
 */
export async function deleteDocumento(id) {
    const { error } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro Supabase (delete documento):", error);
        throw new Error(`Erro ao deletar o documento: ${error.message}`);
    }
    // A operação de delete não retorna conteúdo em caso de sucesso.
}