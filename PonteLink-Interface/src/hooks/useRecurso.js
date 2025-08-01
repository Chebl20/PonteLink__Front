// src/hooks/useRecursos.js

import { useState, useEffect, useCallback } from 'react';
import {
    getAllRecursos, // Alterado: Importa a função para buscar todos os recursos
    createRecurso,
    updateRecurso,
    deleteRecurso
} from '../services/recursoService.js'; // Verifique se o caminho está correto

/**
 * Um hook React para gerenciar todos os recursos (salas, laboratórios, etc.) da aplicação.
 * Esta versão busca todos os recursos, independentemente da escola.
 */
export function useRecursos() {
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true); // Inicia como true para a busca inicial
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    /**
     * Busca a lista de todos os recursos do serviço e atualiza o estado.
     */
    const fetchRecursos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllRecursos(); // Alterado: Usa a função que busca todos os recursos
            setRecursos(data);
        } catch (err) {
            console.error("Falha ao buscar todos os recursos:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []); // <-- O array de dependências está vazio, pois não depende de nenhum parâmetro.

    // Efeito para buscar os dados uma vez, quando o componente que usa o hook for montado.
    useEffect(() => {
        fetchRecursos();
    }, [fetchRecursos]);

    /**
     * Adiciona um novo recurso e atualiza a lista.
     * @param {object} recursoData - Os dados do recurso a ser criado.
     */
    const addRecurso = async (recursoData) => {
        try {
            await createRecurso(recursoData);
            await fetchRecursos(); // Re-busca a lista completa para incluir o novo recurso.
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
            await fetchRecursos(); // Re-busca a lista completa para refletir as alterações.
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
        const backupRecursos = [...recursos]; // Guarda o estado atual para rollback em caso de erro
        try {
            // Atualização otimista da UI para uma resposta mais rápida
            setRecursos(currentRecursos => currentRecursos.filter(recurso => recurso.id !== id));
            await deleteRecurso(id);
        } catch (err) {
            console.error("Falha ao remover recurso:", err);
            // Se der erro, restaura a lista e re-busca do servidor para garantir consistência.
            setRecursos(backupRecursos);
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
