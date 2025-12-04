import React, { useState } from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Modal,
    Carousel,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    // 1. Estados para el Modal de Logout
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleGoToProducts = () => {
        navigate("/tienda"); // Redirige a la ruta de todos los productos
    };

    const carouselContainerStyle = {
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        overflow: "hidden",
        borderRadius: "0.3rem",
    };

    return (
        <>
            <Helmet>
                <title>Dummy Store - Inicio</title>
                <meta
                    name="DummyStore"
                    content="Bienvenido a DummyStore, tu tienda en línea de confianza. Explora nuestra amplia variedad de productos de alta calidad y aprovecha nuestras ofertas exclusivas."
                />
            </Helmet>
            <Container fluid className="p-0">
                {/* 1. Modal de Cierre de Sesión */}
                <Modal
                    show={showLogoutModal}
                    onHide={() => setShowLogoutModal(false)}
                    centered
                    size="sm"
                >
                    <Modal.Header closeButton className="bg-success text-white">
                        <Modal.Title>👋 ¡Sesión Cerrada!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <p>{modalMessage}</p>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button
                            variant="success"
                            onClick={() => setShowLogoutModal(false)}
                        >
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* 2. Sección Hero Principal: Bienvenida y Botón a Tienda */}
                <div
                    className="text-white text-center py-5 mb-5"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "400px",
                        alt: "Hero image",
                        width: "1200",
                        height: "600",
                        fetchpriority: "high",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Container>
                        <h1
                            className="display-4 fw-bold mb-3"
                            style={{
                                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                            }}
                        >
                            Bienvenido a la Tienda DummyStore
                        </h1>
                        <p
                            className="lead mb-4"
                            style={{
                                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                            }}
                        >
                            Explora nuestra amplia variedad de productos de alta
                            calidad.
                        </p>
                        <Button
                            variant="warning"
                            size="lg"
                            onClick={handleGoToProducts}
                        >
                            Ver Todos los Productos
                        </Button>
                    </Container>
                </div>

                <Container>
                    {/* 3. Sección de Ofertas e Infaltables Destacadas */}
                    <h2 className="text-center mb-4 text-danger fw-bold">
                        🔥 NO TE PIERDAS NUESTRAS OFERTAS EXCLUSIVAS
                    </h2>

                    <div className="mb-5 shadow-lg">
                        {" "}
                        {/* Contenedor para la sombra en el Carrusel */}
                        <Carousel>
                            <Carousel.Item
                                onClick={() => navigate("/ofertas")}
                                style={{ cursor: "pointer" }}
                            >
                                <div style={carouselContainerStyle}>
                                    <img
                                        className="d-block w-100"
                                        src="https://images.unsplash.com/photo-1672413514634-4781b15fd89e?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Selección de celulares"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <Carousel.Caption
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                >
                                    <h3 className="fw-bold">
                                        Descuento del 30% en Smartphones
                                    </h3>
                                    <p>
                                        ¡Renueva tu equipo con esta oferta
                                        única!
                                    </p>
                                </Carousel.Caption>
                                <div className="d-block d-sm-none text-center bg-primary text-white p-2">
                                    <small className="fw-bold">
                                        Descuento 30% en Smartphones
                                    </small>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item
                                onClick={() => navigate("/infaltables")}
                                style={{ cursor: "pointer" }}
                            >
                                <div style={carouselContainerStyle}>
                                    <img
                                        className="d-block w-100"
                                        src="https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Infaltables."
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <Carousel.Caption
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                    }}
                                >
                                    <h3 className="fw-bold">
                                        Envío Gratis en todos los productos
                                        deportivos
                                    </h3>
                                    <p>
                                        Por tiempo limitado, no te pierdas los
                                        infaltables.
                                    </p>
                                </Carousel.Caption>
                                <div className="d-block d-sm-none text-center bg-primary text-white p-2">
                                    <small className="fw-bold">
                                        Envío Gratis en deportivos
                                    </small>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>

                    {/* 4. Sección de Enlaces Rápidos*/}
                    <div className="mb-5 text-center">
                        <h3 className="mb-4">Explorar Categorías Rápidas</h3>
                        <ButtonGroup size="lg">
                            <Button
                                variant="outline-primary"
                                onClick={() => navigate("/tienda")}
                            >
                                Ir a nuestra Tienda
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate("/ofertas")}
                            >
                                Ofertas
                            </Button>
                            <Button
                                variant="outline-success"
                                onClick={() => navigate("/infaltables")}
                            >
                                Infaltables
                            </Button>
                        </ButtonGroup>
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default Home;
