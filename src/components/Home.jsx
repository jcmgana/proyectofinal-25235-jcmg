import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import ProductList from "./ProductList";

function Home() {

    return (
        <Container>
            <h1 className="text-center mb-4">Bienvenidos a la Tienda DummyStore</h1>
            <p className="text-center mb-4">
                Explora nuestra variedad de productos y encuentra lo que necesitas.
            </p>
            
        </Container>
        
    )
}

export default Home;
