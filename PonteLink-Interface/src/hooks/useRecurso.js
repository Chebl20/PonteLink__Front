// src/hooks/useRecursos.js

import { useState, useEffect, useCallback } from 'react';
import {
    getRecursosByEscola,
    createRecurso,
    updateRecurso,
    deleteRecurso
} from '../services/recursoService.js'; // Verifique se o caminho está correto

/**
 * Um hook React para gerenciar os recursos (salas, laboratórios, etc.) de uma escola específica.
 * @param {number | string | null} escola_id - O ID da escola para a qual os recursos serão buscados.
 * O hook só tentará buscar dados se o escola_id for fornecido.
 */
export function useRecursos(escola_id) {
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(false); // Inicia como false, pois depende do ID
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    /**
     * Busca a lista de recursos do serviço e atualiza o estado.
     * Esta função agora DEPENDE do `escola_id`.
     */
    const fetchRecursos = useCallback(async () => {
        // Ponto chave: Não faz nada se o ID da escola não for fornecido.
        // Isso evita erros quando o componente pai ainda não tem o ID.
        if (!escola_id) {
            setRecursos([]); // Garante que a lista fique vazia se o id for nulo
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await getRecursosByEscola(escola_id);
            setRecursos(data);
        } catch (err) {
            console.error(`Falha ao buscar recursos para a escola ${escola_id}:`, err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id]); // <<< O `escola_id` agora é uma dependência!

    // Efeito para buscar os dados sempre que o `escola_id` mudar.
    useEffect(() => {
        fetchRecursos();
    }, [fetchRecursos]); // `fetchRecursos` é recriado quando `escola_id` muda, disparando este efeito.

    /**
     * Adiciona um novo recurso e atualiza a lista.
     * @param {object} recursoData - Os dados do recurso a ser criado.
     */
    const addRecurso = async (recursoData) => {
        try {
            // Garante que o recurso criado tenha a associação correta com a escola.
            const dataToCreate = { ...recursoData, escola_id: escola_id };
            await createRecurso(dataToCreate);
            await fetchRecursos(); // Re-busca a lista para incluir o novo recurso.
        } catch (err) {
            console.error("Falha ao adicionar recurso:", err);
            throw err;
        }
    };

    /**
     * Edita um recurso existente.
     * @param {number} id - O ID do recurso a ser editado.
     * @param {object} recursoData - Os novos dados do recurso.
     */
    const editRecurso = async (id, recursoData) => {
        try {
            await updateRecurso(id, recursoData);
            await fetchRecursos(); // Re-busca a lista para refletir as alterações.
        } catch (err) {
            console.error("Falha ao editar recurso:", err);
            throw err;
        }
    };

    /**
     * Remove um recurso.
     * @param {number} id - O ID do recurso a ser removido.
     */
    const removeRecurso = async (id) => {
        try {
            // Atualização otimista da UI
            setRecursos(currentRecursos => currentRecursos.filter(recurso => recurso.id !== id));
            await deleteRecurso(id);
        } catch (err) {
            console.error("Falha ao remover recurso:", err);
            // Se der erro, re-busca a lista do servidor para garantir consistência.
            await fetchRecursos();
            throw err;
        }
    };

    return {
        recursos,
        loading,
        error,
        addRecurso,
        editRecurso,
        removeRecurso,
        fetchRecursos, // Exporta para re-busca manual, se necessário
        showModal,
        setShowModal,
    };
}