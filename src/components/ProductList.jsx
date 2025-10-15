import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
    Row,
    Col,
    Modal,
    Container,
    Button,
    ButtonGroup,
    Alert, // Importar Alert para mensajes
} from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const categoriasTodos = [
    // Categorías curadas para "Todos"
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
];

const ITEMS_POR_CATEGORIA = 12; // Número de ítems a cargar por categoría

const ProductList = () => {
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
        const fetchProducts = async () => {
            try {
                let fetchedProducts = [];

                if (selectedCategory) {
                    // 1. Si hay una categoría seleccionada (ej: Laptops), hacemos una sola llamada
                    const url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${ITEMS_POR_CATEGORIA}`;
                    const response = await fetch(url);
                    if (!response.ok)
                        throw new Error(`Error: ${response.status}`);
                    const data = await response.json();

                    fetchedProducts = data.products || [];
                } else {
                    // 2. Si es 'Todos' (selectedCategory es null), combinamos las llamadas

                    // Creamos un array de promesas de fetch, una por cada categoría curada
                    const promises = categoriasTodos.map((cat) =>
                        fetch(
                            `https://dummyjson.com/products/category/${cat}?limit=${ITEMS_POR_CATEGORIA}`
                        ).then((res) => res.json())
                    );

                    // Esperamos a que todas las promesas se resuelvan
                    const results = await Promise.all(promises);

                    // Combinamos todos los arrays de productos en uno solo
                    fetchedProducts = results.flatMap(
                        (data) => data.products || []
                    );
                }

                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(
                    "No se pudieron cargar los productos. Intenta más tarde."
                );
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    // Renderizado de la lista de botones de categoría
    const CategoryButtons = () => (
        <div className="mb-4">
            <h5>Filtrar por categoría:</h5>
            <ButtonGroup className="flex-wrap">
                {categories.map((cat) => (
                    <Button
                        key={cat.value || "all"}
                        variant={
                            selectedCategory === cat.value
                                ? "primary"
                                : "outline-primary"
                        }
                        onClick={() => setSelectedCategory(cat.value)}
                        className="mb-2 me-2" // Añade margen para evitar que se peguen en móvil
                    >
                        {cat.name}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );

    // Si la carga o el error son definitivos, regresamos el componente inmediatamente
    if (loading) return <Spinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <Container className="py-4">
                <h1 className="mb-4">Tienda de Productos</h1>
                <CategoryButtons />
            </Container>

            <Container className="py-4">
                {products.length === 0 ? (
                    <Alert variant="info" className="text-center py-5">
                        <h4 className="alert-heading">¡Lista vacía!</h4>
                        <p>
                            No hay productos disponibles en la categoría
                            seleccionada (
                            <strong className="text-capitalize">
                                {categories.find(
                                    (c) => c.value === selectedCategory
                                )?.name || "Todos"}
                            </strong>
                            ). Por favor, selecciona otra categoría.
                        </p>
                    </Alert>
                ) : (
                    // Si hay productos, renderiza la lista
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
                )}
            </Container>

            <Button variant="outline-primary" className="d-flex mx-auto mb-4">
                Cargar más productos
            </Button>

            {/* Modal con ProductDetail */}
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
