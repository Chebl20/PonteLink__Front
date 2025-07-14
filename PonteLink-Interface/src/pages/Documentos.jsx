import "../styles/documentos.css";
import { Link } from "react-router-dom";
import { Bell, User, Plus } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function Documentos() {
    const documentos = [
        {
            name: "Documento SEMED",
            type: "PDF",
            status: "Pendente",
        },
        {
            name: "Imagens Oficina de Robótica",
            type: "JPG",
            status: "Enviado",
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
                    <button className="btn-purple">
                        <Plus size={16} style={{ marginRight: "6px" }} /> Novo Documento
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Documentos..." />

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
                        {documentos.map((doc, idx) => (
                            <tr key={idx}>
                                <td>
                                    <div className="doc-name">
                                        <img src={documentosIcon} alt="Doc" />
                                        {doc.name}
                                    </div>
                                </td>
                                <td><strong>{doc.type}</strong></td>
                                <td className={doc.status === "Pendente" ? "status-pendente" : "status-enviado"}>
                                    {doc.status}
                                </td>
                                <td>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <footer className="main-footer">
                <span>© 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>
        </div>
    );
}
