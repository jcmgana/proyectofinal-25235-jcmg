import React from "react";
import ProductList from "./ProductList";
import { Helmet } from "react-helmet";

const Ofertas = () => {
    return (
        <>
            <Helmet>
                <title>Ofertas - Mi Tienda Deportiva</title>
                <meta
                    name="Smartphones"
                    content="Aprovecha las mejores ofertas en smartphones. Descuentos exclusivos en el mejor celular que te está esperando."
                />
            </Helmet>
            <div className="container">
                <h1>Ofertas</h1>
                <ProductList category="smartphones" />
            </div>
        </>
    );
};

export default Ofertas;
