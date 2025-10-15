
import React from 'react';
import { Offcanvas } from 'react-bootstrap'; 
import { useCart } from '../context/CartContext'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Contador from "./Contador"; 
import Boton from "./Boton"; 

import "../styles/CartOffcanvas.css";

// Recibirá las props para controlar la apertura y cierre desde Header.jsx
const CartOffcanvas = ({ show, handleClose }) => {
    // 1. Obtener la data y las funciones del carrito desde el contexto
    const { 
        carritoItems, 
        handleVaciarCarrito, 
        handleFinalizarCompra, 
        handleIncrementarCantidad, 
        handleDecrementarCantidad,
        handleQuitarDelCarrito,
    } = useCart();
    
    // 2. Cálculo del total
    const total = carritoItems.reduce((sum, item) => sum + (item.price * item.cantidad), 0);

    return (
        // 3. Usar el componente Offcanvas de React-Bootstrap, siempre colocado a la derecha ("end")
        <Offcanvas show={show} onHide={handleClose} placement="end">
            
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                    Carrito de Compras
                </Offcanvas.Title>
            </Offcanvas.Header>
            
            <Offcanvas.Body>
                {/* 4. Contenido Principal */}
                {carritoItems.length === 0 ? (
                    <p className="text-center text-muted">El carrito está vacío. ¡Añade productos!</p>
                ) : (
                    <>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {carritoItems.map((producto) => (
                                <li 
                                    key={producto.id} 
                                    className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
                                >
                                    <div className="d-flex align-items-center flex-grow-1">
                                        <div 
                                            className="me-2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleQuitarDelCarrito(producto.id)} >
                                            <FontAwesomeIcon icon={faTrashCan} size="sm" color='red' />
                                        </div> 
                                    {/* Información y Contador */}
                                    <div className="producto-info">
                                        <h6 className="mb-0">{producto.title || producto.nombre}</h6> 
                                        <p className="text-muted small">${producto.price || producto.precio}</p>
                                    </div>
                                    </div>


                                    <div className="d-flex align-items-center">
                                        {/* 5. Contador para modificar la cantidad */}
                                        <Contador 
                                            cantidad={producto.cantidad}
                                            onDecrement={() => handleDecrementarCantidad(producto.id)} 
                                            onIncrement={() => handleIncrementarCantidad(producto.id)} 
                                            min={1} 
                                        />
                                        
                                        {/* Subtotal del ítem */}
                                        <span className="ms-3 fw-bold" style={{ minWidth: '80px', textAlign: 'right' }}>
                                            ${(producto.price * producto.cantidad).toFixed(2)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        {/* 6. Total y Botones de Acción */}
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                            <h4>Total:</h4>
                            <h4>${total.toFixed(2)}</h4>
                        </div>
                        
                        <div className="d-grid gap-2 mt-4">
                            <Boton texto="Finalizar Compra" tipo="Comprar" onClick={handleFinalizarCompra}/>
                            <Boton texto="Vaciar Carrito" tipo="Vaciar" onClick={handleVaciarCarrito} />
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartOffcanvas;