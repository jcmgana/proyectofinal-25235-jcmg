// ./context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
export const CartContext = createContext();

// 2. Crear el Proveedor (Provider) que envuelve a la app
export const CartProvider = ({ children }) => {
    // MOVEMOS EL ESTADO Y TODAS LAS FUNCIONES DE App.jsx AQUÍ
    const [carritoItems, setItemsCarrito] = useState([]);

    const handleIncrementarCantidad = (productoId) => {
        setItemsCarrito((prevItems) =>
            prevItems.map((item) =>
                item.id === productoId
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    };

    const handleAgregarAlCarrito = (producto, cantidad = 1) => {
        const existe = carritoItems.find((item) => item.id === producto.id);
        let mensaje = ""

        if (existe) {
            setItemsCarrito((prevItems) =>
                prevItems.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                )
            );
            mensaje = `Se han agregado ${cantidad} unidades más de "${producto.title || producto.nombre}" al carrito.`;
        } else {
            setItemsCarrito([...carritoItems, { ...producto, cantidad: cantidad }]);
            mensaje = `Se ha agregado "${producto.title || producto.nombre}" al carrito.`;
        }
        alert(mensaje);
    };
    
    // Calcula el total de ítems en el carrito (útil para el Header)
    const totalItems = carritoItems.reduce((acc, item) => acc + item.cantidad, 0);

    // Mueve el resto de las funciones (Vaciar, Finalizar, Decrementar)

    const handleVaciarCarrito = () => {
        setItemsCarrito([]);
        alert("El carrito ha sido vaciado.");
    };

    const handleFinalizarCompra = () => {
        setItemsCarrito([]);
        alert("¡Gracias por su compra!");
    };

    const handleDecrementarCantidad = (productoId) => {
        setItemsCarrito(
            (prevItems) =>
                prevItems
                    .map((item) =>
                        item.id === productoId
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : item
                    )
                    .filter((item) => item.cantidad > 0)
        );
    };

    // 3. Objeto de Valor a Compartir
    const contextValue = {
        carritoItems,
        totalItems,
        handleAgregarAlCarrito,
        handleIncrementarCantidad,
        handleDecrementarCantidad,
        handleVaciarCarrito,
        handleFinalizarCompra,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 4. Hook personalizado para facilitar el uso (opcional pero recomendado)
export const useCart = () => {
    return useContext(CartContext);
};