import { useState, useEffect, useCallback } from 'react';
import { getOficinasByEscola, createOficina, updateOficina, deleteOficina } from '../services/oficinaService.js';

export function useOficinas(escola_id) {
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOficinas = useCallback(async () => {
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id]);

    useEffect(() => {
        fetchOficinas();
    }, [fetchOficinas]);

    const addOficina = async (oficinaData) => {
        await createOficina({ ...oficinaData, escola_id });
        await fetchOficinas();
    };

    const editOficina = async (id, oficinaData) => {
        await updateOficina(id, oficinaData);
        await fetchOficinas();
    };

    const removeOficina = async (id) => {
        await deleteOficina(id);
        setOficinas(currentOficinas => currentOficinas.filter(oficina => oficina.id !== id));
    };

    return {
        oficinas,
        loading,
        error,
        addOficina,
        editOficina,
        removeOficina,
        fetchOficinas,
    };
}