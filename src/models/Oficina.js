export class Oficina {
    /**
     * @param {object} params - Os parâmetros para criar uma oficina.
     * @param {number | null} params.id - O ID da oficina.
     * @param {number} params.escola_id - O ID da escola à qual a oficina pertence.
     * @param {string} params.tema_oficina - O tema central da oficina.
     * @param {string} params.data_hora - A data e hora da realização da oficina (formato ISO).
     * @param {string | null} params.grupo_trabalho_identificador - Identificador do grupo de trabalho.
     * @param {string | null} params.grupo_trabalho_nome - Nome do grupo de trabalho.
     * @param {string | null} params.grupo_trabalho_lider - Nome do líder do grupo.
     * @param {string | null} params.semestre - O semestre em que a oficina ocorre.
     * @param {string | null} params.descricao - Descrição detalhada da oficina.
     * @param {string | null} params.ano_escolar_alvo - O ano escolar para o qual a oficina é destinada (ex: '9º Ano').
     * @param {string | null} params.turma_alvo - A turma específica para a qual a oficina é destinada (ex: 'Turma A').
     */
    constructor({
        id = null,
        escola_id,
        tema_oficina,
        data_hora,
        grupo_trabalho_identificador = null,
        grupo_trabalho_nome = null,
        grupo_trabalho_lider = null,
        semestre = null,
        descricao = null,
        ano_escolar_alvo = null,
        turma_alvo = null
    }) {
        // Validação dos campos obrigatórios
        if (!escola_id || !tema_oficina || !data_hora) {
            throw new Error("Os campos 'escola_id', 'tema_oficina' e 'data_hora' são obrigatórios.");
        }

        this.id = id;
        this.escola_id = escola_id;
        this.tema_oficina = tema_oficina;
        this.data_hora = data_hora;
        this.grupo_trabalho_identificador = grupo_trabalho_identificador;
        this.grupo_trabalho_nome = grupo_trabalho_nome;
        this.grupo_trabalho_lider = grupo_trabalho_lider;
        this.semestre = semestre;
        this.descricao = descricao;
        this.ano_escolar_alvo = ano_escolar_alvo;
        this.turma_alvo = turma_alvo;
    }
}