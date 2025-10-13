import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = ({ category = null }) => {
    const { handleAgregarAlCarrito } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        let url = "https://dummyjson.com/products?limit=12";
        if (category) {
            url = `https://dummyjson.com/products/category/${category}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.products && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setError("Formato de datos inválido");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(
                    "No se pudieron cargar los productos. Intenta más tarde."
                );
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <div className="text-center p-5">Cargando productos...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="alert alert-info">
                No hay productos disponibles.
            </div>
        );
    }

    return (
        <Row>
            {products.map((product) => (
                <Col md={4} key={product.id} className="mb-4">
                    <ProductCard
                        product={product}
                        agregarAlCarrito={handleAgregarAlCarrito}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
