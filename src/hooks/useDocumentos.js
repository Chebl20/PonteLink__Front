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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id, oficina_id]);

    useEffect(() => {
        fetchDocumentos();
    }, [fetchDocumentos]);

    const addDocumento = async (documentoData) => {
        // Garante que o ID do contexto (escola ou oficina) seja adicionado
        const dataToCreate = { ...documentoData };
        if (oficina_id) dataToCreate.oficina_id = oficina_id;
        else if (escola_id) dataToCreate.escola_id = escola_id;

        await createDocumento(dataToCreate);
        await fetchDocumentos();
    };

    const editDocumento = async (id, documentoData) => {
        await updateDocumento(id, documentoData);
        await fetchDocumentos();
    };

    const removeDocumento = async (id) => {
        await deleteDocumento(id);
        setDocumentos(currentDocs => currentDocs.filter(doc => doc.id !== id));
    };

    return {
        documentos,
        loading,
        error,
        addDocumento,
        editDocumento,
        removeDocumento,
        fetchDocumentos,
    };
}