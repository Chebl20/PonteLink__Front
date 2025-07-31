import React, { useState } from 'react';
import { useEscolas } from '../hooks/useEscolas.js';
import EscolaList from '../components/escola/EscolaList.jsx';
import EscolaForm from '../components/escola/EscolaForm.jsx';
import EscolaDetalhes from '../components/escola/EscolaDetalhes.jsx';
import PageLayout from '../components/PageLayout.jsx';
import { Plus } from 'lucide-react';

export default function EscolasPage() {
    const {
        escolas, loading, error, addEscola, editEscola, removeEscola,
        showModal, setShowModal,
    } = useEscolas();

    const [escolaToEdit, setEscolaToEdit] = useState(null);
    const [escolaToView, setEscolaToView] = useState(null);
    const [showDetalhesModal, setShowDetalhesModal] = useState(false);

    const handleCancel = () => {
        setShowModal(false);
        setEscolaToEdit(null);
    };

    const handleCloseDetalhes = () => {
        setShowDetalhesModal(false);
        setEscolaToView(null);
    };

    const handleSave = (formData) => {
        const dadosParaSalvar = {
            ...formData,
            status: formData.status === 'Ativa'
        };

        if (escolaToEdit) {
            editEscola(escolaToEdit.id, dadosParaSalvar);
        } else {
            addEscola(dadosParaSalvar);
        }
        handleCancel();
    };

    const handleEdit = (escola) => {
        setEscolaToEdit(escola);
        setShowModal(true);
    };

    const handleViewDetails = (escola) => {
        setEscolaToView(escola);
        setShowDetalhesModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta escola?')) {
            removeEscola(id);
        }
    };

    return (
        <PageLayout className="escolas-page">
            <div className="page-header">
                <h2>Gerenciamento de Escolas</h2>
                <button className="btn-purple" onClick={() => {
                    setEscolaToEdit(null);
                    setShowModal(true);
                }}>
                    <Plus size={16} /> Nova Escola
                </button>
            </div>

            {loading && <p>Carregando escolas...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            {!loading && !error && (
                <EscolaList
                    escolas={escolas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewDetails={handleViewDetails}
                />
            )}

            {/* Modal de Formulário */}
            {showModal && (
                <EscolaForm
                    onSubmit={handleSave}
                    onClose={handleCancel}
                    escolaAtual={escolaToEdit}
                />
            )}

            {/* Modal de Detalhes */}
            {showDetalhesModal && (
                <EscolaDetalhes
                    escola={escolaToView}
                    onClose={handleCloseDetalhes}
                />
            )}
        </PageLayout>
    );
}