import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from '../components/PageLayout';
import { useRecursos } from '../hooks/useRecurso';
import recursosIconLarge from "../assets/recursos.png";
import "../styles/recursos.css";

export default function Recursos() {
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
    
    const [formData, setFormData] = useState({
        provedor: 'Escola',
        tipoRecurso: '',
        quantidade: '',
        capacidade: '',
        localizacao: '',
        observacao: ''
    });
    const [recursoToEdit, setRecursoToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar recursos baseado na busca
    const recursosFiltrados = recursos.filter(recurso =>
        recurso.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recurso.escola?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recurso.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const recursoData = {
            ...formData,
            title: formData.tipoRecurso || 'Novo Recurso',
            escola: formData.provedor === 'Escola' ? 'Escola Padrão' : 'Gestor da Oficina',
            local: formData.localizacao,
            capacidade: `${formData.capacidade} alunos`,
            tipo: formData.tipoRecurso
        };

        if (recursoToEdit) {
            editRecurso(recursoToEdit.id, recursoData);
        } else {
            addRecurso(recursoData);
        }

        // Limpar formulário
        setFormData({
            provedor: 'Escola',
            tipoRecurso: '',
            quantidade: '',
            capacidade: '',
            localizacao: '',
            observacao: ''
        });
        setRecursoToEdit(null);
        setShowModal(false);
    };

    const handleEdit = (recurso) => {
        setRecursoToEdit(recurso);
        setFormData({
            provedor: recurso.escola?.includes('Gestor') ? 'Gestor da Oficina' : 'Escola',
            tipoRecurso: recurso.tipo || '',
            quantidade: recurso.quantidade || '',
            capacidade: recurso.capacidade?.replace(' alunos', '') || '',
            localizacao: recurso.local || '',
            observacao: recurso.observacao || ''
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este recurso?')) {
            removeRecurso(id);
        }
    };

    return (
        <PageLayout className="recursos-page">
            <div className="page-header">
                <h2>Gestão de Recursos</h2>
                <button className="btn-purple" onClick={() => {
                    setRecursoToEdit(null);
                    setFormData({
                        provedor: 'Escola',
                        tipoRecurso: '',
                        quantidade: '',
                        capacidade: '',
                        localizacao: '',
                        observacao: ''
                    });
                    setShowModal(true);
                }}>
                    <Plus size={16} /> Novo Recurso
                </button>
            </div>

            <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar Recursos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Carregando recursos...</p>}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            {!loading && !error && (
                <div className="recursos-grid">
                    {recursosFiltrados.length === 0 ? (
                        <div className="empty-state">
                            <p>Nenhum recurso encontrado</p>
                        </div>
                    ) : (
                        recursosFiltrados.map((recurso) => (
                            <div key={recurso.id} className="recurso-card">
                                <div className="recurso-card-header">
                                    <h3>{recurso.title}</h3>
                                    <span className="tipo-tag">{recurso.tipo}</span>
                                </div>
                                <p>{recurso.escola}</p>
                                <p>{recurso.local}</p>
                                <p><strong>Capacidade:</strong> {recurso.capacidade}</p>
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

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={recursosIconLarge} alt="Icon" />
                            <h3>{recursoToEdit ? 'Editar Recurso' : 'Cadastrar Recurso'}</h3>
                        </div>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label>Quem proverá os recursos:</label>
                            <div className="form-radio-group">
                                <div className="form-radio-item">
                                    <input 
                                        type="radio" 
                                        id="escola" 
                                        name="provedor" 
                                        value="Escola" 
                                        checked={formData.provedor === 'Escola'}
                                        onChange={(e) => setFormData({...formData, provedor: e.target.value})}
                                    />
                                    <label htmlFor="escola">Escola</label>
                                </div>
                                <div className="form-radio-item">
                                    <input 
                                        type="radio" 
                                        id="gestor" 
                                        name="provedor" 
                                        value="Gestor da Oficina"
                                        checked={formData.provedor === 'Gestor da Oficina'}
                                        onChange={(e) => setFormData({...formData, provedor: e.target.value})}
                                    />
                                    <label htmlFor="gestor">Gestor da Oficina</label>
                                </div>
                            </div>

                            <label>Tipo de Recurso:</label>
                            <input 
                                type="text" 
                                placeholder="ex: Equipamento, Laboratório..." 
                                value={formData.tipoRecurso}
                                onChange={(e) => setFormData({...formData, tipoRecurso: e.target.value})}
                                required
                            />

                            <div className="form-row">
                                <div>
                                    <label>Quantidade:</label>
                                    <input 
                                        type="number" 
                                        value={formData.quantidade}
                                        onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Capacidade:</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: 25"
                                        value={formData.capacidade}
                                        onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <label>Localização:</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Bloco A, 1º andar"
                                value={formData.localizacao}
                                onChange={(e) => setFormData({...formData, localizacao: e.target.value})}
                                required
                            />

                            <label>Observação:</label>
                            <input 
                                type="text" 
                                placeholder="Informações adicionais sobre os recursos" 
                                value={formData.observacao}
                                onChange={(e) => setFormData({...formData, observacao: e.target.value})}
                            />

                            <button type="submit" className="btn-purple submit-btn">
                                {recursoToEdit ? 'Atualizar Recurso' : 'Cadastrar Recurso'}
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => {
                                setShowModal(false);
                                setRecursoToEdit(null);
                                setFormData({
                                    provedor: 'Escola',
                                    tipoRecurso: '',
                                    quantidade: '',
                                    capacidade: '',
                                    localizacao: '',
                                    observacao: ''
                                });
                            }}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}