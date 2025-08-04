import { supabase } from "../supaBaseClient";

export const getTurmas = async () => {
    const { data, error } = await supabase.from('turmas').select('*');
    if (error) throw error;
    return data;
};

export const getTurmasByEscola = async (escolaId) => {
    const { data, error } = await supabase
        .from('turmas')
        .select('*')
        .eq('escola_id', escolaId);

    if (error) {
        console.error('Erro ao buscar turmas por escola:', error);
        throw error;
    }

    return data;
};

export const getTurma = async (id) => {
    const { data, error } = await supabase.from('turmas').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const createTurma = async (turma) => {
    const { data, error } = await supabase.from('turmas').insert([turma]).select();
    if (error) throw error;
    return data;
};

export const updateTurma = async (id, turma) => {
    const { data, error } = await supabase.from('turmas').update(turma).eq('id', id).select();
    if (error) throw error;
    return data;
};

export const deleteTurma = async (id) => {
    const { error } = await supabase.from('turmas').delete().eq('id', id);
    if (error) throw error;
};
