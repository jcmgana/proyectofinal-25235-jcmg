// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Proveedor del Contexto
export const AuthProvider = ({ children }) => {
    // Inicializar el estado leyendo el localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const [message, setMessage] = useState(null);

    // Función de LOGIN
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Persistir el estado
        setMessage(null);
    };

    // Función de LOGOUT (necesaria para salir de la administración)
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn"); // Eliminar el estado persistido
        toast.info("Has cerrado tu sesión con éxito.");
    };

    // Objeto de valor proporcionado por el contexto
    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
