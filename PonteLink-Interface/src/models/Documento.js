export class Documento {
    /**
     * @param {object} params - Os parâmetros para criar um documento.
     * @param {number | null} params.id - O ID do documento.
     * @param {number | null} params.escola_id - O ID da escola associada (opcional).
     * @param {number | null} params.oficina_id - O ID da oficina associada (opcional).
     * @param {string} params.tipo_documento - O tipo do documento (ex: 'Lista de Presença').
     * @param {string} [params.status='pendente'] - O status do documento ('pendente', 'enviado', 'aguardando_retorno', 'concluido').
     * @param {number} [params.quantidade_enviada=0] - Quantidade de itens enviados.
     * @param {number} [params.quantidade_recebida=0] - Quantidade de itens recebidos.
     * @param {string | null} [params.data_atualizacao=null] - Data de última atualização (formato ISO).
     */
    constructor({
        id = null,
        escola_id = null,
        oficina_id = null,
        tipo_documento,
        status = 'pendente',
        quantidade_enviada = 0,
        quantidade_recebida = 0,
        data_atualizacao = null
    }) {
        if (!tipo_documento) {
            throw new Error("O campo 'tipo_documento' é obrigatório.");
        }

        if (!escola_id && !oficina_id) {
            throw new Error("O documento deve estar associado a uma escola (escola_id) ou a uma oficina (oficina_id).");
        }

        this.id = id;
        this.escola_id = escola_id;
        this.oficina_id = oficina_id;
        this.tipo_documento = tipo_documento;
        this.status = status;
        this.quantidade_enviada = quantidade_enviada;
        this.quantidade_recebida = quantidade_recebida;
        this.data_atualizacao = data_atualizacao;
    }
}
