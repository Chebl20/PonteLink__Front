// OficinaDetalhes.jsx
import '../../styles/detalhes.css';

const OficinaDetalhes = ({ oficina, onClose }) => {
    if (!oficina) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="detalhes-container" onClick={(e) => e.stopPropagation()}>
                <div className="detalhes-header">
                    <h2>{oficina.tema_oficina}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="detalhes-body">
                    <div className="detalhes-section">
                        <h3>Informações Gerais</h3>
                        <p><strong>Data/Hora:</strong> {new Date(oficina.data_hora).toLocaleString()}</p>
                        <p><strong>Semestre:</strong> {oficina.semestre || '-'}</p>
                        <p><strong>Ano Escolar Alvo:</strong> {oficina.ano_escolar_alvo || '-'}</p>
                        <p><strong>Turma Alvo:</strong> {oficina.turma_alvo || '-'}</p>
                    </div>

                    <div className="detalhes-section">
                        <h3>Grupo de Trabalho</h3>
                        <p><strong>Identificador:</strong> {oficina.grupo_trabalho_identificador || '-'}</p>
                        <p><strong>Nome:</strong> {oficina.grupo_trabalho_nome || '-'}</p>
                        <p><strong>Líder:</strong> {oficina.grupo_trabalho_lider || '-'}</p>
                    </div>

                    <div className="detalhes-section">
                        <h3>Descrição</h3>
                        <p>{oficina.descricao || 'Sem descrição fornecida.'}</p>
                    </div>
                </div>

                <div className="detalhes-footer">
                    <button className="btn-cancelar" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default OficinaDetalhes;
