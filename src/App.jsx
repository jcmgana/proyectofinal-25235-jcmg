import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Carrito from "./components/CartOffcanvas";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<ProductList />} />
                </Routes>
                <Footer />
            </CartProvider>
        </Router>
    );
}

export default App;
