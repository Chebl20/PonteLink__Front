import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { Bell, User, LayoutDashboard, Plus, School, Cog } from "lucide-react";
import dashboardIcon from "../assets/dashboard.png";
import escolasIcon from "../assets/escolas.png";
import oficinasIcon from "../assets/oficinas.png";
import turmasIcon from "../assets/turmas.png";
import recursosIcon from "../assets/recursos.png";
import documentosIcon from "../assets/documentos.png";

export default function Dashboard() {
    const stats = [
        { label: "Escolas Cadastradas", value: 10 },
        { label: "Oficinas Ativas", value: 8 },
        { label: "Turmas Cadastradas", value: 4 },
        { label: "Docs Pendentes", value: 10 },
    ];

    const oficinas = [
        {
            date: "2",
            title: "Oficina de Robótica",
            school: "Escola Municipal Santos Dumont",
            time: "14:00-16:00",
            inscritos: 25,
        },
        {
            date: "10",
            title: "Arte Digital",
            school: "Colégio Estadual Dom Pedro",
            time: "09:00-11:00",
            inscritos: 18,
        },
        {
            date: "24",
            title: "Programação para Iniciantes",
            school: "EMEF Monteiro Lobato",
            time: "15:30-17:30",
            inscritos: 30,
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
                <Link to="/dashboard" className="active">
                    <img src={dashboardIcon} alt="Dashboard" />
                    Dashboard
                </Link>
                <Link to="/escolas">
                    <img src={escolasIcon} alt="Escolas" />
                    Escolas
                </Link>
                <Link to="/oficinas">
                    <img src={oficinasIcon} alt="Oficinas" />
                    Oficinas
                </Link>
                <Link to="/turmas">
                    <img src={turmasIcon} alt="Turmas" />
                    Turmas
                </Link>
                <Link to="/recursos">
                    <img src={recursosIcon} alt="Recursos" />
                    Recursos
                </Link>
                <Link to="/documentos">
                    <img src={documentosIcon} alt="Documentos" />
                    Documentos
                </Link>
            </div>

            <main className="dashboard-main-content">
                <div className="dashboard-stats">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="stat-card">
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-container">
                    <div className="actions-card">
                        <h2>Ações Rápidas</h2>
                        <button className="btn-purple">
                            <Plus size={16} style={{ marginRight: "6px" }} /> Novas Oficinas
                        </button>
                        <button className="btn-dark-purple">
                            <Plus size={16} style={{ marginRight: "6px" }} />Cadastrar Escola
                        </button>
                        <button className="btn-light-purple">
                            <Plus size={16} style={{ marginRight: "6px" }} />Cadastrar Turma
                        </button>
                    </div>

                    <div className="oficinas-card">
                        <h2>Próximas Oficinas</h2>
                        {oficinas.map((oficina, idx) => (
                            <div key={idx} className="oficina-item">
                                <div className="oficina-date">{oficina.date}</div>
                                <div className="oficina-content">
                                    <div className="oficina-title">{oficina.title}</div>
                                    <div className="oficina-school-time">
                                        {oficina.school} • {oficina.time}
                                    </div>
                                    <div className="oficina-inscritos">
                                        {oficina.inscritos} alunos inscritos
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer className="main-footer">
                <span>© 2025 PonteLink. Todos os direitos reservados.</span>
            </footer>
        </div>
    );
}
