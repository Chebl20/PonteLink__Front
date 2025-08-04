import { useState, useEffect, useCallback } from 'react';
import { getTurmasByEscola, createTurma, updateTurma, deleteTurma } from '../services/turmaService';

export const useTurmas = (escolaId) => {
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchTurmas = useCallback(async () => {
        if (!escolaId) {
            setTurmas([]);
            return;
        }
        setLoading(true);
        try {
            const data = await getTurmasByEscola(escolaId);
            setTurmas(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [escolaId]);

    useEffect(() => {
        fetchTurmas();
    }, [fetchTurmas]);

    const addTurma = async (turma) => {
        try {
            const novaTurma = await createTurma(turma);
            setTurmas([...turmas, ...novaTurma]);
        } catch (err) {
            setError(err.message);
        }
    };

    const editTurma = async (id, turma) => {
        try {
            const turmaAtualizada = await updateTurma(id, turma);
            setTurmas(turmas.map(t => (t.id === id ? turmaAtualizada[0] : t)));
        } catch (err) {
            setError(err.message);
        }
    };

    const removeTurma = async (id) => {
        try {
            await deleteTurma(id);
            setTurmas(turmas.filter(t => t.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return { turmas, loading, error, addTurma, editTurma, removeTurma, showModal, setShowModal };
};
