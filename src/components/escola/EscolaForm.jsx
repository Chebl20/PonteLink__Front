import React, { useRef } from 'react';
import '../../styles/escolas.css';

const EscolaForm = ({ onClose, onSubmit, escolaAtual }) => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        // --- INÍCIO DA CORREÇÃO ---

        // 1. Converte o FormData em um objeto JavaScript simples e estruturado.
        const dadosEscola = {};
        const endereco = {};

        for (const [key, value] of formData.entries()) {
            if (key.startsWith('endereco_')) {
                // Se a chave começa com 'endereco_', remove o prefixo e adiciona ao objeto de endereço
                const enderecoKey = key.replace('endereco_', '');
                endereco[enderecoKey] = value;
            } else {
                // Caso contrário, adiciona ao objeto principal da escola
                dadosEscola[key] = value;
            }
        }

        // 2. Aninha o objeto de endereço dentro do objeto principal da escola
        // Apenas se houver algum campo de endereço preenchido
        if (Object.keys(endereco).length > 0) {
            dadosEscola.endereco = endereco;
        }

        // 3. Envia o objeto JavaScript CORRETO para a função onSubmit
        onSubmit(dadosEscola);

        // --- FIM DA CORREÇÃO ---
    };

    const isEditing = !!escolaAtual;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="escolas-table form-container" onClick={(e) => e.stopPropagation()}>
                <div className="header-escolas">
                    <h2>{isEditing ? 'Editar Escola' : 'Adicionar Nova Escola'}</h2>
                    <button className="close-button" onClick={onClose} aria-label="Fechar modal">&times;</button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="form-grid" autoComplete="off">
                    {/* Dados da Escola */}
                    <div className="form-group span-2">
                        <label htmlFor="nome">Nome da Escola</label>
                        <input
                            type="text"
                            name="nome" // O atributo 'name' é crucial para o FormData
                            id="nome"
                            className="search-input"
                            defaultValue={escolaAtual?.nome || ''}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Nome do Diretor(a)</label>
                        <input name="nome_diretor" className="search-input" defaultValue={escolaAtual?.nome_diretor || ''} />
                    </div>

                    <div className="form-group">
                        <label>Nome do Mediador(a)</label>
                        <input name="nome_mediador" className="search-input" defaultValue={escolaAtual?.nome_mediador || ''} />
                    </div>

                    <div className="form-group">
                        <label>Telefone de Contato</label>
                        <input name="contato_telefone" className="search-input" defaultValue={escolaAtual?.contato_telefone || ''} />
                    </div>

                    <div className="form-group">
                        <label>Email de Contato</label>
                        <input type="email" name="contato_email" className="search-input" defaultValue={escolaAtual?.contato_email || ''} />
                    </div>

                    {/* Endereço */}
                    <h3 className="form-section-header span-2">Endereço</h3>

                    <div className="form-group span-2">
                        <label>Logradouro (Rua, Av.)</label>
                        <input name="endereco_logradouro" className="search-input" defaultValue={escolaAtual?.endereco?.logradouro || ''} required />
                    </div>

                    <div className="form-group">
                        <label>Número</label>
                        <input name="endereco_numero" className="search-input" defaultValue={escolaAtual?.endereco?.numero || ''} />
                    </div>

                    <div className="form-group">
                        <label>Complemento</label>
                        <input name="endereco_complemento" className="search-input" defaultValue={escolaAtual?.endereco?.complemento || ''} />
                    </div>

                    <div className="form-group">
                        <label>Bairro</label>
                        <input name="endereco_bairro" className="search-input" defaultValue={escolaAtual?.endereco?.bairro || ''} required />
                    </div>

                    <div className="form-group">
                        <label>CEP</label>
                        <input name="endereco_cep" className="search-input" defaultValue={escolaAtual?.endereco?.cep || ''} required />
                    </div>

                    <div className="form-group">
                        <label>Cidade</label>
                        <input name="endereco_cidade" className="search-input" defaultValue={escolaAtual?.endereco?.cidade || ''} required />
                    </div>

                    <div className="form-group">
                        <label>Estado (UF)</label>
                        <input name="endereco_estado" className="search-input" defaultValue={escolaAtual?.endereco?.estado || ''} required maxLength={2} />
                    </div>

                    <div className="form-actions span-2">
                        <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-purple">
                            {isEditing ? 'Salvar Alterações' : 'Adicionar Escola'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EscolaForm;
