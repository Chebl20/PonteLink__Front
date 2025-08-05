import React, { useState, useEffect } from 'react';
import { useEscolas } from '../hooks/useEscolas.js';
import EscolaList from '../components/escola/EscolaList.jsx';
import EscolaForm from '../components/escola/EscolaForm.jsx';
import EscolaDetalhes from '../components/escola/EscolaDetalhes.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import { Plus } from 'lucide-react';

export default function EscolasPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        escolas, loading, error, addEscola, editEscola, removeEscola,
        showModal, setShowModal,
    } = useEscolas();

    const [escolaToEdit, setEscolaToEdit] = useState(null);
    const [escolaToView, setEscolaToView] = useState(null);
    const [showDetalhesModal, setShowDetalhesModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 🔍 Estado do filtro de busca

    const handleCancel = () => {
        setShowModal(false);
        setEscolaToEdit(null);
    };

     
    // Handle modal state from navigation
    useEffect(() => {
        if (location.state?.abrirModal) {
            setEscolaToEdit(null);
            setShowModal(true);
            // Clear the navigation state to prevent reopening on refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate, setShowModal]);
    

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

    // 🧠 Filtragem das escolas com base no termo de busca
    const escolasFiltradas = escolas.filter(escola =>
        escola.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (escola.descricao && escola.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

            {/* 🔍 Campo de busca */}
            <input
                type="text"
                placeholder="Buscar por nome ou descrição..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />

            {loading && <p>Carregando escolas...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            {!loading && !error && (
                <EscolaList
                    escolas={escolasFiltradas}
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
