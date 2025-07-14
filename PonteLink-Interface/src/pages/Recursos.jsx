import "../styles/recursos.css";
import { Link } from "react-router-dom";
import { Bell, User, Plus } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function Recursos() {
    const recursos = [
        {
            title: "Sala 101",
            escola: "E.M. João da Silva",
            local: "Bloco A, 1º andar",
            capacidade: "25 alunos",
            tipo: "Sala",
        },
        {
            title: "Laboratório de Informática",
            escola: "E.E. Maria Santos",
            local: "Bloco B, 2º andar",
            capacidade: "25 alunos",
            tipo: "laboratório",
        },
    ];

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
                <Link to="/recursos" className="active">
                    <img src={recursosIcon} alt="Recursos" /> Recursos
                </Link>
                <Link to="/documentos">
                    <img src={documentosIcon} alt="Documentos" /> Documentos
                </Link>
            </div>

            <main className="dashboard-main-content">
                <div className="header-recursos">
                    <h2>Gestão de Recursos</h2>
                    <button className="btn-purple">
                        <Plus size={16} style={{ marginRight: "6px" }} /> Novo Recurso
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Recursos..." />

                <div className="recursos-grid">
                    {recursos.map((recurso, idx) => (
                        <div key={idx} className="recurso-card">
                            <div className="recurso-card-header">
                                <h3>{recurso.title}</h3>
                                <span className="tipo-tag">{recurso.tipo}</span>
                            </div>
                            <p>{recurso.escola}</p>
                            <p>{recurso.local}</p>
                            <p><strong>Capacidade:</strong> {recurso.capacidade}</p>
                            <div className="recurso-card-buttons">
                                <button className="btn-editar">Editar</button>
                                <button className="btn-detalhes">Ver Detalhes</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="main-footer">
                <span>© 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>
        </div>
    );
}
