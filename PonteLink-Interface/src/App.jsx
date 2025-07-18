import { RouterProvider } from 'react-router-dom';
import router from './Router'; // ou './router.js'
import { AuthProvider } from './contexts/AuthContext'; // 1. Importe o AuthProvider

function App() {
  return (
    // 2. Envolva o RouterProvider com o AuthProvider
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;