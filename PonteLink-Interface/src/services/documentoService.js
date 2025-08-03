import { supabase } from '../supaBaseClient.jsx';
import { Documento } from '../models/Documento.js';

/**
 * Função auxiliar para mapear dados do DB para uma instância de Documento.
 */
function _mapToDocumentoInstance(dbData) {
    if (!dbData) return null;
    return new Documento(dbData);
}

/**
 * Busca todos os documentos com filtros opcionais.
 * @param {object} filters - Opções de filtro.
 * @param {string} filters.select - Colunas a retornar.
 * @param {number} filters.escola_id - Filtrar por ID da escola.
 * @param {number} filters.oficina_id - Filtrar por ID da oficina.
 * @param {string} filters.tipo_documento - Filtrar por tipo de documento.
 * @param {string} filters.status - Filtrar por status.
 * @param {string} filters.order - Ordenação (ex: "data_atualizacao.desc").
 * @param {number} filters.limit - Limite de resultados.
 * @param {number} filters.offset - Paginação.
 */
export async function getAllDocumentos(filters = {}) {
    let query = supabase.from('documentos').select(filters.select || '*');

    if (filters.escola_id) {
        query = query.eq('escola_id', filters.escola_id);
    }
    if (filters.oficina_id) {
        query = query.eq('oficina_id', filters.oficina_id);
    }
    if (filters.tipo_documento) {
        query = query.eq('tipo_documento', filters.tipo_documento);
    }
    if (filters.status) {
        query = query.eq('status', filters.status);
    }
    if (filters.order) {
        const [column, order] = filters.order.split('.');
        query = query.order(column, { ascending: order === 'asc' });
    }

    const limit = filters.limit || 10;
    const offset = filters.offset || 0;
    query = query.range(offset, offset + limit - 1);


    const { data, error } = await query;

    if (error) {
        console.error("Erro ao buscar documentos:", error);
        throw new Error("Não foi possível buscar os dados dos documentos.");
    }
    return data.map(_mapToDocumentoInstance);
}

/**
 * Cria um novo documento.
 * @param {object} documentoData - Dados do documento a ser criado.
 */
export async function createDocumento(documentoData) {
    const { data, error } = await supabase
        .from('documentos')
        .insert([documentoData])
        .select()
        .single();

    if (error) {
        console.error("Erro Supabase (create documento):", error);
        throw new Error(`Erro ao criar o documento: ${error.message}`);
    }

    return _mapToDocumentoInstance(data);
}

/**
 * Atualiza um documento existente.
 * @param {number} id - ID do documento a ser atualizado.
 * @param {object} documentoData - Dados a serem atualizados.
 */
export async function updateDocumento(id, documentoData) {
    const { data, error } = await supabase
        .from('documentos')
        .update(documentoData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Erro ao atualizar documento:", error);
        throw new Error(`Erro ao atualizar dados do documento: ${error.message}`);
    }

    return _mapToDocumentoInstance(data);
}

/**
 * Remove um documento.
 * @param {number} id - ID do documento a ser removido.
 */
export async function deleteDocumento(id) {
    const { error } = await supabase
        .from('documentos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Erro ao deletar documento:", error);
        throw new Error("Não foi possível deletar o documento.");
    }
    
    return true; // Retorna sucesso
}