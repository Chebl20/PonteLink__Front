import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Escolas from "./pages/Escolas";
import Oficinas from "./pages/Oficinas";
import Turmas from "./pages/Turmas";
import Recursos from "./pages/Recursos";
import Documentos from "./pages/Documentos";



const router = createBrowserRouter([
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
        element:<Recursos/>
    },
    {
        path : '/documentos',
        element:<Documentos/>
    }
]);

export default router;