import React, { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react"; // Ícones para ações
import PageLayout from '../components/PageLayout';
import { useRecursos } from '../hooks/useRecurso'; // Hook para gerenciar recursos
import { getAllEscolas } from '../services/escolaService'; // Serviço para buscar escolas
import recursosIconLarge from "../assets/recursos.png";
import "../styles/recursos.css"; // Seus estilos existentes

// Componente para o Modal de Confirmação de Exclusão
function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal confirmation-modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="btn-danger">Confirmar</button>
                    <button onClick={onCancel} className="btn-cancel">Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default function Recursos() {
    // Hook para gerenciar os dados e o estado dos recursos
    const {
        recursos,
        loading,
        error,
        addRecurso,
        editRecurso,
        removeRecurso,
        showModal,
        setShowModal
    } = useRecursos();

    // Estado para armazenar a lista de escolas (para o dropdown)
    const [escolas, setEscolas] = useState([]);
    const [escolasError, setEscolasError] = useState(null);

    // Estado inicial do formulário
    const initialState = {
        escola_id: '',
        tipo_recurso: '',
        capacidade_sala: '',
        tipo_acesso_internet: 'nenhum',
        descricao: ''
    };
    const [formData, setFormData] = useState(initialState);

    // Estados para controle de edição, busca e confirmação
    const [recursoToEdit, setRecursoToEdit] = useState(null);
    const [recursoToDelete, setRecursoToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Busca a lista de escolas quando o componente é montado
    useEffect(() => {
        async function fetchEscolas() {
            try {
                const data = await getAllEscolas();
                setEscolas(data);
            } catch (err) {
                console.error("Erro ao buscar escolas:", err);
                setEscolasError("Não foi possível carregar a lista de escolas.");
            }
        }
        fetchEscolas();
    }, []);

    // Filtra os recursos com base no termo de busca
    const recursosFiltrados = recursos.filter(recurso =>
        recurso.tipo_recurso?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recurso.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Manipula o envio do formulário (criação ou edição)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (!formData.escola_id || !formData.tipo_recurso) {
            alert("Os campos 'Escola' e 'Tipo de Recurso' são obrigatórios.");
            return;
        }

        const recursoData = {
            ...formData,
            escola_id: parseInt(formData.escola_id, 10),
            capacidade_sala: formData.capacidade_sala ? parseInt(formData.capacidade_sala, 10) : null,
        };

        try {
            if (recursoToEdit) {
                await editRecurso(recursoToEdit.id, recursoData);
            } else {
                await addRecurso(recursoData);
            }
            resetFormAndCloseModal();
        } catch (err) {
            alert(`Erro ao salvar o recurso: ${err.message}`);
        }
    };

    // Prepara o formulário para edição de um recurso
    const handleEdit = (recurso) => {
        setRecursoToEdit(recurso);
        setFormData({
            escola_id: recurso.escola_id || '',
            tipo_recurso: recurso.tipo_recurso || '',
            capacidade_sala: recurso.capacidade_sala || '',
            tipo_acesso_internet: recurso.tipo_acesso_internet || 'nenhum',
            descricao: recurso.descricao || ''
        });
        setShowModal(true);
    };

    // Abre o modal de confirmação para exclusão
    const handleDelete = (id) => {
        setRecursoToDelete(id);
    };

    // Confirma e executa a exclusão
    const confirmDelete = async () => {
        if (recursoToDelete) {
            try {
                await removeRecurso(recursoToDelete);
            } catch (err) {
                alert(`Erro ao excluir o recurso: ${err.message}`);
            } finally {
                setRecursoToDelete(null); // Fecha o modal de confirmação
            }
        }
    };

    // Abre o modal para criar um novo recurso
    const openNewRecursoModal = () => {
        setRecursoToEdit(null);
        setFormData(initialState);
        setShowModal(true);
    };

    // Reseta o formulário e fecha o modal principal
    const resetFormAndCloseModal = () => {
        setShowModal(false);
        setRecursoToEdit(null);
        setFormData(initialState);
    };

    return (
        <PageLayout className="recursos-page">
            <div className="page-header">
                <h2>Gestão de Recursos</h2>
                <button className="btn-purple" onClick={openNewRecursoModal}>
                    <Plus size={16} /> Novo Recurso
                </button>
            </div>

            <input
                type="text"
                className="search-input"
                placeholder="Buscar por tipo ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Carregando recursos...</p>}
            {error && <p className="error-message">Erro: {error}</p>}
            {escolasError && <p className="error-message">Erro: {escolasError}</p>}

            {!loading && !error && (
                <div className="recursos-grid">
                    {recursosFiltrados.length === 0 ? (
                        <div className="empty-state">
                            <p>Nenhum recurso encontrado.</p>
                            <p>Use o botão "Novo Recurso" para adicionar o primeiro.</p>
                        </div>
                    ) : (
                        recursosFiltrados.map((recurso) => (
                            <div key={recurso.id} className="recurso-card">
                                <div className="recurso-card-header">
                                    <h3>{recurso.tipo_recurso}</h3>
                                    <button className="btn-icon" onClick={() => handleDelete(recurso.id)} title="Excluir Recurso">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p><strong>Escola:</strong> {escolas.find(e => e.id === recurso.escola_id)?.nome || `ID ${recurso.escola_id}`}</p>
                                <p><strong>Descrição:</strong> {recurso.descricao || 'N/A'}</p>
                                <p><strong>Capacidade:</strong> {recurso.capacidade_sala || 'N/A'}</p>
                                <p><strong>Internet:</strong> {recurso.tipo_acesso_internet || 'N/A'}</p>
                                <div className="recurso-card-buttons">
                                    <button className="btn-editar" onClick={() => handleEdit(recurso)}>
                                        Editar
                                    </button>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal para Adicionar/Editar Recurso */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={recursosIconLarge} alt="Ícone de Recursos" />
                            <h3>{recursoToEdit ? 'Editar Recurso' : 'Cadastrar Recurso'}</h3>
                            <button onClick={resetFormAndCloseModal} className="btn-icon close-modal-btn" title="Fechar">
                                <X size={24} />
                            </button>
                        </div>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            {/* NOVO: Dropdown de Escolas */}
                            <label htmlFor="escola_id">Escola:</label>
                            <select
                                id="escola_id"
                                value={formData.escola_id}
                                onChange={(e) => setFormData({ ...formData, escola_id: e.target.value })}
                                required
                            >
                                <option value="" disabled>Selecione uma escola</option>
                                {escolas.map(escola => (
                                    <option key={escola.id} value={escola.id}>
                                        {escola.nome}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="tipo_recurso">Tipo de Recurso:</label>
                            <input
                                id="tipo_recurso"
                                type="text"
                                placeholder="ex: Sala de Aula, Projetor, Laboratório..."
                                value={formData.tipo_recurso}
                                onChange={(e) => setFormData({ ...formData, tipo_recurso: e.target.value })}
                                required
                            />

                            <label htmlFor="capacidade_sala">Capacidade:</label>
                            <input
                                id="capacidade_sala"
                                type="number"
                                placeholder="Apenas números (ex: 25)"
                                value={formData.capacidade_sala}
                                onChange={(e) => setFormData({ ...formData, capacidade_sala: e.target.value })}
                            />

                            <label htmlFor="tipo_acesso_internet">Tipo de Acesso à Internet:</label>
                            <select
                                id="tipo_acesso_internet"
                                value={formData.tipo_acesso_internet}
                                onChange={(e) => setFormData({ ...formData, tipo_acesso_internet: e.target.value })}
                            >
                                <option value="nenhum">Nenhum</option>
                                <option value="wifi">Wi-Fi</option>
                                <option value="cabeada">Cabeada</option>
                                <option value="movel">Móvel</option>
                            </select>

                            <label htmlFor="descricao">Descrição:</label>
                            <input
                                id="descricao"
                                type="text"
                                placeholder="Informações adicionais, localização, etc."
                                value={formData.descricao}
                                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                            />

                            <div className="modal-buttons">
                                <button type="button" className="btn-cancel" onClick={resetFormAndCloseModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-purple submit-btn">
                                    {recursoToEdit ? 'Atualizar Recurso' : 'Cadastrar Recurso'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação para Exclusão */}
            {recursoToDelete && (
                <ConfirmationModal
                    message="Tem certeza que deseja excluir este recurso? Esta ação não pode ser desfeita."
                    onConfirm={confirmDelete}
                    onCancel={() => setRecursoToDelete(null)}
                />
            )}
        </PageLayout>
    );
}
