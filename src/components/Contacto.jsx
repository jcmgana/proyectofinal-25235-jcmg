import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";

const Contacto = () => {
    // 1. Estado para almacenar los datos del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    // 2. Estado para manejar la respuesta del formulario (éxito o error)
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});

    // Maneja el cambio en cualquier campo de entrada
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));

        // Limpiar error tan pronto como el usuario comience a escribir
        if (errors[id]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    // Validaciones básicas
    const validate = () => {
        let formErrors = {};
        if (!formData.name.trim()) {
            formErrors.name = "El nombre es obligatorio.";
        }
        if (!formData.email.trim()) {
            formErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "El correo electrónico no es válido.";
        }
        if (!formData.subject.trim()) {
            formErrors.subject = "El asunto es obligatorio.";
        }
        if (!formData.message.trim()) {
            formErrors.message = "El mensaje es obligatorio.";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // 3. Ejecutar validación
        if (!validate()) {
            setStatus("error");
            return;
        }

        console.log("Datos enviados:", formData);

        // Simular éxito después de 1 segundo
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" }); // Limpiar formulario
            setErrors({}); // Asegurarse de limpiar errores anteriores
        }, 1000);

    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="bg-light p-4 rounded shadow-lg">
                        <h2 className="text-center mb-4 text-primary">
                            Contáctanos
                        </h2>
                        <p className="text-center text-muted mb-4">
                            Estamos aquí para ayudarte. Por favor, completa el
                            siguiente formulario.
                        </p>

                        {/* Mensajes de estado */}
                        {status === "success" && (
                            <Alert
                                variant="success"
                                onClose={() => setStatus(null)}
                                dismissible
                            >
                                ¡Mensaje enviado con éxito! Te responderemos
                                pronto.
                            </Alert>
                        )}
                        {status === "error" &&
                            Object.keys(errors).length > 0 && (
                                <Alert
                                    variant="danger"
                                    onClose={() => setStatus(null)}
                                    dismissible
                                >
                                    Por favor, corrige los errores en el
                                    formulario antes de enviar.
                                </Alert>
                            )}

                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Campo Nombre */}
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Email */}
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Asunto */}
                            <Form.Group className="mb-3" controlId="subject">
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Motivo de tu consulta"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    isInvalid={!!errors.subject}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.subject}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Campo Mensaje */}
                            <Form.Group className="mb-4" controlId="message">
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Escribe tu mensaje aquí..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!errors.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Botón de Envío */}
                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="lg"
                                >
                                    Enviar Mensaje
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacto;
