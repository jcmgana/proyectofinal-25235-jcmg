import React from "react";
import ProductList from "./ProductList";
import { Helmet } from "react-helmet";

const Infaltables = () => {
    return (
        <>
            <Helmet>
                <title>Infaltables - Mi Tienda Deportiva</title>
                <meta
                    name="description"
                    content="Descubre los productos infaltables para tus actividades deportivas. Equipamiento esencial para cada deportista."
                />
            </Helmet>
            <div className="container">
                <h1>Infaltables</h1>
                <ProductList category="sports-accessories" />
            </div>
        </>
    );
};

export default Infaltables;
