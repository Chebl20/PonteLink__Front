export class Endereco {
    /**
     * @param {object} params - Os parâmetros para criar um endereço.
     * @param {number | null} params.id - O ID do endereço (PK).
     * @param {number} params.escola_id - O ID da escola à qual o endereço pertence (FK).
     * @param {string} params.logradouro - O nome da rua, avenida, etc.
     * @param {string} params.bairro - O nome do bairro.
     * @param {string} params.cidade - O nome da cidade.
     * @param {string} params.estado - A sigla do estado (ex: 'MA').
     * @param {string} params.cep - O Código de Endereçamento Postal (ex: '65000-000').
     * @param {string | null} params.numero - O número do imóvel.
     * @param {string | null} params.complemento - Informações adicionais (bloco, apartamento, etc.).
     */
    constructor({
        id = null,
        escola_id,
        logradouro,
        bairro,
        cidade,
        estado,
        cep,
        numero = null,
        complemento = null
    }) {
        // Validação para garantir que os campos essenciais foram fornecidos
        if (!escola_id || !logradouro || !bairro || !cidade || !estado || !cep) {
            throw new Error("Os campos 'escola_id', 'logradouro', 'bairro', 'cidade', 'estado' e 'cep' são obrigatórios para um endereço.");
        }

        this.id = id;
        this.escola_id = escola_id;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
}