import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import Barcode from 'react-barcode';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ formData, setFormData, addProduct, fetchProducts}) => {
    const [showModal, setShowModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateBarcode = () => {
        return Math.floor(Math.random() * 1000000000).toString();
    };

    useEffect(() => {
        const newBarcode = generateBarcode();
        setFormData((prevData) => ({ ...prevData, barcode: newBarcode }));
    }, [setFormData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirmAdd = async () => {
        try {
            await addProduct(formData);
            setMessage('Product Added Successfully!');
            setIsError(false);
            fetchProducts();
            setFormData({ name: '', description: '', price: '', quantity: '', category: '', barcode: '' });
            setShowMessageModal(true);
            setTimeout(() => {
                setShowMessageModal(false); // Hide prompt after a delay
                navigate('/');
            }, 2000);
        } catch (err) {
            setMessage('An error occurred while adding the product.');
            setIsError(true);
        } finally {
            setShowModal(false);
            setShowMessageModal(true); // Show the message modal after the operation
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', description: '', price: '', quantity: '', category: '', barcode: '' });
        setTimeout(() => {
            navigate('/');
        }, 10);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseMessageModal = () => setShowMessageModal(false); // Close the message modal

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Add Product</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        {/* Barcode Display */}
                        <div className="mb-3">
                            <Form.Label>Barcode:</Form.Label>
                            <Barcode 
                                value={formData.barcode} 
                                width={1}
                                height={25}
                                displayValue={true}
                            />
                        </div>

                        {/* Other fields */}
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter product price"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                placeholder="Enter product quantity"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Mobile">Mobile</option>
                                <option value="TV & AV">TV & AV</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Home Appliances">Home Appliances</option>
                                <option value="Accessories">Accessories</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="mt-3">
                            <Button variant="dark" type="submit">
                                Add 
                            </Button>

                            <Button className="ms-2"variant="dark" onClick={handleCancel}>
                                Cancel
                            </Button>

                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to add this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAdd}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Message Modal */}
            <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
                <Modal.Header>
                    <Modal.Title>{isError ? 'Error' : 'Success'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
            </Modal>
        </Container>
    );
};

export default AddProduct;
