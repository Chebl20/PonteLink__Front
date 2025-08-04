import { createBrowserRouter, Navigate } from "react-router-dom";

// Importe suas páginas
import Dashboard from "./pages/Dashboard";
import Escolas from "./pages/EscolasPage";
import Oficinas from "./pages/Oficinas";
import Turmas from "./pages/Turmas";
import Recursos from "./pages/Recursos";
import Documentos from "./pages/Documentos";
import LoginPage from "./pages/LoginPage.jsx";
import CreateUserPage from "./pages/CreateUserPage";


// Importe os componentes de rota
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx"; // <<< 2. IMPORTE A ROTA DE ADMIN

const router = createBrowserRouter([
    // Rota pública de login
    {
        path: '/login',
        element: <LoginPage />,
    },

    // Rotas protegidas para QUALQUER usuário logado
    {
        path: '/',
        element: <ProtectedRoute />, // Segurança Padrão
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/escolas',
                element: <Escolas />
            },
            {
                path: '/oficinas',
                element: <Oficinas />
            },
            {
                path: '/turmas',
                element: <Turmas />
            },
            
            {
                path: '/recursos',
                element: <Recursos />
            },
            {
                path: '/documentos',
                element: <Documentos />
            }
        ]
    },

    // <<< 3. NOVO GRUPO DE ROTAS APENAS PARA ADMINISTRADORES
    {
        element: <AdminRoute />, // Segurança de Admin
        children: [
            {
                path: '/admin/criar-usuario',
                element: <CreateUserPage />
            }
            // Você pode adicionar mais rotas de admin aqui no futuro
            // Ex: { path: '/admin/gerenciar-escolas', element: <GerenciarEscolas /> }
        ]
    }
]);

export default router;