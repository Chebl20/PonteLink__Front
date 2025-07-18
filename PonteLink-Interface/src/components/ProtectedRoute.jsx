import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    // Se não há usuário, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há usuário, mostra a página solicitada
  return <Outlet />;
}