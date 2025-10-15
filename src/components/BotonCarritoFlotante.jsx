import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import CartOffcanvas from "./CarritoOffcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BotonCarritoFlotante = () => {
    const { carritoItems } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [showCart, setShowCart] = useState(false); // Estado para el Offcanvas

    // Calculamos la cantidad total de items
    const totalItems = carritoItems.reduce((acc, item) => acc + item.cantidad, 0);

    const handleShow = () => setShowCart(true);
    const handleClose = () => setShowCart(false);

    useEffect(() => {
        const handleScroll = () => {
            // Mostrar el botón cuando el usuario scrollea más de 150px
            setIsVisible(window.scrollY > 150);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🚀 CAMBIO CLAVE: Ocultar el botón si showCart es true 🚀
    // Si no es visible por scroll O el Offcanvas está abierto, no renderizamos el botón flotante.
    const shouldShowButton = isVisible && !showCart;

    return (
        <>
            {/* Botón flotante */}
            {shouldShowButton && (
                <Button
                    variant="primary"
                    onClick={handleShow}
                    className="position-fixed rounded-circle shadow-lg"
                    style={{
                        bottom: "2rem",
                        right: "2rem",
                        width: "60px",
                        height: "60px",
                        zIndex: 2000,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                >
                    <FontAwesomeIcon icon={faShoppingCart} size={25} />
                    {totalItems > 0 && (
                        <Badge
                            bg="danger"
                            pill
                            className="position-absolute top-0 start-100 translate-middle"
                        >
                            {totalItems}
                        </Badge>
                    )}
                </Button>
            )}

            {/* Offcanvas del carrito */}
            <CartOffcanvas 
                show={showCart} 
                handleClose={handleClose} 
            />
        </>
    );
};

export default BotonCarritoFlotante;
