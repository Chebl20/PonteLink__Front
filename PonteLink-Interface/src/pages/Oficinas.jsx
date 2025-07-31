import React, { useState } from "react";
import { Plus } from "lucide-react";
import PageLayout from '../components/PageLayout';
import computadorIcon from "../assets/oficinas.png"; 
import "../styles/oficinas.css";

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
        <PageLayout className="oficinas-page">
            <div className="page-header">
                <h2>Planejamento de Oficinas</h2>
                <button className="btn-purple" onClick={() => setShowModal(true)}>
                    <Plus size={16} /> Nova Oficina
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
        </PageLayout>
    );
}