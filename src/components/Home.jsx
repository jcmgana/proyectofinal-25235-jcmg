import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import ProductList from "./ProductList";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { name: "Todos", value: null },
        { name: "Smartphones", value: "smartphones" },
        { name: "Notebooks", value: "laptops" },
        { name: "Fragancias", value: "fragrances" },
        { name: "Skincare", value: "skincare" },
        { name: "Groceries", value: "groceries" },
    ];

    return (
        <Container className="py-4">
            <h1 className="mb-4">Tienda de Productos</h1>

            <div className="mb-4">
                <h5>Filtrar por categoría:</h5>
                <ButtonGroup>
                    {categories.map((cat) => (
                        <Button
                            key={cat.value}
                            variant={
                                selectedCategory === cat.value
                                    ? "primary"
                                    : "outline-primary"
                            }
                            onClick={() => setSelectedCategory(cat.value)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>

            <ProductList category={selectedCategory} />
        </Container>
    );
}

export default Home;
