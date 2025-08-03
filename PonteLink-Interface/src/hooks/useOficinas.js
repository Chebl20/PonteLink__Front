import { useState, useEffect, useCallback } from 'react';
import { getOficinasByEscola, createOficina, updateOficina, deleteOficina } from '../services/oficinaService.js';

export function useOficinas(escola_id) {
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Adicionado para consistência

    const fetchOficinas = useCallback(async () => {
        // Mantém a lógica de não buscar se não houver escola_id
        if (!escola_id) {
            setOficinas([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await getOficinasByEscola(escola_id);
            setOficinas(data);
        } catch (err) {
            console.error("Falha ao buscar oficinas:", err); // Log de erro adicionado
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id]); // A dependência de escola_id é mantida e está correta

    useEffect(() => {
        fetchOficinas();
    }, [fetchOficinas]);

    /**
     * Adiciona uma nova oficina e atualiza a lista.
     * @param {object} oficinaData - Os dados da oficina a ser criada.
     */
    const addOficina = async (oficinaData) => {
        try {
            // Garante que a oficina seja associada à escola correta
            await createOficina({ ...oficinaData, escola_id });
            await fetchOficinas(); // Re-busca a lista para incluir a nova oficina
        } catch (err) {
            console.error("Falha ao adicionar oficina:", err);
            // Propaga o erro para a UI poder reagir (ex: mostrar notificação)
            throw err;
        }
    };

    /**
     * Edita uma oficina existente e atualiza a lista.
     * @param {number} id - O ID da oficina a ser editada.
     * @param {object} oficinaData - Os novos dados da oficina.
     */
    const editOficina = async (id, oficinaData) => {
        try {
            await updateOficina(id, oficinaData);
            await fetchOficinas(); // Re-busca a lista para refletir as alterações
        } catch (err) {
            console.error("Falha ao editar oficina:", err);
            throw err;
        }
    };

    /**
     * Remove uma oficina e atualiza a lista localmente para uma resposta rápida da UI.
     * @param {number} id - O ID da oficina a ser removida.
     */
    const removeOficina = async (id) => {
        try {
            // Atualiza a UI primeiro para uma experiência mais fluida (otimista)
            setOficinas(currentOficinas => currentOficinas.filter(oficina => oficina.id !== id));
            await deleteOficina(id);
        } catch (err) {
            console.error("Falha ao remover oficina:", err);
            // Se der erro, re-busca a lista do servidor para garantir consistência
            await fetchOficinas();
            throw err;
        }
    };

    return {
        oficinas,
        loading,
        error,
        addOficina,
        editOficina,
        removeOficina,
        fetchOficinas,
        showModal,      // Adicionado
        setShowModal,   // Adicionado
    };
}