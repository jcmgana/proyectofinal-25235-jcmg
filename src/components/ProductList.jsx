import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Row, Col, Modal, Container, Form, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import Spinner from "./Spinner";

const ProductList = ({ category = null }) => {
    const { handleAgregarAlCarrito } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [barraDeBusqueda, setBarraDeBusqueda] = useState("");


    // Estados del Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    useEffect(() => {
        
        setLoading(true); // Reinicia el estado de carga al cambiar la categoría
        setError(null);

        let url = "https://692dfd5fe5f67cd80a4d9a1e.mockapi.io/productos";
        const isDummyJson = !!category; // Identificar si estamos usando dummyjson

        if (isDummyJson) {
            url = `https://dummyjson.com/products/category/${category}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                let productData = data;
                if (isDummyJson && data.products) {
                    productData = data.products;
                }

                setProducts(productData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Error al cargar los productos. Inténtelo de nuevo.");
                setLoading(false);
            });
    }, [category]);

    if (loading) return <Spinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    if (products.length === 0 && !barraDeBusqueda) {
        return (
            <Alert variant="info">
                No se encontraron productos en esta categoría.
            </Alert>
        );
    }

    const filteredProducts = (Array.isArray(products) ? products : []).filter(
        (product) =>
            (product.title &&
                product.title
                    .toLowerCase()
                    .includes(barraDeBusqueda.toLowerCase())) ||
            (product.description &&
                product.description
                    .toLowerCase()
                    .includes(barraDeBusqueda.toLowerCase()))
    );

    return (
        <Container>
            <Form.Control
                type="text"
                placeholder="Buscar Productos"
                className="mb-4"
                value={barraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            ></Form.Control>

            <Row>
                {filteredProducts.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <ProductCard
                            product={product}
                            agregarAlCarrito={handleAgregarAlCarrito}
                            handleShowModal={handleShowModal}
                        />
                    </Col>
                ))}
            </Row>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProduct
                            ? selectedProduct.title
                            : "Detalles del Producto"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct ? (
                        <ProductDetail
                            id={selectedProduct.id}
                            onClose={handleCloseModal}
                        />
                    ) : (
                        <p>Cargando detalles...</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ProductList;
