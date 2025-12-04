import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShoppingCart,
    faTruckFast,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";
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
            <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                title="Ver Carrito"
            />
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
    const { isLoggedIn, logout } = useAuth();

    // 2. Estado para controlar la visibilidad del Offcanvas
    const [showCart, setShowCart] = useState(false);

    const handleClose = () => setShowCart(false);
    const handleShow = () => {
        setShowCart(true);
        setExpanded(false);
    };

    // 3.  Estado para controlar la expansión del Navbar en móviles
    const [expanded, setExpanded] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                expanded &&
                navRef.current &&
                !navRef.current.contains(event.target)
            ) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [expanded]);

    return (
        // Envolvemos el contenido principal en un fragmento para incluir el Offcanvas
        <>
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                className="mb-4"
                expanded={expanded}
                onToggle={(isExpanded) => setExpanded(isExpanded)}
                ref={navRef}
            >
                <Container>
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        onClick={() => setExpanded(false)}
                        className="d-flex align-items-center"
                    >
                        <FontAwesomeIcon
                            icon={faTruckFast}
                            size="lg"
                            className="me-3 text-info"
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
                                onClick={() => setExpanded(false)}
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
                                onClick={() => setExpanded(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-info"
                                        : "me-3 text-white-50"
                                }
                            >
                                Tienda
                            </Nav.Link>

                            <Nav.Link
                                as={NavLink}
                                to="/ofertas"
                                onClick={() => setExpanded(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-info"
                                        : "me-3 text-white-50"
                                }
                            >
                                Ofertas
                            </Nav.Link>

                            <Nav.Link
                                as={NavLink}
                                to="/infaltables"
                                onClick={() => setExpanded(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-info"
                                        : "me-3 text-white-50"
                                }
                            >
                                Infaltables
                            </Nav.Link>

                            <Nav.Link
                                as={NavLink}
                                to="/contacto"
                                onClick={() => setExpanded(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "me-3 fw-bolder text-info"
                                        : "me-3 text-white-50"
                                }
                            >
                                Contacto
                            </Nav.Link>

                            <div className="d-flex align-items-center ms-3">
                                <Button
                                    variant="outline-light"
                                    as={NavLink}
                                    to={
                                        isLoggedIn
                                            ? "/crudproductos"
                                            : "/administracion"
                                    }
                                    onClick={() => setExpanded(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "me-3 fw-bold text-dark bg-light"
                                            : "me-3 text-white-50"
                                    }
                                >
                                    Administración
                                </Button>
                            </div>

                            {/* 3. Renderizar el CartWidget para mostrar el ícono y el contador */}
                            <div className="d-flex align-items-center ms-3 mt-3 mt-md-0">
                                <CartWidget
                                    onShowCart={handleShow}
                                    isOffcanvasOpen={showCart}
                                />
                                {/* Ícono de Cierre de Sesión (solo si está logueado) */}
                                {isLoggedIn && (
                                    <div
                                        className="text-white me-3 ms-3"
                                        onClick={logout} // Llama a la función de logout al hacer clic
                                        style={{ cursor: "pointer" }}
                                        title="Cerrar Sesión" // Tooltip
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                            size="lg"
                                            color="red"
                                        />
                                    </div>
                                )}
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
