import React, { useState } from 'react'; 
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import Barcode from 'react-barcode';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({ formData, setFormData, updateProduct, currentProductId, 
                       fetchProducts, setError, clearMessage }) => {

    const [showModal, setShowModal] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false); // State to control prompt visibility
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true); // Show the modal when the submit button is clicked
    };

    const confirmUpdate = async () => {
        try {
            await updateProduct(currentProductId, formData);
            fetchProducts();
            clearMessage();
            setShowModal(false); // Hide the update confirmation modal
            setShowPrompt(true); // Show the prompt after updating
            setTimeout(() => {
                navigate('/'); // Navigate to the product list after the prompt
            }, 2000); // Navigate after 2 seconds
        } catch (err) {
            setError('An error occurred while updating the product.');
            clearMessage();
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', description: '', price: '', quantity: '', category: '', barcode: '' });
        setTimeout(() => {
            navigate('/');
        }, 10);
    };

    const handleClose = () => setShowModal(false); // Close modal without submitting

    const handlePromptClose = () => setShowPrompt(false); // Close the prompt (if needed)

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Edit Product</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label>Barcode:</Form.Label>
                            <Barcode 
                                value={formData.barcode} 
                                width={1}
                                height={50}
                                displayValue={true}
                            />
                        </div>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
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
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home & Garden">Home & Garden</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Sports">Sports</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="mt-3">
                            <Button variant="dark" type="submit">
                                Update
                            </Button>
                            <Button className="ms-2" variant="dark" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Confirmation Modal for Product Update */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={confirmUpdate}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Simple Prompt after Product Update */}
            <Modal show={showPrompt} onHide={handlePromptClose}>
                <Modal.Header>
                    <Modal.Title>Product Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your product has been updated successfully!</Modal.Body>
            </Modal>
        </Container>
    );
};

export default EditProduct;
