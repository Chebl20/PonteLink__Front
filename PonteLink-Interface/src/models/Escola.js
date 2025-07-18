import { Endereco } from './Endereco.js';

/**
 * Representa a estrutura de dados de uma Escola, agora com um endereço estruturado.
 */
export class Escola {
    /**
     * @param {object} params - Os parâmetros para criar uma escola.
     * @param {number | null} params.id - O ID da escola.
     * @param {string} params.nome - O nome da escola.
     * @param {Endereco | null} params.endereco - O objeto de endereço da escola.
     * @param {string | null} params.nome_diretor - O nome do diretor.
     * @param {string | null} params.contato_telefone - O telefone de contato.
     * @param {string | null} params.contato_email - O email de contato.
     * @param {string | null} params.nome_mediador - O nome do mediador.
     */
    constructor({
        id = null,
        nome,
        endereco = null,
        nome_diretor = null,
        contato_telefone = null,
        contato_email = null,
        nome_mediador = null
    }) {
        if (!nome) {
            throw new Error("O campo 'nome' é obrigatório para criar uma escola.");
        }

        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.nome_diretor = nome_diretor;
        this.contato_telefone = contato_telefone;
        this.contato_email = contato_email;
        this.nome_mediador = nome_mediador;
    }
}