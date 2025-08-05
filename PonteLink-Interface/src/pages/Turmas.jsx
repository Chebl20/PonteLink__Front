import React, { useState, useEffect, useMemo } from 'react';
import { useTurmas } from '../hooks/useTurmas';
import { getAllEscolas } from '../services/EscolaService';
import { getAllOficinas } from '../services/oficinaService';
import PageLayout from '../components/PageLayout';
import { Plus, Trash2, Edit, X, Search } from 'lucide-react';
import turmasIconLarge from "../assets/turmas.png";
import '../styles/turmas.css';
import '../styles/detalhes.css'; // Reusing some styles
import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';

export default function TurmasPage() {
    const [escolas, setEscolas] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [escolasError, setEscolasError] = useState(null);
    const [oficinasError, setOficinasError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // We need to manage the selected school at this level
    const [selectedEscolaId, setSelectedEscolaId] = useState('');

    const {
        turmas,
        loading,
        error,
        addTurma,
        editTurma,
        removeTurma,
        showModal,
        setShowModal
    } = useTurmas(selectedEscolaId);

    const [turmaToEdit, setTurmaToEdit] = useState(null);
    const [turmaToDelete, setTurmaToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const initialState = {
        escola_id: '',
        oficina_id: '',
        nome: '',
        data_inicio: '',
        data_fim: '',
        capacidade_maxima: '',
        descricao: ''
    };
    const [formData, setFormData] = useState(initialState);

    // Handle modal state from navigation
    useEffect(() => {
            if (location.state?.abrirModal) {
                setTurmaToEdit(null);
                setShowModal(true);
                // Clear the navigation state to prevent reopening on refresh
                navigate(location.pathname, { replace: true, state: {} });
            }
        }, [location, navigate, setShowModal]);

    useEffect(() => {
        async function fetchData() {
            try {
                const escolasData = await getAllEscolas();
                setEscolas(escolasData);
                if (escolasData.length > 0 && !selectedEscolaId) {
                    setSelectedEscolaId(escolasData[0].id);
                }
            } catch (err) {
                console.error("Erro ao buscar escolas:", err);
                setEscolasError("Não foi possível carregar a lista de escolas.");
            }
            try {
                const oficinasData = await getAllOficinas();
                setOficinas(oficinasData);
            } catch (err) {
                console.error("Erro ao buscar oficinas:", err);
                setOficinasError("Não foi possível carregar a lista de oficinas.");
            }
        }
        fetchData();
    }, [selectedEscolaId]);

    const resetFormAndCloseModal = () => {
        setFormData(initialState);
        setTurmaToEdit(null);
        setShowModal(false);
    };

    const handleEdit = (turma) => {
        setTurmaToEdit(turma);
        setFormData({
            escola_id: turma.escola_id || '',
            oficina_id: turma.oficina_id || '',
            nome: turma.nome || '',
            data_inicio: turma.data_inicio ? new Date(turma.data_inicio).toISOString().split('T')[0] : '',
            data_fim: turma.data_fim ? new Date(turma.data_fim).toISOString().split('T')[0] : '',
            capacidade_maxima: turma.capacidade_maxima || '',
            descricao: turma.descricao || ''
        });
        setShowModal(true);
    };

    const handleDelete = (turma) => {
        setTurmaToDelete(turma);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (turmaToDelete) {
            await removeTurma(turmaToDelete.id);
            setTurmaToDelete(null);
            setShowDeleteConfirm(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.escola_id || !formData.oficina_id || !formData.nome) {
            alert('Os campos Escola, Oficina e Nome da Turma são obrigatórios.');
            return;
        }
        try {
            if (turmaToEdit) {
                await editTurma(turmaToEdit.id, formData);
            } else {
                await addTurma(formData);
            }
            resetFormAndCloseModal();
        } catch (err) {
            alert(`Erro ao salvar turma: ${err.message}`);
        }
    };

    const filteredTurmas = useMemo(() => {
        return turmas.filter(turma =>
            turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (turma.descricao && turma.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [turmas, searchTerm]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Não definida';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
    };

    return (
        <PageLayout>
            <div className="page-header">
                <h2>Gerenciamento de Turmas</h2>
                <div className="header-actions">
                    <div className="search-container-turmas">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou descrição..."
                            className="search-input-turmas"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn-purple" onClick={() => { setTurmaToEdit(null); setFormData(initialState); setShowModal(true); }}>
                        <Plus size={16} /> Nova Turma
                    </button>
                </div>
            </div>

            <div className="escola-selector-container">
                <label htmlFor="escola-select">Selecione a Escola:</label>
                <select
                    id="escola-select"
                    value={selectedEscolaId}
                    onChange={(e) => setSelectedEscolaId(e.target.value)}
                    className="escola-select"
                >
                    {escolas.map(escola => (
                        <option key={escola.id} value={escola.id}>{escola.nome}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Carregando turmas...</p>}
            {error && <p className="error-message">Erro: {error}</p>}
            {escolasError && <p className="error-message">{escolasError}</p>}
            
            <div className="turmas-grid">
                {filteredTurmas.map((turma) => {
                    const oficina = oficinas.find(o => o.id === turma.oficina_id);
                    const escola = escolas.find(e => e.id === turma.escola_id);
                    return (
                        <div key={turma.id} className="turma-card">
                            <div className="turma-card-header">
                                <h3>{turma.nome}</h3>
                                <div className="card-actions">
                                    <button onClick={() => handleEdit(turma)} className="btn-icon" title="Editar Turma"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(turma)} className="btn-icon" title="Excluir Turma"><Trash2 size={18} /></button>
                                </div>
                            </div>
                            <p className="turma-card-detail"><strong>Oficina:</strong> {oficina ? oficina.tema_oficina : 'Não informada'}</p>
                            <p className="turma-card-detail"><strong>Escola:</strong> {escola ? escola.nome : 'Não informada'}</p>
                            <p className="turma-card-detail"><strong>Período:</strong> {formatDate(turma.data_inicio)} a {formatDate(turma.data_fim)}</p>
                            <p className="turma-card-description">{turma.descricao || 'Sem descrição.'}</p>
                        </div>
                    );
                })}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={turmasIconLarge} alt="Ícone de Turmas" />
                            <h3>{turmaToEdit ? 'Editar Turma' : 'Cadastrar Turma'}</h3>
                            <button onClick={resetFormAndCloseModal} className="btn-icon close-modal-btn" title="Fechar">
                                <X size={24} />
                            </button>
                        </div>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label htmlFor="escola_id">Escola:</label>
                            <select id="escola_id" value={formData.escola_id} onChange={(e) => setFormData({ ...formData, escola_id: e.target.value })} required >
                                <option value="" disabled>Selecione uma escola</option>
                                {escolas.map(escola => <option key={escola.id} value={escola.id}>{escola.nome}</option>)}
                            </select>
                            {escolasError && <p className="error-message-small">{escolasError}</p>}

                            <label htmlFor="oficina_id">Oficina:</label>
                            <select id="oficina_id" value={formData.oficina_id} onChange={(e) => setFormData({ ...formData, oficina_id: e.target.value })} required >
                                <option value="" disabled>Selecione uma oficina</option>
                                {oficinas.map(oficina => <option key={oficina.id} value={oficina.id}>{oficina.tema_oficina}</option>)}
                            </select>
                            {oficinasError && <p className="error-message-small">{oficinasError}</p>}

                            <label htmlFor="nome">Nome da Turma:</label>
                            <input id="nome" type="text" placeholder="ex: Turma A, Manhã, Avançado..." value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} required />

                            <label htmlFor="data_inicio">Data de Início:</label>
                            <input id="data_inicio" type="date" value={formData.data_inicio} onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })} />

                            <label htmlFor="data_fim">Data de Fim:</label>
                            <input id="data_fim" type="date" value={formData.data_fim} onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })} />

                            <label htmlFor="capacidade_maxima">Capacidade Máxima:</label>
                            <input id="capacidade_maxima" type="number" placeholder="Número máximo de alunos" value={formData.capacidade_maxima} onChange={(e) => setFormData({ ...formData, capacidade_maxima: e.target.value })} />

                            <label htmlFor="descricao">Descrição:</label>
                            <input id="descricao" type="text" placeholder="Informações adicionais sobre a turma" value={formData.descricao} onChange={(e) => setFormData({ ...formData, descricao: e.target.value })} />

                            <div className="modal-buttons">
                                <button type="button" className="btn-cancel" onClick={resetFormAndCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-purple submit-btn">{turmaToEdit ? 'Atualizar Turma' : 'Cadastrar Turma'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>Confirmar Exclusão</h3>
                        </div>
                        <div className="modal-content">
                            <p>Tem certeza que deseja excluir a turma "{turmaToDelete?.nome}"? Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                            <button className="btn-danger" onClick={confirmDelete}>Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}