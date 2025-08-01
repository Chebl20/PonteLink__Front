import { useState, useEffect, useCallback } from 'react';
import {
    getDocumentosByEscola,
    getDocumentosByOficina,
    createDocumento,
    updateDocumento,
    deleteDocumento
} from '../services/documentoService.js';

/**
 * Hook para gerenciar documentos, filtrando por escola ou oficina.
 * @param {{escola_id?: number, oficina_id?: number}} filters - Os filtros a serem aplicados.
 */
export function useDocumentos({ escola_id, oficina_id }) {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Adicionado para consistência

    const fetchDocumentos = useCallback(async () => {
        // Só busca se um dos IDs for fornecido
        if (!escola_id && !oficina_id) {
            setDocumentos([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            let data = [];
            if (oficina_id) {
                data = await getDocumentosByOficina(oficina_id);
            } else if (escola_id) {
                data = await getDocumentosByEscola(escola_id);
            }
            setDocumentos(data);
        } catch (err) {
            console.error("Falha ao buscar documentos:", err); // Log de erro adicionado
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id, oficina_id]);

    useEffect(() => {
        fetchDocumentos();
    }, [fetchDocumentos]);

    /**
     * Adiciona um novo documento e atualiza a lista.
     * @param {object} documentoData - Os dados do documento a ser criado.
     */
    const addDocumento = async (documentoData) => {
        try {
            // Garante que o ID do contexto (escola ou oficina) seja adicionado
            const dataToCreate = { ...documentoData };
            if (oficina_id) {
                dataToCreate.oficina_id = oficina_id;
            } else if (escola_id) {
                dataToCreate.escola_id = escola_id;
            }

            await createDocumento(dataToCreate);
            await fetchDocumentos(); // Re-busca a lista
        } catch (err) {
            console.error("Falha ao adicionar documento:", err);
            throw err; // Propaga o erro para a UI
        }
    };

    /**
     * Edita um documento existente e atualiza a lista.
     * @param {number} id - O ID do documento a ser editado.
     * @param {object} documentoData - Os novos dados do documento.
     */
    const editDocumento = async (id, documentoData) => {
        try {
            await updateDocumento(id, documentoData);
            await fetchDocumentos(); // Re-busca para refletir as alterações
        } catch (err) {
            console.error("Falha ao editar documento:", err);
            throw err;
        }
    };

    /**
     * Remove um documento com atualização otimista da UI.
     * @param {number} id - O ID do documento a ser removido.
     */
    const removeDocumento = async (id) => {
        try {
            // Atualização otimista da UI para resposta rápida
            setDocumentos(currentDocs => currentDocs.filter(doc => doc.id !== id));
            await deleteDocumento(id);
        } catch (err) {
            console.error("Falha ao remover documento:", err);
            // Reverte a alteração na UI se a API falhar
            await fetchDocumentos();
            throw err;
        }
    };

    return {
        documentos,
        loading,
        error,
        addDocumento,
        editDocumento,
        removeDocumento,
        fetchDocumentos,
        showModal,      // Adicionado
        setShowModal,   // Adicionado
    };
}