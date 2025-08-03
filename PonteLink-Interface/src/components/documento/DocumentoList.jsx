// DocumentoList.jsx
import React from 'react';
import '../../styles/documentos.css';

const DocumentoList = ({ documentos, onEdit, onDelete, onViewDetails }) => {
    const formatarStatus = (status) => {
        switch (status) {
            case 'pendente': return 'Pendente';
            case 'enviado': return 'Enviado';
            case 'aguardando_retorno': return 'Aguardando Retorno';
            case 'concluido': return 'Concluído';
            default: return status;
        }
    };

    return (
        <table className="documentos-table">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Qtd. Enviada</th>
                    <th>Qtd. Recebida</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {documentos.map((doc) => (
                    <tr key={doc.id}>
                        <td>{doc.tipo_documento}</td>
                        <td>{formatarStatus(doc.status)}</td>
                        <td>{doc.quantidade_enviada}</td>
                        <td>{doc.quantidade_recebida}</td>
                        <td>
                            <div className="actions-buttons">
                                <button className="btn-action btn-editar" onClick={() => onEdit(doc)}>Editar</button>
                                <button className="btn-action btn-detalhes" onClick={() => onViewDetails(doc)}>Detalhes</button>
                                <button className="btn-action btn-remover" onClick={() => onDelete(doc.id)}>Remover</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DocumentoList;
