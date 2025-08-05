import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Plus, School, BookOpen, Users, FileWarning, Calendar, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../supaBaseClient";
import PageLayout from "../components/PageLayout";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: "Escolas Cadastradas", value: 0, icon: <School color="#7e5bbe" />, color: '#f5f3ff' },
        { label: "Oficinas Ativas", value: 0, icon: <BookOpen color="#5B3F9E" />, color: '#f3f0ff' },
        { label: "Turmas Cadastradas", value: 0, icon: <Users color="#4A3283" />, color: '#f3f3f3' },
        { label: "Docs Pendentes", value: 0, icon: <FileWarning color="#eab308" />, color: '#fffbe6' },
    ]);
    const [cronogramaOficinas, setCronogramaOficinas] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const { count: escolasCount } = await supabase
                .from('escolas')
                .select('*', { count: 'exact', head: true });

            const { count: oficinasCount } = await supabase
                .from('oficinas')
                .select('*', { count: 'exact', head: true })
                .in('status', ['agendada', 'em_andamento']);

            const { count: turmasCount } = await supabase
                .from('turmas')
                .select('*', { count: 'exact', head: true });

            const { count: docsCount } = await supabase
                .from('documentos')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'pendente');

            setStats([
                { label: "Escolas Cadastradas", value: escolasCount || 0, icon: <School color="#7e5bbe" />, color: '#f5f3ff' },
                { label: "Oficinas Ativas", value: oficinasCount || 0, icon: <BookOpen color="#5B3F9E" />, color: '#f3f0ff' },
                { label: "Turmas Cadastradas", value: turmasCount || 0, icon: <Users color="#4A3283" />, color: '#f3f3f3' },
                { label: "Docs Pendentes", value: docsCount || 0, icon: <FileWarning color="#eab308" />, color: '#fffbe6' },
            ]);

            const hoje = new Date();
            const quinzeDiasDepois = new Date();
            quinzeDiasDepois.setDate(hoje.getDate() + 15);

            const { data: proximasOficinas } = await supabase
                .from('oficinas')
                .select(`*, escolas (nome)`)
                .gte('data_hora', hoje.toISOString()) // apenas oficinas futuras
                .order('data_hora', { ascending: true });


            if (proximasOficinas) {
                const oficinasFormatadas = proximasOficinas.map(oficina => {
                    const data = new Date(oficina.data_hora);
                    const dataFormatada = data.toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit'
                    });
                    const horaInicio = data.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const horaFim = new Date(data.getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    return {
                        id: oficina.id,
                        titulo: oficina.titulo || 'Oficina sem título',
                        escola: oficina.escolas?.nome || 'Escola não especificada',
                        data: dataFormatada,
                        dataCompleta: data,
                        horario: `${horaInicio} - ${horaFim}`,
                        inscritos: oficina.total_inscritos || 0,
                        status: oficina.status,
                        local: oficina.local || 'Local não definido'
                    };
                });

                setCronogramaOficinas(oficinasFormatadas);
            }

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'agendada': return '#4CAF50';
            case 'em_andamento': return '#FF9800';
            case 'finalizada': return '#9E9E9E';
            case 'cancelada': return '#F44336';
            default: return '#2196F3';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'agendada': return 'Agendada';
            case 'em_andamento': return 'Em Andamento';
            case 'finalizada': return 'Finalizada';
            case 'cancelada': return 'Cancelada';
            default: return 'Pendente';
        }
    };

    const handleNovaOficina = () => navigate('/oficinas', { state: { abrirModal: true }});
    const handleCadastrarEscola = () => navigate('/escolas', { state: { abrirModal: true }});
    const handleCadastrarTurma = () => navigate('/turmas', { state: { abrirModal: true }});
    return (
        <PageLayout className="dashboard-page">
            {loading ? (
                <div className="loading-container-dashboard">
                    <div className="loading-spinner-dashboard"></div>
                </div>
            ) : (
                <>
                    <div className="dashboard-stats">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="stat-card" style={{ background: stat.color }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <span style={{
                                        background: '#fff', borderRadius: '50%', boxShadow: '0 2px 8px #e9e6f7',
                                        padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>{stat.icon}</span>
                                    <span className="stat-value">{stat.value}</span>
                                </div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid-container">
                        <div className="actions-card">
                            <h2>Ações Rápidas</h2>
                            <button className="btn-purple" onClick={handleNovaOficina}>
                                <Plus size={16} />
                                <span>Novas Oficinas</span>
                            </button>
                            <button className="btn-dark-purple" onClick={handleCadastrarEscola}>
                                <Plus size={16} />
                                <span>Cadastrar Escola</span>
                            </button>
                            <button className="btn-light-purple" onClick={handleCadastrarTurma}>
                                <Plus size={16} />
                                <span>Cadastrar Turma</span>
                            </button>
                        </div>

                        <div className="cronograma-card">
                            <div className="cronograma-header">
                                <h2>
                                    <Calendar size={20} />
                                    Cronograma de Oficinas
                                </h2>
                                <span className="cronograma-subtitle">Próximas Oficinas</span>
                            </div>

                            {cronogramaOficinas.length > 0 ? (
                                <div className="cronograma-table">
                                    <div className="cronograma-table-header">
                                        <div className="col-data">Data</div>
                                        <div className="col-horario">Horário</div>
                                        <div className="col-oficina">Oficina</div>
                                        <div className="col-escola">Escola</div>
                                        <div className="col-inscritos">Inscritos</div>
                                        <div className="col-status">Status</div>
                                    </div>
                                    <div className="cronograma-table-body">
                                        {cronogramaOficinas.map((oficina) => (
                                            <div key={oficina.id} className="cronograma-row">
                                                <div className="col-data">
                                                    <div className="data-badge">{oficina.data}</div>
                                                </div>
                                                <div className="col-horario">
                                                    <Clock size={14} />
                                                    <span>{oficina.horario}</span>
                                                </div>
                                                <div className="col-oficina">
                                                    <div className="oficina-info">
                                                        <div className="oficina-titulo">{oficina.titulo}</div>
                                                        <div className="oficina-local">
                                                            <MapPin size={12} /> {oficina.local}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-escola">{oficina.escola}</div>
                                                <div className="col-inscritos">
                                                    <div className="inscritos-badge">
                                                        <Users size={14} /> {oficina.inscritos}
                                                    </div>
                                                </div>
                                                <div className="col-status">
                                                    <span className="status-badge" style={{ backgroundColor: getStatusColor(oficina.status) }}>
                                                        {getStatusText(oficina.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="no-oficinas-cronograma">
                                    <Calendar size={48} />
                                    <p>Nenhuma oficina agendada para os próximos 15 dias</p>
                                    <button className="btn-purple" onClick={handleNovaOficina}>
                                        <Plus size={16} /> Agendar Primeira Oficina
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </PageLayout>
    );
}
