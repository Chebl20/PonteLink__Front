import React, { useState, useEffect } from 'react';
import { useOficinas } from '../hooks/useOficinas';
import { getAllEscolas } from '../services/EscolaService';
import OficinaForm from '../components/oficina/OficinaForm';
import OficinaDetalhes from '../components/oficina/OficinaDetalhes';
import PageLayout from '../components/PageLayout';
import { Plus, Trash2 } from 'lucide-react';
import '../styles/oficinas.css';

export default function OficinasPage() {
    const [escolas, setEscolas] = useState([]);
    const [escolaId, setEscolaId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // 🔍 Novo estado de busca

    const {
        oficinas,
        loading,
        error,
        addOficina,
        editOficina,
        removeOficina,
        showModal,
        setShowModal
    } = useOficinas(escolaId);

    const [oficinaToEdit, setOficinaToEdit] = useState(null);
    const [oficinaToView, setOficinaToView] = useState(null);

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
        setOficinaToEdit(null);
    };

    const handleSubmit = async (formData) => {
        if (!escolaId) {
            alert('Selecione uma escola válida.');
            return;
        }

        const dados = { ...formData, escola_id: escolaId };

        try {
            if (oficinaToEdit) {
                await editOficina(oficinaToEdit.id, dados);
            } else {
                await addOficina(dados);
            }
            handleCloseForm();
        } catch (err) {
            alert(`Erro ao salvar oficina: ${err.message}`);
        }
    };

    // 🧠 Filtra oficinas por tema ou descrição
    const oficinasFiltradas = oficinas.filter(oficina =>
        oficina.tema_oficina.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (oficina.descricao && oficina.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PageLayout className="oficinas-page">
            <div className="page-header">
                <h2>Planejamento de Oficinas</h2>
                <button className="btn-purple" onClick={() => {
                    setOficinaToEdit(null);
                    setShowModal(true);
                }}>
                    <Plus size={16} /> Nova Oficina
                </button>
            </div>

            {/* 🔍 Campo de busca */}
            <input
                type="text"
                placeholder="Buscar por tema ou descrição..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />

            {!escolaId ? (
                <p>Carregando escolas...</p>
            ) : (
                <>
                    {loading && <p>Carregando oficinas...</p>}
                    {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

                    <div className="oficinas-grid">
                        {oficinasFiltradas.map((oficina) => (
                            <div key={oficina.id} className="oficina-card">
                                <div className="oficina-card-header">
                                    <h3>{oficina.tema_oficina}</h3>
                                    <button
                                        className="btn-icon"
                                        onClick={() => removeOficina(oficina.id)}
                                        title="Excluir Oficina"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p className="oficina-description">{oficina.descricao}</p>
                                <p><strong>Data/Hora:</strong> {new Date(oficina.data_hora).toLocaleString()}</p>
                                <p><strong>Turma:</strong> {oficina.turma_alvo || '-'}</p>
                                <div className="oficina-card-buttons">
                                    <button className="btn-editar" onClick={() => {
                                        setOficinaToEdit(oficina);
                                        setShowModal(true);
                                    }}>Editar</button>
                                    <button className="btn-detalhes" onClick={() => setOficinaToView(oficina)}>
                                        Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {showModal && (
                <OficinaForm
                    oficinaAtual={oficinaToEdit}
                    onClose={handleCloseForm}
                    onSubmit={handleSubmit}
                />
            )}

            {oficinaToView && (
                <OficinaDetalhes
                    oficina={oficinaToView}
                    onClose={() => setOficinaToView(null)}
                />
            )}
        </PageLayout>
    );
}
