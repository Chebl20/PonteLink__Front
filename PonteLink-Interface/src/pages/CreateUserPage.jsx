import React from 'react';
import CreateUserForm from '../components/usuario/CreateUserForm';

export default function CreateUserPage() {
    return (
        // Usaremos as classes do seu layout de dashboard para manter a consistência
        <div className="dashboard-main-content">
            <div className="modal" style={{ animation: 'none', boxShadow: 'none' }}>
                <div className="modal-header">
                    <h3>Criar Novo Usuário</h3>
                </div>
                <p>Preencha os dados abaixo para criar uma nova conta. O usuário receberá o perfil padrão de "gestor".</p>
                <CreateUserForm />
            </div>
        </div>
    );
}