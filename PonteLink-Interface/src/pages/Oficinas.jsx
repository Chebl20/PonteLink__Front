import "../styles/oficinas.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Plus } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";
import computadorIcon from "../assets/oficinas.png"; 

export default function Oficinas() {
    const [showModal, setShowModal] = useState(false);

    const oficinas = [
        {
            title: "Robótica Educacional",
            description: "Introdução à robótica com kits educacionais para alunos do ensino fundamental.",
            status: "ativa",
            duracao: "2h",
            capacidade: "25 alunos"
        },
        {
            title: "Arte Digital",
            description: "Criação de arte digital usando tablets e softwares educacionais.",
            status: "ativa",
            duracao: "2h",
            capacidade: "20 alunos"
        }
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
                <Link to="/oficinas" className="active">
                    <img src={oficinasIcon} alt="Oficinas" /> Oficinas
                </Link>
                <Link to="/turmas">
                    <img src={turmasIcon} alt="Turmas" /> Turmas
                </Link>
                <Link to="/recursos">
                    <img src={recursosIcon} alt="Recursos" /> Recursos
                </Link>
                <Link to="/documentos">
                    <img src={documentosIcon} alt="Documentos" /> Documentos
                </Link>
            </div>

            <main className="dashboard-main-content">
                <div className="header-oficinas">
                    <h2>Planejamento de Oficinas</h2>
                    <button className="btn-purple" onClick={() => setShowModal(true)}>
                        <Plus size={16} style={{ marginRight: "6px" }} /> Nova Oficina
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Oficinas..." />

                <div className="oficinas-grid">
                    {oficinas.map((oficina, idx) => (
                        <div key={idx} className="oficina-card">
                            <div className="oficina-card-header">
                                <h3>{oficina.title}</h3>
                                <span className="status-ativa">{oficina.status}</span>
                            </div>
                            <p className="oficina-description">{oficina.description}</p>
                            <p><strong>Duração:</strong> {oficina.duracao}</p>
                            <p><strong>Capacidade:</strong> {oficina.capacidade}</p>
                            <div className="oficina-card-buttons">
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

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal wide">
                        <div className="modal-header">
                            <img src={computadorIcon} alt="Icon" />
                            <h3>Planejamento da Oficina</h3>
                        </div>
                        <form className="modal-form">
                            <div className="form-row">
                                <div>
                                    <label>Data:</label>
                                    <input type="date" />
                                </div>
                                <div>
                                    <label>Horário:</label>
                                    <input type="text" placeholder="Ex: 14:00" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div>
                                    <label>Número de Alunos:</label>
                                    <input type="number" />
                                </div>
                                <div>
                                    <label>Professor Responsável:</label>
                                    <input type="text" />
                                </div>
                            </div>
                            <label>Turma:</label>
                            <input type="text" placeholder="ex: NA, A, B, C, D" />
                            <label>Observação:</label>
                            <input type="text" placeholder="Informações adicionais sobre a turma" />
                            <button type="submit" className="btn-purple submit-btn">Cadastrar Oficina</button>
                            <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
