import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";

import { CartProvider } from "./context/CartContext";

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
                    <Route path="/administracion" element={<Login />} />
                </Routes>
                <Footer />
            </CartProvider>
        </Router>
    );
}

export default App;
