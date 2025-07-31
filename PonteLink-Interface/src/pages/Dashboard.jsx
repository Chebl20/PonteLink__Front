// src/pages/Dashboard.jsx
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../supaBaseClient";
import PageLayout from "../components/PageLayout";

export default function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: "Escolas Cadastradas", value: 0 },
        { label: "Oficinas Ativas", value: 0 },
        { label: "Turmas Cadastradas", value: 0 },
        { label: "Docs Pendentes", value: 0 },
    ]);
    const [oficinas, setOficinas] = useState([]);

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
                { label: "Escolas Cadastradas", value: escolasCount || 0 },
                { label: "Oficinas Ativas", value: oficinasCount || 0 },
                { label: "Turmas Cadastradas", value: turmasCount || 0 },
                { label: "Docs Pendentes", value: docsCount || 0 },
            ]);

            const hoje = new Date();
            const trintaDiasDepois = new Date();
            trintaDiasDepois.setDate(hoje.getDate() + 30);

            const { data: proximasOficinas } = await supabase
                .from('oficinas')
                .select(`
                    *,
                    escolas (
                        nome
                    )
                `)
                .gte('data_hora', hoje.toISOString())
                .lte('data_hora', trintaDiasDepois.toISOString())
                .order('data_hora', { ascending: true })
                .limit(3);

            if (proximasOficinas) {
                const oficinasFormatadas = proximasOficinas.map(oficina => {
                    const data = new Date(oficina.data_hora);
                    const horaInicio = data.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const horaFim = new Date(data.getTime() + 2 * 60 * 60 * 1000)
                        .toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });

                    return {
                        date: data.getDate().toString(),
                        title: oficina.titulo || 'Oficina sem título',
                        school: oficina.escolas?.nome || 'Escola não especificada',
                        time: `${horaInicio}-${horaFim}`,
                        inscritos: oficina.total_inscritos || 0,
                    };
                });
                setOficinas(oficinasFormatadas);
            }

        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNovaOficina = () => navigate('/oficinas/nova');
    const handleCadastrarEscola = () => navigate('/escolas/nova');
    const handleCadastrarTurma = () => navigate('/turmas/nova');

    return (
        <PageLayout className="dashboard-page">
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner">Carregando dados...</div>
                </div>
            ) : (
                <>
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

                        <div className="oficinas-card">
                            <h2>Próximas Oficinas</h2>
                            {oficinas.length > 0 ? (
                                oficinas.map((oficina, idx) => (
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
                                ))
                            ) : (
                                <div className="no-oficinas">
                                    <p>Nenhuma oficina agendada para os próximos dias</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </PageLayout>
    );
}