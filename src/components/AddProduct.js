import React from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const AddProduct = ({ formData, setFormData, addProduct, fetchProducts, setMessage, setError, clearMessage }) => {
    const [loading, setLoading] = React.useState(false); // Loading state for the button
    const [formError, setFormError] = React.useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError(''); // Clear form error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!formData.barcode || !formData.name || !formData.price || !formData.quantity || !formData.category) {
            setFormError('All fields are required.');
            return;
        }

        setLoading(true); // Set loading state
        try {
            await addProduct(formData);
            setMessage('Product created successfully!');
            await fetchProducts(); // Wait for fetch to complete
            clearMessage();
            setLoading(false);
        } catch (err) {
            setError('An error occurred while adding the product.');
            clearMessage();
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Add Product</Card.Title>
                    {formError && <Alert variant="danger">{formError}</Alert>} {/* Form error message */}
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Product'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddProduct;
