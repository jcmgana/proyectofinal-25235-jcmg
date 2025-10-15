import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Row, Col, Modal, Container, Button, ButtonGroup } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const ProductList = ({ category = null }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    
        const categories = [
            { name: "Todos", value: null },
            { name: "Smartphones", value: "smartphones" },
            { name: "Notebooks", value: "laptops" },
            { name: "Fragancias", value: "fragrances" },
            { name: "Skincare", value: "skincare" },
            { name: "Groceries", value: "groceries" },
        ];

    const { handleAgregarAlCarrito } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError("No se pudieron cargar los productos. Intenta más tarde.");
                setLoading(false);
            });
    }, [category]);

    if (loading) return <Spinner />;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (products.length === 0)
        return <div className="alert alert-info">No hay productos disponibles.</div>;

    return (
        <Container>
        <Container className="py-4">
            <h1 className="mb-4">Tienda de Productos</h1>

            <div className="mb-4">
                <h5>Filtrar por categoría:</h5>
                <ButtonGroup>
                    {categories.map((cat) => (
                        <Button
                            key={cat.value}
                            variant={
                                selectedCategory === cat.value
                                    ? "primary"
                                    : "outline-primary"
                            }
                            
                            onClick={() => setSelectedCategory(cat.value)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </Container>
        <Container className="py-4">
            <Row>
                {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <ProductCard
                            product={product}
                            agregarAlCarrito={handleAgregarAlCarrito}
                            masInfo={handleShowModal}
                        />
                    </Col>
                ))}
            </Row>

            {/* Modal con ProductDetail */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProduct ? selectedProduct.title : "Detalles del Producto"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct ? (
                        <ProductDetail id={selectedProduct.id} modalMode />
                    ) : (
                        <p>Cargando detalles...</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
        </Container>
    );
};

export default ProductList;
