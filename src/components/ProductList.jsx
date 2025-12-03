import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Row, Col, Modal, Container, Form, Alert, Pagination } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import Spinner from "./Spinner";

const ProductList = ({ category = null }) => {
    const { handleAgregarAlCarrito } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [barraDeBusqueda, setBarraDeBusqueda] = useState("");

    // Estados de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6); // 6 productos por página (3x2)

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
        setCurrentPage(1); // Reiniciar a la primera página al cambiar categoría

        let url = "https://692dfd5fe5f67cd80a4d9a1e.mockapi.io/productos";
        const isDummyJson = !!category;

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

    // Resetear a la primera página cuando cambia la búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [barraDeBusqueda]);

    if (loading) return <Spinner />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    if (products.length === 0 && !barraDeBusqueda) {
        return (
            <Alert variant="info">
                No se encontraron productos en esta categoría.
            </Alert>
        );
    }

    // Filtrar productos
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

    // Calcular índices de paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calcular número total de páginas
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Cambiar de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generar items de paginación
    const renderPaginationItems = () => {
        let items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Mostrar todas las páginas si son pocas
            for (let number = 1; number <= totalPages; number++) {
                items.push(
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </Pagination.Item>
                );
            }
        } else {
            // Lógica para muchas páginas
            items.push(
                <Pagination.Item
                    key={1}
                    active={1 === currentPage}
                    onClick={() => paginate(1)}
                >
                    1
                </Pagination.Item>
            );

            if (currentPage > 3) {
                items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let number = startPage; number <= endPage; number++) {
                items.push(
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </Pagination.Item>
                );
            }

            if (currentPage < totalPages - 2) {
                items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            }

            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={totalPages === currentPage}
                    onClick={() => paginate(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <Container>
            <Form.Control
                type="text"
                placeholder="Buscar Productos"
                className="mb-4"
                value={barraDeBusqueda}
                onChange={(e) => setBarraDeBusqueda(e.target.value)}
            />

            {filteredProducts.length === 0 ? (
                <Alert variant="warning">
                    No se encontraron productos que coincidan con tu búsqueda.
                </Alert>
            ) : (
                <>
                    <Row>
                        {currentProducts.map((product) => (
                            <Col md={4} key={product.id} className="mb-4">
                                <ProductCard
                                    product={product}
                                    agregarAlCarrito={handleAgregarAlCarrito}
                                    masInfo={handleShowModal}
                                />
                            </Col>
                        ))}
                    </Row>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <Pagination>
                                <Pagination.First
                                    onClick={() => paginate(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                />
                                
                                {renderPaginationItems()}
                                
                                <Pagination.Next
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => paginate(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>
                        </div>
                    )}

                    <div className="text-center text-muted mb-3">
                        Mostrando {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)} de {filteredProducts.length} productos
                    </div>
                </>
            )}

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