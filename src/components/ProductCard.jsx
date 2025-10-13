import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Contador from "./Contador";
import Boton from "./Boton";

const ProductCard = ({ product, agregarAlCarrito }) => {
    // 1. Estado local para la cantidad seleccionada (inicia en 1)
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1); 

    // 2. Manejadores de incremento/decremento para el Contador
    const handleIncrement = () => {
        setCantidadSeleccionada(prev => prev + 1);
    }
    
    const handleDecrement = () => {
        setCantidadSeleccionada(prev => (prev > 1 ? prev - 1 : 1));
    }

    // 3. Manejador para agregar al carrito, que usa la función pasada por props
    const handleAddToCart = () => {
        agregarAlCarrito(product, cantidadSeleccionada);
        setCantidadSeleccionada(1);
    }

    return (
        <Card className="h-100 d-flex flex-column">
            <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top img-fluid"
                style={{ height: "200px", objectFit: "contain" }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                    <strong>${product.price}</strong>
                </Card.Text>
                
                {/* 4. Implementación del Contador */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="fw-bold">Cantidad:</span>
                    <Contador 
                        cantidad={cantidadSeleccionada}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                </div>
                
                {/* 5. Botón de Agregar al Carrito */}
                <Boton
                    texto={`Agregar ${cantidadSeleccionada} al carrito`}
                    tipo="Agregar"
                    onClick={handleAddToCart}
                    className="mt-auto"
                >
                </Boton>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;