import { Modal } from "react-bootstrap";
import ProductDetail from "./ProductDetail";
import { Link } from "react-router-dom";

const ModalProductDetail = ({ show, onHide, productId }) => (
    <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Body>
            <ProductDetail id={productId} modalMode />
        </Modal.Body>
    </Modal>
);

export default ModalProductDetail;
