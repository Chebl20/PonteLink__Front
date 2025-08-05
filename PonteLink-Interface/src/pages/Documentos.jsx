// DocumentosPage.jsx
import React, { useState, useEffect } from 'react';
import { useDocumentos } from '../hooks/useDocumentos';
import { getAllEscolas } from '../services/EscolaService';
import DocumentoList from '../components/documento/DocumentoList.jsx';
import DocumentoForm from '../components/documento/DocumentoForm.jsx';
import DocumentoDetalhes from '../components/documento/DocumentoDetalhes.jsx';
import PageLayout from '../components/PageLayout.jsx';
import { Plus } from 'lucide-react';
import '../styles/documentos.css';

export default function DocumentosPage() {
    const [escolas, setEscolas] = useState([]);
    const [escolaId, setEscolaId] = useState(null);

    const {
        documentos,
        loading,
        error,
        addDocumento,
        editDocumento,
        removeDocumento,
        showModal,
        setShowModal
    } = useDocumentos({ escola_id: escolaId });

    const [documentoToEdit, setDocumentoToEdit] = useState(null);
    const [documentoToView, setDocumentoToView] = useState(null);

    useEffect(() => {
        async function fetchEscolas() {
            try {
                const data = await getAllEscolas();
                setEscolas(data);
                if (data.length > 0) setEscolaId(data[0].id);
            } catch (err) {
                console.error('Erro ao buscar escolas:', err);
            }
        }
        fetchEscolas();
    }, []);

    const handleCloseForm = () => {
        setShowModal(false);
        setDocumentoToEdit(null);
    };

    const handleSubmit = async (formData) => {
        if (!escolaId) {
            alert('Selecione uma escola válida.');
            return;
        }

        const dados = { ...formData, escola_id: escolaId };

        try {
            if (documentoToEdit) {
                await editDocumento(documentoToEdit.id, dados);
            } else {
                await addDocumento(dados);
            }
            handleCloseForm();
        } catch (err) {
            alert(`Erro ao salvar documento: ${err.message}`);
        }
    };

    return (
        <PageLayout className="documentos-page">
            <div className="page-header">
                <h2>Gestão de Documentos</h2>
                <button className="btn-purple" onClick={() => {
                    setDocumentoToEdit(null);
                    setShowModal(true);
                }}>
                    <Plus size={16} /> Novo Documento
                </button>
            </div>

            {!escolaId ? (
                <p>Carregando escolas...</p>
            ) : (
                <>
                    {loading && <p>Carregando documentos...</p>}
                    {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

                    <DocumentoList
                        documentos={documentos}
                        onEdit={(doc) => {
                            setDocumentoToEdit(doc);
                            setShowModal(true);
                        }}
                        onDelete={removeDocumento}
                        onViewDetails={(doc) => setDocumentoToView(doc)}
                    />
                </>
            )}

            {showModal && (
                <DocumentoForm
                    onClose={handleCloseForm}
                    onSubmit={handleSubmit}
                    documentoAtual={documentoToEdit}
                />
            )}

            {documentoToView && (
                <DocumentoDetalhes
                    documento={documentoToView}
                    onClose={() => setDocumentoToView(null)}
                />
            )}
        </PageLayout>
    );
}