// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asumo que está en esta ruta

// Outlet renderiza los componentes hijos si la condición es verdadera
// Navigate redirige a otra ruta si la condición es falsa
const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth(); 

    if (!isLoggedIn) {
        // Si NO está logueado, redirige a la ruta de login
        return <Navigate to={"/"} replace />;
    }

    // Si SÍ está logueado, renderiza el contenido (el CrudProductos en este caso)
    return <Outlet />;
};

export default ProtectedRoute;