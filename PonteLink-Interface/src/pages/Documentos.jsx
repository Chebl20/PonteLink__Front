import "../styles/documentos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Plus, Loader2, X, Trash2, Edit3 } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";
import { supabase } from "../supaBaseClient";

const initialForm = {
    escola_id: "",
    oficina_id: "",
    tipo_documento: "",
    status: "pendente",
    quantidade_enviada: ""
};

export default function Documentos() {
    const [documentos, setDocumentos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // add | edit | details
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDocumentos();
    }, []);

    async function fetchDocumentos() {
        setLoading(true);
        setError("");
        let query = supabase.from('documentos').select('*').order('data_atualizacao', { ascending: false });
        if (search) query = query.ilike('tipo_documento', `%${search}%`);
        const { data, error } = await query;
        if (error) setError("Erro ao buscar documentos");
        else setDocumentos(data);
        setLoading(false);
    }

    function openModal(type, doc=null) {
        setModalType(type);
        setShowModal(true);
        setSelected(doc);
        setForm(doc ? {
            ...doc
        } : initialForm);
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
            const { error } = await supabase.from('documentos').insert([form]);
            if (error) setError("Erro ao cadastrar documento");
        } else if (modalType === "edit" && selected) {
            const { error } = await supabase.from('documentos').update(form).eq('id', selected.id);
            if (error) setError("Erro ao atualizar documento");
        }
        closeModal();
        fetchDocumentos();
    }

    async function handleDelete(id) {
        if (!window.confirm("Deseja realmente excluir este documento?")) return;
        setLoading(true);
        await supabase.from('documentos').delete().eq('id', id);
        fetchDocumentos();
    }

    return (
        <div className="dashboard-page">
            <div className="top-bar">
                <div className="logo">PonteLink</div>
                <div className="header-actions">
                    <button className="notif-btn">
                        <Bell size={18} color="#f3d512" /> Notificações
                    </button>
                    <button className="admin-btn">
                        <User size={18} /> Gestor Admin
                    </button>
                </div>
            </div>

            <div className="nav-bar">
                <Link to="/dashboard">
                    <img src={dashboardIcon} alt="Dashboard" /> Dashboard
                </Link>
                <Link to="/escolas">
                    <img src={escolasIcon} alt="Escolas" /> Escolas
                </Link>
                <Link to="/oficinas">
                    <img src={oficinasIcon} alt="Oficinas" /> Oficinas
                </Link>
                <Link to="/turmas">
                    <img src={turmasIcon} alt="Turmas" /> Turmas
                </Link>
                <Link to="/recursos">
                    <img src={recursosIcon} alt="Recursos" /> Recursos
                </Link>
                <Link to="/documentos" className="active">
                    <img src={documentosIcon} alt="Documentos" /> Documentos
                </Link>
            </div>

            <main className="dashboard-main-content">
                <div className="header-documentos">
                    <h2>Gestão de Documentos</h2>
                    <button className="btn-purple" onClick={() => openModal("add")}> 
                        <Plus size={16} style={{ marginRight: "6px" }} /> Novo Documento
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Documentos..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&fetchDocumentos()} />

                {loading && <div className="loading"><Loader2 className="spin" /> Carregando...</div>}
                {error && <div className="error">{error}</div>}

                <table className="documentos-table">
                    <thead>
                        <tr>
                            <th>Nome Documento</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentos.map((doc) => (
                            <tr key={doc.id}>
                                <td>
                                    <div className="doc-name">
                                        <img src={documentosIcon} alt="Doc" />
                                        {doc.tipo_documento}
                                    </div>
                                </td>
                                <td><strong>{doc.tipo_documento?.toUpperCase()}</strong></td>
                                <td className={doc.status === "pendente" ? "status-pendente" : "status-enviado"}>
                                    {doc.status?.charAt(0).toUpperCase() + doc.status?.slice(1)}
                                </td>
                                <td>
                                    <button className="btn-detalhes" onClick={()=>openModal("details", doc)}>Ver Detalhes</button>
                                    <button className="btn-editar" onClick={()=>openModal("edit", doc)}><Edit3 size={16}/></button>
                                    <button className="btn-delete" onClick={()=>handleDelete(doc.id)}><Trash2 size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer className="main-footer">
                <span> 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={documentosIcon} alt="Icon" />
                            <h3>{modalType==="add"?"Novo Documento":modalType==="edit"?"Editar Documento":"Detalhes do Documento"}</h3>
                            <button className="btn-close" onClick={closeModal}><X /></button>
                        </div>
                        {modalType!=="details" ? (
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label>Escola ID:</label>
                            <input type="number" value={form.escola_id} onChange={e=>setForm(f=>({...f, escola_id:e.target.value}))} required />
                            <label>Oficina ID:</label>
                            <input type="number" value={form.oficina_id} onChange={e=>setForm(f=>({...f, oficina_id:e.target.value}))} required />
                            <label>Tipo de Documento:</label>
                            <input type="text" value={form.tipo_documento} onChange={e=>setForm(f=>({...f, tipo_documento:e.target.value}))} required />
                            <label>Status:</label>
                            <select value={form.status} onChange={e=>setForm(f=>({...f, status:e.target.value}))} required>
                                <option value="pendente">Pendente</option>
                                <option value="enviado">Enviado</option>
                                <option value="recebido">Recebido</option>
                                <option value="aprovado">Aprovado</option>
                            </select>
                            <label>Quantidade Enviada:</label>
                            <input type="number" value={form.quantidade_enviada} onChange={e=>setForm(f=>({...f, quantidade_enviada:e.target.value}))} required />
                            <button type="submit" className="btn-purple submit-btn">{modalType==="add"?"Cadastrar Documento":"Salvar Alterações"}</button>
                            <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                        </form>
                        ) : (
                        <div className="modal-form">
                            <p><strong>ID:</strong> {selected?.id}</p>
                            <p><strong>Escola ID:</strong> {selected?.escola_id}</p>
                            <p><strong>Oficina ID:</strong> {selected?.oficina_id}</p>
                            <p><strong>Tipo:</strong> {selected?.tipo_documento}</p>
                            <p><strong>Status:</strong> {selected?.status}</p>
                            <p><strong>Quantidade Enviada:</strong> {selected?.quantidade_enviada}</p>
                            <p><strong>Quantidade Recebida:</strong> {selected?.quantidade_recebida}</p>
                            <p><strong>Data Atualização:</strong> {selected?.data_atualizacao ? new Date(selected.data_atualizacao).toLocaleString() : '-'}</p>
                        </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
