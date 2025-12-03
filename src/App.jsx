import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Ofertas from "./components/Ofertas";
import Infaltables from "./components/Infaltables";
import Contacto from "./components/Contacto";
import Login from "./components/Login";
import BotonCarritoFlotante from "./components/BotonCarritoFlotante";
import CrudProductos from "./components/CrudProductos";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tienda" element={<ProductList />} />
                    <Route path="/tienda/:id" element={<ProductDetail />} />
                    <Route path="/ofertas" element={<Ofertas />} />
                    <Route path="/infaltables" element={<Infaltables />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/administracion" element={<Login />} />
                    <Route element={<ProtectedRoute redirectTo="/login" />}>
                        {/* Cualquier ruta dentro de este Route requiere autenticación.
                        Si no estás logueado, serás redirigido a /login. */}
                        <Route
                            path="/crudproductos"
                            element={<CrudProductos />}
                        />
                    </Route>{" "}
                    <Route
                        path="*"
                        element={<h2>404 - Página no encontrada</h2>}
                    />
                </Routes>
                <BotonCarritoFlotante />
                <Footer />
            </CartProvider>
        </Router>
    );
}

export default App;
