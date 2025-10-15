import React, { createContext, useState, useContext } from "react";

// 1. Crear el Contexto
export const CartContext = createContext();

// 2. Crear el Proveedor (Provider) que envuelve a la app
export const CartProvider = ({ children }) => {
    const [carritoItems, setItemsCarrito] = useState([]);
    const MAX_CANTIDAD = 10; // Cantidad máxima permitida por producto

    const handleIncrementarCantidad = (productoId) => {
        setItemsCarrito((prevItems) =>
            prevItems.map((item) =>
                item.id === productoId
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    };

    const handleAgregarAlCarrito = (producto, cantidadAAgregar = 1) => {
        const existe = carritoItems.find((item) => item.id === producto.id);
        let mensaje = "";
        let nuevaCantidad = cantidadAAgregar;
        if (existe) {
            const cantidadActual = existe.cantidad;
            const cantidadPostSuma = cantidadActual + cantidadAAgregar;

            if (cantidadPostSuma > MAX_CANTIDAD) {
                if (cantidadActual >= MAX_CANTIDAD) {
                    mensaje = `¡Atención! Ya tienes el máximo (${MAX_CANTIDAD}) de "${
                        producto.title || producto.nombre
                    }" en el carrito.`;
                    alert(mensaje);
                    return;
                }

                const cantidadASumar = MAX_CANTIDAD - cantidadActual;

                setItemsCarrito((prevItems) =>
                    prevItems.map((item) =>
                        item.id === producto.id
                            ? { ...item, cantidad: MAX_CANTIDAD }
                            : item
                    )
                );

                mensaje = `Solo se pudieron agregar ${cantidadASumar} unidad(es) de "${
                    producto.title || producto.nombre}". Límite total alcanzado (${MAX_CANTIDAD}).`;
            } else {
                setItemsCarrito((prevItems) =>
                    prevItems.map((item) =>
                        item.id === producto.id
                            ? { ...item, cantidad: cantidadPostSuma }
                            : item
                    )
                );
                mensaje = `Se han agregado ${cantidadAAgregar} unidad(es) más de "${
                    producto.title || producto.nombre }" al carrito.`;
            }
        } else {
            nuevaCantidad = Math.min(cantidadAAgregar, MAX_CANTIDAD);
            setItemsCarrito([
                ...carritoItems,
                { ...producto, cantidad: nuevaCantidad },
            ]);
            mensaje = `Se ha agregado "${
                producto.title || producto.nombre
            }" al carrito.`;
        }
        alert(mensaje);
    };

    // Calcula el total de ítems en el carrito
    const totalItems = carritoItems.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    const handleVaciarCarrito = () => {
        setItemsCarrito([]);
        alert("El carrito ha sido vaciado.");
    };

    const handleFinalizarCompra = () => {
        setItemsCarrito([]);
        alert("¡Gracias por su compra!");
    };

    const handleDecrementarCantidad = (productoId) => {
        setItemsCarrito((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === productoId
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    };

    const handleQuitarDelCarrito = (productoId) => {
        setItemsCarrito((prevItems) =>
            prevItems.filter((item) => item.id !== productoId)
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
        handleQuitarDelCarrito,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 4. Hook personalizado para facilitar el uso
export const useCart = () => {
    return useContext(CartContext);
};
