import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // ❗ Importar el hook de autenticación
import { useNavigate } from 'react-router-dom';

const API_URL = "https://692dfd5fe5f67cd80a4d9a1e.mockapi.io/productos";

const CrudProductos = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Esto cambia isLoggedIn a false y limpia el localStorage
        navigate("/"); // Redirige al inicio o a login
    };

    const { isLoggedIn } = useAuth(); // ❗ Obtener el estado de autenticación

    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });
    const [editId, setEditId] = useState(null);

    ///obtengo los productos.
    const getProductos = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((error) =>
                console.error("Error al obtener productos:", error)
            );
    };

    // cierro el modal
    const handleClose = () => {
        setShow(false);
        setForm({
            title: "",
            description: "",
            price: "",
            stock: "",
            image: "",
        });
        setEditId(null);
    };

    //Abrir modal
    const handleShow = (producto) => {
        setShow(true);
        if (producto) {
            setForm({
                ...producto,
                price: Number(producto.price),
                stock: Number(producto.stock),
            });
            setEditId(producto.id);
        }
    };

    // 🔹 Crear o editar producto
    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
        };

        const method = editId ? "PUT" : "POST";
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al guardar el producto");
                return res.json();
            })
            .then(() => {
                handleClose();
                getProductos();
            })
            .catch((error) => console.error("Error:", error));
    };

    // Eliminar
    const eliminarProducto = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?"))
            return;

        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Error al eliminar el producto");
                getProductos();
            })
            .catch((error) => console.error("Error:", error));
    };

    //productos al iniciar
    useEffect(() => {
        if (isLoggedIn) {
        getProductos();
        } else {
        setProductos([]); // Limpiar productos si no está autenticado
        setIsLoading(false);
        }
    }, [isLoggedIn]);

    // Mostrar mensaje si no está autenticado
    if (!isLoggedIn) {
        return <Alert variant="danger" className="mt-4">Acceso Denegado. Por favor, inicie sesión.</Alert>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>CRUD de Productos 🛒</h2>
                <Button variant="secondary" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </div>
            <Button className="mb-3" onClick={() => handleShow()}>
                Agregar Producto
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.title}</td>
                            <td>{prod.description}</td>
                            <td>${Number(prod.price).toFixed(2)}</td>
                            <td>{prod.stock}</td>
                            <td>
                                {prod.image?.startsWith("http") ? (
                                    <img
                                        src={prod.image}
                                        alt={prod.title}
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span>{prod.image}</span>
                                )}
                            </td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="warning"
                                    onClick={() => handleShow(prod)}
                                >
                                    Editar
                                </Button>{" "}
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => eliminarProducto(prod.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal de agregar / editar */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editId ? "Editar" : "Agregar"} Producto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: Number(e.target.value),
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        stock: Number(e.target.value),
                                    })
                                }
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                                value={form.image}
                                onChange={(e) =>
                                    setForm({ ...form, image: e.target.value })
                                }
                                required
                            />
                        </Form.Group>

                        <Button type="submit" className="mt-2">
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CrudProductos;
