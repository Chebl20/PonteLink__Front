import { useState, useEffect, useCallback } from 'react';
import {
    getAllEscolas,
    createEscola,
    updateEscola,
    deleteEscola
} from '../services/EscolaService.js'; // Verifique se o caminho está correto

export function useEscolas() {
    const [escolas, setEscolas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    /**
     * Busca a lista de escolas do serviço e atualiza o estado.
     */
    const fetchEscolas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllEscolas();
            setEscolas(data);
        } catch (err) {
            console.error("Falha ao buscar escolas:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []); // O array de dependências está vazio, pois não depende de props

    // Efeito para buscar os dados quando o hook for utilizado pela primeira vez
    useEffect(() => {
        fetchEscolas();
    }, [fetchEscolas]);

    /**
     * Adiciona uma nova escola e atualiza a lista.
     * @param {object} escolaData - Os dados da escola a ser criada.
     */
    const addEscola = async (escolaData) => {
        try {
            await createEscola(escolaData);
            await fetchEscolas(); // Re-busca a lista para incluir a nova escola
        } catch (err) {
            console.error("Falha ao adicionar escola:", err);
            // Opcional: propagar o erro para a UI
            throw err;
        }
    };

    /**
     * Edita uma escola existente e atualiza a lista.
     * @param {number} id - O ID da escola a ser editada.
     * @param {object} escolaData - Os novos dados da escola.
     */
    const editEscola = async (id, escolaData) => {
        try {
            await updateEscola(id, escolaData);
            await fetchEscolas(); // Re-busca a lista para refletir as alterações
        } catch (err) {
            console.error("Falha ao editar escola:", err);
            throw err;
        }
    };

    /**
     * Remove uma escola e atualiza a lista localmente para uma resposta rápida da UI.
     * @param {number} id - O ID da escola a ser removida.
     */
    const removeEscola = async (id) => {
        try {
            // Atualiza a UI primeiro para uma experiência mais fluida (otimista)
            setEscolas(currentEscolas => currentEscolas.filter(escola => escola.id !== id));
            await deleteEscola(id);
        } catch (err) {
            console.error("Falha ao remover escola:", err);
            // Se der erro, re-busca a lista do servidor para garantir consistência
            await fetchEscolas();
            throw err;
        }
    };

    return {
        escolas,
        loading,
        error,
        addEscola,
        editEscola,
        removeEscola,
        fetchEscolas, // Exporta a função de fetch para re-busca manual se necessário

        // ADICIONADO: Exporta o estado do modal e sua função de atualização
        showModal,
        setShowModal,
    };
}
