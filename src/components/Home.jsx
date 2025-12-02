import React, { useState, useEffect } from "react";
import {
    Button,
    ButtonGroup,
    Container,
    Modal,
    Row,
    Col,
    Card,
    Carousel // Importado para la sección de ofertas
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // 👈 NECESARIO: Importación de useNavigate
import { useAuth } from "../context/AuthContext";

function Home() {
    const navigate = useNavigate(); // 👈 Inicialización de useNavigate

    // 1. Estados para el Modal de Logout
    const { getLogoutMessage } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // 2. Lógica para leer el mensaje de logout al montar
    useEffect(() => {
        const message = getLogoutMessage();
        if (message) {
            setModalMessage(message);
            setShowLogoutModal(true);
        }
    }, [getLogoutMessage]);

    const handleGoToProducts = () => {
        navigate("/tienda"); // Redirige a la ruta de todos los productos
    };

    return (
        // Usar Container fluid para el Hero Banner y Container normal para el resto del contenido
        <Container fluid className="p-0"> 
            
            {/* ------------------------------------------------------------- */}
            {/* 1. Modal de Cierre de Sesión */}
            {/* ------------------------------------------------------------- */}
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

            {/* ------------------------------------------------------------- */}
            {/* 2. Sección Hero Principal: Bienvenida y Botón a Tienda */}
            {/* ------------------------------------------------------------- */}
            <div
                className="text-white text-center py-5 mb-5"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Container>
                    <h1
                        className="display-4 fw-bold mb-3"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
                    >
                        Bienvenido a la Tienda DummyStore
                    </h1>
                    <p
                        className="lead mb-4"
                        style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
                    >
                        Explora nuestra amplia variedad de productos de alta calidad.
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
                {/* ------------------------------------------------------------- */}
                {/* 3. Sección de Ofertas e Infaltables Destacadas */}
                {/* ------------------------------------------------------------- */}
                <h2 className="text-center mb-4 text-danger fw-bold">
                    🔥 NO TE PIERDAS NUESTRAS OFERTAS EXCLUSIVAS
                </h2>
                
                <div className="mb-5 shadow-lg"> {/* Contenedor para la sombra en el Carrusel */}
                    <Carousel>
                        <Carousel.Item onClick={() => navigate("/ofertas")} style={{cursor: 'pointer'}}>
                            <div style={{ height: '350px', overflow: 'hidden' }}>
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1672413514634-4781b15fd89e?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Selección de celulares" />
                            </div>
                            <Carousel.Caption style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <h3 className='fw-bold'>Descuento del 30% en Smartphones</h3>
                                <p>¡Renueva tu equipo con esta oferta única!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item onClick={() => navigate("/infaltables")} style={{cursor: 'pointer'}}>
                            <div style={{ height: '350px', overflow: 'hidden' }}>
                            <img className="d-block w-100" src="https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Infaltables."
                            style={{ objectFit: 'cover' }} />
                            </div>
                            <Carousel.Caption style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <h3 className='fw-bold'>Envío Gratis en todos los productos deportivos</h3>
                                <p>Por tiempo limitado, no te pierdas los infaltables.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 4. Sección de Enlaces Rápidos*/}
                {/* ------------------------------------------------------------- */}
                <div className="mb-5 text-center">
                    <h3 className="mb-4">Explorar Categorías Rápidas</h3>
                    <ButtonGroup size="lg">
                        <Button
                            variant="outline-primary"
                            onClick={() => navigate("/tienda")}
                        >
                            Ver Todos los Productos
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
    );
}

export default Home;