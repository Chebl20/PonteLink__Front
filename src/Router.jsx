import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Escolas from "./pages/EscolasPage";
import Oficinas from "./pages/Oficinas";
import Turmas from "./pages/Turmas";
import Recursos from "./pages/Recursos";
import Documentos from "./pages/Documentos";
import { Navigate } from "react-router-dom";


import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // <<< IMPORTE A ROTA PROTEGIDA


const router = createBrowserRouter([
    // Rota pública de login
    {
        path: '/login',
        element: <LoginPage />,
    },
    // Rotas protegidas
    {
        path: '/',
        element: <ProtectedRoute />, // Este componente "guarda" as rotas filhas
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
    }
]);

export default router;