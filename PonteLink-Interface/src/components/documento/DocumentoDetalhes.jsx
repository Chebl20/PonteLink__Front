// DocumentoDetalhes.jsx
import '../../styles/detalhes.css';

const DocumentoDetalhes = ({ documento, onClose }) => {
    if (!documento) return null;

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
        <div className="modal-overlay" onClick={onClose}>
            <div className="detalhes-container" onClick={(e) => e.stopPropagation()}>
                <div className="detalhes-header">
                    <h2>{documento.tipo_documento}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="detalhes-body">
                    <div className="detalhes-section">
                        <h3>Informações do Documento</h3>
                        <p><strong>Status:</strong> {formatarStatus(documento.status)}</p>
                        <p><strong>Quantidade Enviada:</strong> {documento.quantidade_enviada}</p>
                        <p><strong>Quantidade Recebida:</strong> {documento.quantidade_recebida}</p>
                        <p><strong>Última Atualização:</strong> {documento.data_atualizacao ? new Date(documento.data_atualizacao).toLocaleString() : 'N/A'}</p>
                    </div>
                </div>

                <div className="detalhes-footer">
                    <button className="btn-cancelar" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default DocumentoDetalhes;
