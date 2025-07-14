import "../styles/escolas.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Bell, User, Plus } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function Escolas() {
    const [showModal, setShowModal] = useState(false);

    const escolas = [
        {
            nome: "EMEF Santos Dumont",
            endereco: "Rua das Flores, 123",
            alunos: 245,
            status: "ativa",
        },
        {
            nome: "Colégio Dom Pedro",
            endereco: "Av. Principal, 456",
            alunos: 245,
            status: "ativa",
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
                <Link to="/escolas" className="active">
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
                <Link to="/documentos">
                    <img src={documentosIcon} alt="Documentos" /> Documentos
                </Link>
            </div>

            <main className="dashboard-main-content">
                <div className="header-escolas">
                    <h2>Gerenciamento de Escolas</h2>
                    <button className="btn-purple" onClick={() => setShowModal(true)}>
                        <Plus size={16} style={{ marginRight: "6px" }} /> Nova Escola
                    </button>
                </div>

                <input type="text" className="search-input" placeholder="Buscar Escolas..." />

                <table className="escolas-table">
                    <thead>
                        <tr>
                            <th>Escola</th>
                            <th>Alunos</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {escolas.map((escola, idx) => (
                            <tr key={idx}>
                                <td>
                                    <strong>{escola.nome}</strong>
                                    <div className="endereco">{escola.endereco}</div>
                                </td>
                                <td className="td-alunos">{escola.alunos}</td>
                                <td>
                                    <span className="status-ativa">ativa</span>
                                </td>
                                <td>
                                    <button className="btn-editar">Editar</button>
                                    <button className="btn-detalhes">Ver Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <img src={escolasIcon} alt="Escola" />
                                <h3>Cadastrar Escola</h3>
                            </div>
                            <form className="modal-form">
                                <label>Nome Escola:</label>
                                <input type="text" />

                                <label>Nome do Diretor:</label>
                                <input type="text" />

                                <div className="form-row">
                                    <div>
                                        <label>Telefone:</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label>E-mail:</label>
                                        <input type="email" />
                                    </div>
                                </div>

                                <label>Nome do Mediador/Responsável:</label>
                                <input type="text" />

                                <div className="form-row">
                                    <div>
                                        <label>Telefone:</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label>E-mail:</label>
                                        <input type="email" />
                                    </div>
                                </div>

                                <label>Localização:</label>
                                <input type="text" />

                                <button type="submit" className="btn-purple submit-btn">Cadastrar Escola</button>
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <footer className="main-footer">
                <span>© 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>
        </div>
    );
}
