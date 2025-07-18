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
                            <td>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    <button className="btn-editar" onClick={() => onEdit(escola)}>Editar</button>
                                    <button className="btn-detalhes" onClick={() => onViewDetails(escola)}>Detalhes</button>
                                    <button
                                        className="btn-editar"
                                        style={{ background: '#fecaca', color: '#991b1b' }}
                                        onClick={() => onDelete(escola.id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EscolaList;
