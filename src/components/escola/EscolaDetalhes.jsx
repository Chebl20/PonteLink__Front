
import '../../styles/detalhes.css'; // Usaremos um novo arquivo de CSS

const EscolaDetalhes = ({ escola, onClose }) => {
    // Se não houver escola, não renderiza nada.
    if (!escola) {
        return null;
    }

    const { endereco } = escola;

    return (
        // O overlay que escurece o fundo
        <div className="modal-overlay" onClick={onClose}>
            {/* O container do modal, com stopPropagation para não fechar ao clicar dentro */}
            <div className="detalhes-container" onClick={(e) => e.stopPropagation()}>

                <div className="detalhes-header">
                    <h2>{escola.nome}</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>

                <div className="detalhes-body">
                    <div className="detalhes-section">
                        <h3>Informações Gerais</h3>
                        <p><strong>Diretor(a):</strong> {escola.nome_diretor || 'Não informado'}</p>
                        <p><strong>Mediador(a):</strong> {escola.nome_mediador || 'Não informado'}</p>
                    </div>

                    <div className="detalhes-section">
                        <h3>Contato</h3>
                        <p><strong>Telefone:</strong> {escola.contato_telefone || 'Não informado'}</p>
                        <p><strong>Email:</strong> {escola.contato_email || 'Não informado'}</p>
                    </div>

                    <div className="detalhes-section">
                        <h3>Endereço</h3>
                        {endereco ? (
                            <>
                                <p><strong>Logradouro:</strong> {endereco.logradouro}, {endereco.numero || 'S/N'}</p>
                                <p><strong>Complemento:</strong> {endereco.complemento || 'N/A'}</p>
                                <p><strong>Bairro:</strong> {endereco.bairro}</p>
                                <p><strong>Cidade/UF:</strong> {endereco.cidade} - {endereco.estado}</p>
                                <p><strong>CEP:</strong> {endereco.cep}</p>
                            </>
                        ) : (
                            <p>Endereço não cadastrado.</p>
                        )}
                    </div>
                </div>

                <div className="detalhes-footer">
                    <button className="btn-cancelar" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default EscolaDetalhes;