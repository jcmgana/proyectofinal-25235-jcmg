import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTruckFast } from "@fortawesome/free-solid-svg-icons";

import CarritoOffcanvas from "./CarritoOffcanvas";
import { useCart } from "../context/CartContext";

// Componente para el Ícono del Carrito y el Contador (Widget)
const CartWidget = ({ onShowCart, isOffcanvasOpen }) => {
    const { totalItems } = useCart();
    if (isOffcanvasOpen) {
        return null; 
    }

    return (
        // El div tiene el evento onClick para abrir el Offcanvas
        <div
            className="text-white position-relative"
            onClick={onShowCart}
            style={{ cursor: "pointer" }}
        >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {totalItems > 0 && (
                <span
                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                    style={{ top: "0", right: "-10px", fontSize: "0.7em" }}
                >
                    {totalItems}
                    <span className="visually-hidden">
                        Productos en carrito
                    </span>
                </span>
            )}
        </div>
    );
};

const Header = () => {
    // 2. Estado para controlar la visibilidad del Offcanvas
    const [showCart, setShowCart] = useState(false);

    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);

    return (
        // Envolvemos el contenido principal en un fragmento para incluir el Offcanvas
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        className="d-flex align-items-center"
                    >
                        <FontAwesomeIcon
                            icon={faTruckFast}
                            size="lg"
                            className="me-3"
                        />
                        Dummy Store
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link
                                as={NavLink} // Usamos NavLink
                                to="/"
                                end // IMPORTANTE: Para que no se active siempre que la ruta comienza con "/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-light-decoration-underline"
                                        : "me-3 text-white-50 "
                                }
                            >
                                Home
                            </Nav.Link>

                            <Nav.Link
                                as={NavLink}
                                to="/tienda"
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-dark"
                                        : "me-3 text-white-50"
                                }
                            >
                                Tienda
                            </Nav.Link>

                            <div className="d-flex align-items-center ms-3">
                                <Button
                                    variant="outline-light"
                                    as={NavLink}
                                    to="/administracion"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "me-3 fw-bold text-dark"
                                            : "me-3 text-white-50"
                                    }
                                >
                                    Administración
                                </Button>
                            </div>

                            {/* 3. Renderizar el CartWidget para mostrar el ícono y el contador */}
                            <div className="d-flex align-items-center ms-3">
                                <CartWidget onShowCart={handleShow} isOffcanvasOpen={showCart} />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 4. Renderizar el CartOffcanvas, que será el panel lateral */}
            <CarritoOffcanvas show={showCart} handleClose={handleClose} />
        </>
    );
};

export default Header;
