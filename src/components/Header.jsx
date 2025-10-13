import React, { useState } from "react"; // 1. Importar useState
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Importamos el Offcanvas y el hook para el contador de ítems
import CartOffcanvas from './CartOffcanvas'; 
import { useCart } from '../context/CartContext'; 

// Componente para el Ícono del Carrito y el Contador (Widget)
const CartWidget = ({ onShowCart }) => {
    const { totalItems } = useCart(); 

    return (
        // El div tiene el evento onClick para abrir el Offcanvas
        <div 
            className="text-white position-relative" 
            onClick={onShowCart} 
            style={{ cursor: 'pointer' }}
        >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {totalItems > 0 && (
                <span 
                    className="position-absolute translate-middle badge rounded-pill bg-danger" 
                    style={{ top: '0', right: '-10px', fontSize: '0.7em' }}
                >
                    {totalItems}
                    <span className="visually-hidden">Productos en carrito</span>
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
                        {/* ... Logo y Título ... */}
                    </Navbar.Brand>
                    
                    {/* El Nav.Toggle es necesario para el menú hamburguesa en móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link as={Link} to="/productos" className="me-3">
                                Productos
                            </Nav.Link>
                            
                            {/* 3. Renderizar el CartWidget para mostrar el ícono y el contador */}
                            {/* Eliminamos el <Link to="/carrito"> */}
                            <div className="d-flex align-items-center">
                                <CartWidget onShowCart={handleShow} />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 4. Renderizar el CartOffcanvas, que será el panel lateral */}
            <CartOffcanvas 
                show={showCart} 
                handleClose={handleClose} 
            />
        </>
    );
};

export default Header;