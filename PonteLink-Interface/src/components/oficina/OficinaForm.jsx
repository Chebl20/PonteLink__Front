// OficinaForm.jsx
import React, { useRef } from 'react';
import '../../styles/oficinas.css';

const OficinaForm = ({ onClose, onSubmit, oficinaAtual }) => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        onSubmit(data);
    };

    const isEditing = !!oficinaAtual;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal wide" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{isEditing ? 'Editar Oficina' : 'Nova Oficina'}</h3>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
                    <label>Tema da Oficina</label>
                    <input name="tema_oficina" defaultValue={oficinaAtual?.tema_oficina || ''} required />

                    <label>Data e Hora</label>
                    <input name="data_hora" type="datetime-local" defaultValue={oficinaAtual?.data_hora || ''} required />

                    <label>Grupo - Identificador</label>
                    <input name="grupo_trabalho_identificador" defaultValue={oficinaAtual?.grupo_trabalho_identificador || ''} />

                    <label>Grupo - Nome</label>
                    <input name="grupo_trabalho_nome" defaultValue={oficinaAtual?.grupo_trabalho_nome || ''} />

                    <label>Grupo - Líder</label>
                    <input name="grupo_trabalho_lider" defaultValue={oficinaAtual?.grupo_trabalho_lider || ''} />

                    <label>Semestre</label>
                    <input name="semestre" defaultValue={oficinaAtual?.semestre || ''} />

                    <label>Descrição</label>
                    <textarea name="descricao" defaultValue={oficinaAtual?.descricao || ''}></textarea>

                    <label>Ano Escolar Alvo</label>
                    <input name="ano_escolar_alvo" defaultValue={oficinaAtual?.ano_escolar_alvo || ''} />

                    <label>Turma Alvo</label>
                    <input name="turma_alvo" defaultValue={oficinaAtual?.turma_alvo || ''} />

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-purple">
                            {isEditing ? 'Salvar Alterações' : 'Cadastrar Oficina'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OficinaForm;
