// src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AdminRoute() {
    // 1. Acessamos os dados do nosso "gerente de sessão" (o AuthContext)
    //    Pegamos o usuário, seu perfil, e o estado de carregamento.
    const { user, profile, loading } = useAuth();

    // 2. Se ainda estamos verificando quem é o usuário e qual seu perfil,
    //    exibimos uma mensagem de "carregando". Isso é CRUCIAL para evitar
    //    redirecionamentos incorretos antes dos dados estarem prontos.
    if (loading) {
        return <p>Verificando permissões...</p>; // Você pode substituir por um componente de Spinner
    }

    // 3. A verificação de segurança principal:
    //    - O usuário NÃO está logado? (user é nulo)
    //    - OU O perfil do usuário NÃO é 'admin'?
    if (!user || profile?.perfil !== 'admin') {
        // Se qualquer uma das condições for verdadeira, o acesso é negado.
        // Redirecionamos o usuário para o dashboard principal. Isso é melhor que
        // a tela de login, pois ele pode ser um usuário comum já logado.
        return <Navigate to="/dashboard" replace />;
    }

    // 4. Se o usuário está logado E é um admin, o segurança libera a passagem.
    //    O <Outlet /> é o componente do React Router que renderiza a rota filha
    //    (no nosso caso, a CreateUserPage).
    return <Outlet />;
}