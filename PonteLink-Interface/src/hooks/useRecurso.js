// src/hooks/useRecursos.js

import { useState, useEffect, useCallback } from 'react';
import { getRecursosByEscola, createRecurso, updateRecurso, deleteRecurso } from '../services/recursoService.js';

export function useRecursos(escola_id) {
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecursos = useCallback(async () => {
        if (!escola_id) {
            setRecursos([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await getRecursosByEscola(escola_id);
            setRecursos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escola_id]);

    useEffect(() => {
        fetchRecursos();
    }, [fetchRecursos]);

    const addRecurso = async (recursoData) => {
        // Garante que o recurso seja associado à escola correta
        await createRecurso({ ...recursoData, escola_id });
        await fetchRecursos();
    };

    const editRecurso = async (id, recursoData) => {
        await updateRecurso(id, recursoData);
        await fetchRecursos();
    };

    const removeRecurso = async (id) => {
        await deleteRecurso(id);
        setRecursos(currentRecursos => currentRecursos.filter(rec => rec.id !== id));
    };

    return {
        recursos,
        loading,
        error,
        addRecurso,
        editRecurso,
        removeRecurso,
        fetchRecursos, // Para refresh manual
    };
}