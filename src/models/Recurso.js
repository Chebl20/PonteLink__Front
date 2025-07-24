export class Recurso {
    /**
     * @param {object} params - Os parâmetros para criar um recurso.
     * @param {number | null} params.id - O ID do recurso.
     * @param {number} params.escola_id - O ID da escola à qual o recurso pertence.
     * @param {string} params.tipo_recurso - O tipo do recurso (ex: 'Sala de Aula', 'Laboratório', 'Projetor').
     * @param {number | null} params.capacidade_sala - A capacidade da sala, se aplicável.
     * @param {string | null} params.tipo_acesso_internet - O tipo de acesso à internet ('wifi', 'movel', 'cabeada', 'nenhum').
     * @param {string | null} params.descricao - Uma descrição adicional sobre o recurso.
     */
    constructor({
        id = null,
        escola_id,
        tipo_recurso,
        capacidade_sala = null,
        tipo_acesso_internet = null,
        descricao = null,
        created_at = null
    }) {
        // Validação básica para campos obrigatórios
        if (!escola_id || !tipo_recurso) {
            throw new Error("Os campos 'escola_id' e 'tipo_recurso' são obrigatórios.");
        }

        this.id = id;
        this.escola_id = escola_id;
        this.tipo_recurso = tipo_recurso;
        this.capacidade_sala = capacidade_sala;
        this.tipo_acesso_internet = tipo_acesso_internet;
        this.descricao = descricao;
        this.created_at = created_at;
    }
}