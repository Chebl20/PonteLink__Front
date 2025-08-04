import React from 'react';
import { Link } from 'react-router-dom';

const TurmaList = ({ turmas }) => {
    return (
        <div>
            <h2>Turmas</h2>
            <Link to="/turmas/nova">Adicionar Turma</Link>
            <ul>
                {turmas.map(turma => (
                    <li key={turma.id}>
                        <Link to={`/turmas/${turma.id}`}>{turma.nome}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TurmaList;
