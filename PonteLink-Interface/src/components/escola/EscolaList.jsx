import React from 'react';
import '../../styles/escolas.css';

const EscolaList = ({ escolas, onEdit, onDelete, onViewDetails }) => {
    // Função para formatar o endereço
    const formatEndereco = (endereco) => {
        if (!endereco) return 'Endereço não informado';
        return `${endereco.logradouro}, ${endereco.numero} ${endereco.complemento || ''} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, CEP: ${endereco.cep}`;
    };

    return (
        <div>
            <div className="header-escolas">
                <h2>Lista de Escolas</h2>
            </div>

            
<div className="table-container">
    <table className="escolas-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Diretor</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Mediador</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {escolas.map((escola) => (
                <tr key={escola.id}>
                    <td>{escola.nome}</td>
                    <td>{formatEndereco(escola.endereco)}</td>
                    <td>{escola.nome_diretor || '-'}</td>
                    <td>{escola.contato_telefone || '-'}</td>
                    <td>{escola.contato_email || '-'}</td>
                    <td>{escola.nome_mediador || '-'}</td>
                    <td className="actions-cell">
                        <div className="actions-buttons">
                            <button className="btn-action btn-editar" onClick={() => onEdit(escola)}>
                                Editar
                            </button>
                            <button className="btn-action btn-detalhes" onClick={() => onViewDetails(escola)}>
                                Detalhes
                            </button>
                            <button className="btn-action btn-remover" onClick={() => onDelete(escola.id)}>
                                Remover
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        </div>
    );
};

export default EscolaList;
