import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-0">
                            2025 - Preentrega de Joaquín Gana - Derechos
                            Reservados - Versión 1.12.0.1
                        </p>
                    </Col>
                    <Col md={6}>
                        <div>
                            <a href="https://www.facebook.com" className="text-white me-3">
                                <i className="fa fa-facebook fa-2x"></i>
                            </a>
                            <a href="https://www.twitter.com" className="text-white me-3">
                                <i className="fa fa-twitter fa-2x"></i>
                            </a>
                            <a href="https://www.instagram.com" className="text-white">
                                <i className="fa fa-instagram fa-2x"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
