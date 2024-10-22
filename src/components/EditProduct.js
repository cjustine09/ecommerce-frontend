import React, { useState } from 'react'; // Added useState import
import { Form, Button, Card, Container} from 'react-bootstrap';

const EditProduct = ({ formData, setFormData, updateProduct, currentProductId, fetchProducts, setMessage, setError, clearMessage }) => {
    const [view, setView] = useState('dashboard');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(currentProductId, formData);
            setMessage('Product updated successfully!');
            fetchProducts();
            clearMessage();
        } catch (err) {
            setError('An error occurred while updating the product.');
            clearMessage();
        }
    };

    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    };

    const handleSwitchView = (viewName) => {
        setView(viewName); // Switch between 'dashboard', 'add', and 'edit'
        resetForm();
    };

    return (
        <Container className="d-flex justify-content-center mt-5"> {/* Center the card */}
        <Card className="w-50"> {/* Set card width as needed */}
            <Card.Body>
                <Card.Title>Edit Product</Card.Title>
            <Form onSubmit={handleSubmit}>
                {/* Barcode */}
                <Form.Group controlId="formBarcode">
                    <Form.Label>Barcode</Form.Label>
                    <Form.Control
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        placeholder="Enter product barcode"
                    />
                </Form.Group>

                {/* Name */}
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

                {/* Description */}
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

                {/* Price */}
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

                {/* Quantity */}
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

                {/* Category */}
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Enter product category"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Product
                </Button>
            </Form>
        </Card.Body>
        </Card>
        </Container>
    );
};

export default EditProduct;
