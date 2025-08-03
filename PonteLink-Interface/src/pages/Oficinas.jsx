import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Plus, Loader2, X, Trash2 } from "lucide-react";
import PageLayout from "../components/PageLayout";
import "../styles/oficinas.css";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";
import computadorIcon from "../assets/oficinas.png";
import { supabase } from "../supaBaseClient";

const initialForm = {
    escola_id: "",
    semestre: "",
    tema_oficina: "",
    data_hora: "",
    ano_escolar_alvo: "",
    horario: "",
    numero_alunos: "",
    professor_responsavel: "",
    turma: "",
    observacao: "",
};

export default function Oficinas() {
    const [escolas, setEscolas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // add | edit | details
    const [selected, setSelected] = useState(null);
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState(initialForm);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOficinas();
        fetchEscolas();
    }, []);

    async function fetchEscolas() {
        const { data, error } = await supabase.from('escolas').select('id, nome');
        if (!error) setEscolas(data);
    }

    async function fetchOficinas() {
        setLoading(true);
        setError("");
        let query = supabase.from('oficinas').select('*').order('data_hora', { ascending: true });
        if (search) query = query.ilike('tema_oficina', `%${search}%`);
        const { data, error } = await query;
        if (error) setError("Erro ao buscar oficinas");
        else setOficinas(data);
        setLoading(false);
    }

    function openModal(type, oficina = null) {
        setModalType(type);
        setShowModal(true);
        setSelected(oficina);
        setForm(oficina ? { ...oficina } : initialForm);
    }

    function closeModal() {
        setShowModal(false);
        setSelected(null);
        setForm(initialForm);
    }
    

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (modalType === "add") {
            const { error } = await supabase.from('oficinas').insert([form]);
            if (error) setError("Erro ao cadastrar oficina");
        } else if (modalType === "edit" && selected) {
            const { error } = await supabase.from('oficinas').update(form).eq('id', selected.id);
            if (error) setError("Erro ao atualizar oficina");
        }
        closeModal();
        fetchOficinas();
    }

    async function handleDelete(id) {
        if (!window.confirm("Deseja realmente excluir esta oficina?")) return;
        setLoading(true);
        try {
            await supabase.from('oficinas').delete().eq('id', id);
            fetchOficinas();
        } catch (error) {
            setError("Erro ao excluir oficina");
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageLayout className="oficinas-page">
            <div className="page-header">
                <h2>Planejamento de Oficinas</h2>
                <button className="btn-purple" onClick={() => openModal("add")}>
                    <Plus size={16} /> Nova Oficina
                </button>
            </div>

            <input
                type="text"
                className="search-input"
                placeholder="Buscar Oficinas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <div className="loading">
                    <Loader2 size={24} color="#f3d512" />
                </div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="oficinas-grid">
                    {oficinas.map((oficina, idx) => (
                        <div key={idx} className="oficina-card">
                            <div className="oficina-card-header">
                                <h3>{oficina.tema_oficina || oficina.title}</h3>
                                <span className="status-ativa">{oficina.status}</span>
                            </div>
                            <p className="oficina-description">{oficina.description}</p>
                            <p><strong>Duração:</strong> {oficina.duracao}</p>
                            <p><strong>Capacidade:</strong> {oficina.capacidade}</p>
                            <div className="oficina-card-buttons">
                                <button className="btn-editar" onClick={() => openModal("edit", oficina)}>Editar</button>
                                <button className="btn-detalhes" onClick={() => openModal("details", oficina)}>Ver Detalhes</button>
                                <button className="btn-excluir" onClick={() => handleDelete(oficina.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={computadorIcon} alt="Icon" />
                            <h3>
                                {modalType === "add"
                                    ? "Cadastrar Oficina"
                                    : modalType === "edit"
                                    ? "Editar Oficina"
                                    : "Detalhes da Oficina"}
                            </h3>
                        </div>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label>Escola:</label>
                            <select
                                value={form.escola_id}
                                onChange={e => setForm({ ...form, escola_id: e.target.value })}
                                required
                            >
                                <option value="">Selecione a escola</option>
                                {escolas.map(escola => (
                                    <option key={escola.id} value={escola.id}>{escola.nome}</option>
                                ))}
                            </select>
                            <div className="form-row">
                                <div>
                                    <label>Data:</label>
                                    <input type="date" value={form.data_hora} onChange={(e) => setForm({ ...form, data_hora: e.target.value })} />
                                </div>
                                <div>
                                    <label>Horário:</label>
                                    <input type="text" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} placeholder="Ex: 14:00" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div>
                                    <label>Número de Alunos:</label>
                                    <input type="number" value={form.numero_alunos} onChange={(e) => setForm({ ...form, numero_alunos: e.target.value })} />
                                </div>
                                <div>
                                    <label>Professor Responsável:</label>
                                    <input type="text" value={form.professor_responsavel} onChange={(e) => setForm({ ...form, professor_responsavel: e.target.value })} />
                                </div>
                            </div>
                            <label>Turma:</label>
                            <input type="text" value={form.turma} onChange={(e) => setForm({ ...form, turma: e.target.value })} placeholder="ex: NA, A, B, C, D" />
                            <label>Observação:</label>
                            <input type="text" value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} placeholder="Informações adicionais sobre a turma" />
                            {modalType !== "details" && (
                                <button type="submit" className="btn-purple submit-btn">Salvar</button>
                            )}
                            <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
