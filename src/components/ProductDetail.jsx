import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import Contador from "./Contador";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const ProductDetail = ({ id, agregarAlCarrito, modalMode = false }) => {
    const params = useParams();
    const productId = id || params.id;
    const { handleAgregarAlCarrito } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Estado local para la cantidad seleccionada (inicia en 1)
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

    // 2. Manejadores de incremento/decremento para el Contador
    const handleIncrement = () => {
        setCantidadSeleccionada((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setCantidadSeleccionada((prev) => (prev > 1 ? prev - 1 : 1));
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products/${productId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error en la respuesta");
                return res.json();
            })
            .then((data) => setProduct(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!product) return <div className="alert alert-info">No encontrado</div>;

    return (
        <Container fluid={modalMode} className="py-5">
            <Row>
                <Col md={6}>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="img-fluid rounded shadow-sm"
                    />
                </Col>
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p className="text-muted">{product.category}</p>
                    <h4 className="text-success">${product.price}</h4>
                    <p>{product.description}</p>
                    <div className="d-flex align-items-center mb-3">
                        <span className="fw-bold">Cantidad:</span>
                        <div className="ms-5">
                            <Contador
                                cantidad={cantidadSeleccionada}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                            />{" "}
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleAgregarAlCarrito(
                                { ...product },
                                cantidadSeleccionada
                            )
                        }
                    >
                        Agregar al carrito
                    </Button>
                    {!modalMode && (
                        <Button
                            as={Link}
                            variant="outline-danger"
                            to={`/tienda`}
                            className="ms-3"
                        >
                            Volver a la tienda
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
