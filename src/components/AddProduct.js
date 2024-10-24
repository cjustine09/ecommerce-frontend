import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Container, Modal } from 'react-bootstrap';
import Barcode from 'react-barcode'; // Import the Barcode component

const AddProduct = ({ formData, setFormData, addProduct, fetchProducts, setMessage, setError, clearMessage }) => {
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateBarcode = () => {
        // Generate a random barcode (you can customize this logic)
        return Math.floor(Math.random() * 1000000000).toString();
    };

    useEffect(() => {
        // Generate a new barcode when the component mounts
        const newBarcode = generateBarcode();
        setFormData((prevData) => ({ ...prevData, barcode: newBarcode }));
    }, [setFormData]); // Empty dependency array means this runs once on mount

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true); // Show the confirmation modal
    };

    const handleConfirmAdd = async () => {
        try {
            await addProduct(formData);
            setMessage('Product Added Successfully!');
            fetchProducts();
            // Optionally clear the form after successful addition
            setFormData({ name: '', description: '', price: '', quantity: '', category: '', barcode: '' });
            clearMessage();
        } catch (err) {
            setError('An error occurred while adding the product.');
            clearMessage();
        } finally {
            setShowModal(false); // Close the modal after the operation
        }
    };

    const handleClose = () => setShowModal(false); // Close the modal


    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Add Product</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        {/* Barcode Display */}
                        <div className="mb-3">
                            <Form.Label>Barcode:</Form.Label>
                            {/* Render the barcode directly without an input field */}
                            <Barcode 
                                value={formData.barcode} 
                                width={1}    // Adjust the width of each bar
                                height={25}  // Adjust the height of the barcode
                                displayValue={true} // Hides the value below the barcode
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
                            <Form.Control
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Enter product category"
                                required
                            />
                        </Form.Group>

                        <div className="mt-3">
                            <Button variant="success" type="submit">
                                Add 
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to add this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAdd}>
                            Add
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default AddProduct;
