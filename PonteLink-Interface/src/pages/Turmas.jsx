import "../styles/turmas.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Plus } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";
import turmasIconLarge from "../assets/turmas.png"; 

export default function Turmas() {
    const [showModal, setShowModal] = useState(false);

    const turmas = [
        {
            escola: "EMEF Santos Dumont",
            endereco: "Rua das Flores, 123",
            turma: "5 ano A",
            turno: "Manhã",
        },
        {
            escola: "Colégio Dom Pedro",
            endereco: "Av. Principal, 456",
            turma: "7 ano B",
            turno: "Tarde",
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
                <Link to="/turmas" className="active">
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
                <div className="header-turmas">
                    <h2>Turmas Cadastradas</h2>
                    <button className="btn-purple" onClick={() => setShowModal(true)}>
                        <Plus size={16} style={{ marginRight: "6px" }} /> Nova Turma
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Turmas..." />

                <div className="turmas-table">
                    <div className="turmas-table-header">
                        <span>Escola</span>
                        <span>Turma</span>
                        <span>Turno</span>
                        <span>Ações</span>
                    </div>

                    {turmas.map((turma, idx) => (
                        <div key={idx} className="turmas-table-row">
                            <div>
                                <img src={escolasIcon} alt="Escola" />
                                <div>
                                    <strong>{turma.escola}</strong>
                                    <p>{turma.endereco}</p>
                                </div>
                            </div>
                            <span className="turma-nome">{turma.turma}</span>
                            <span>{turma.turno}</span>
                            <span>
                                <button className="btn-editar">Editar</button>
                                <button className="btn-detalhes">Ver Detalhes</button>
                            </span>
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
                            <img src={turmasIconLarge} alt="Icon" />
                            <h3>Cadastrar Turma</h3>
                        </div>
                        <form className="modal-form">
                            <label>Escola:</label>
                            <input type="text" placeholder="Nome da Escola" />
                            <label>Nome da Turma:</label>
                            <input type="text" placeholder="ex: 5 ano A" />
                            <div className="form-row">
                                <div>
                                    <label>Série:</label>
                                    <input type="text" />
                                </div>
                                <div>
                                    <label>Turno:</label>
                                    <input type="text" />
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
                            <label>Observação:</label>
                            <input type="text" placeholder="Informações adicionais sobre a turma" />
                            <button type="submit" className="btn-purple submit-btn">Cadastrar Turma</button>
                            <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
