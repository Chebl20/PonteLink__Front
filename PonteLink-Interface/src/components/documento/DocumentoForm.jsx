// DocumentoForm.jsx
import React, { useRef } from 'react';
import '../../styles/documentos.css';

const DocumentoForm = ({ onClose, onSubmit, documentoAtual }) => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        data.quantidade_enviada = parseInt(data.quantidade_enviada || 0);
        data.quantidade_recebida = parseInt(data.quantidade_recebida || 0);
        onSubmit(data);
    };

    const isEditing = !!documentoAtual;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal wide" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isEditing ? 'Editar Documento' : 'Novo Documento'}</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
                    <label>Tipo de Documento</label>
                    <input
                        name="tipo_documento"
                        defaultValue={documentoAtual?.tipo_documento || ''}
                        required
                    />

                    <label>Status</label>
                    <select name="status" defaultValue={documentoAtual?.status || 'pendente'}>
                        <option value="pendente">Pendente</option>
                        <option value="enviado">Enviado</option>
                        <option value="aguardando_retorno">Aguardando Retorno</option>
                        <option value="concluido">Concluído</option>
                    </select>

                    <label>Quantidade Enviada</label>
                    <input
                        name="quantidade_enviada"
                        type="number"
                        defaultValue={documentoAtual?.quantidade_enviada || 0}
                    />

                    <label>Quantidade Recebida</label>
                    <input
                        name="quantidade_recebida"
                        type="number"
                        defaultValue={documentoAtual?.quantidade_recebida || 0}
                    />

                    <div className="modal-buttons">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-purple">
                            {isEditing ? 'Salvar Alterações' : 'Cadastrar Documento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentoForm;
