import React, { useEffect } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import Barcode from 'react-barcode'; // Import the Barcode component

const AddProduct = ({ formData, setFormData, addProduct, fetchProducts, setMessage, setError, clearMessage }) => {

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
    }, []); // Empty dependency array means this runs once on mount

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addProduct(formData);
            setMessage('Product created successfully!');
            fetchProducts();
            setFormData({ name: '', description: '', price: '', quantity: '', category: '', barcode: '' }); // Clear the form
            clearMessage();
        } catch (err) {
            setError('An error occurred while adding the product.');
            clearMessage();
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="w-50">
                <Card.Body>
                    <Card.Title>Add Product</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        {/* Barcode Display */}
                        <Form.Group controlId="formBarcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control
                                type="text"
                                name="barcode"
                                value={formData.barcode} // Display the generated barcode
                                readOnly
                            />
                            {/* Render the barcode if the barcode is generated */}
                            {formData.barcode && (
                                <div className="mt-3">
                                    <Barcode 
                                        value={formData.barcode} 
                                        width={1}    // Adjust the width of each bar
                                        height={50}  // Adjust the height of the barcode
                                        displayValue={false} // Hides the value below the barcode
                                    />
                                </div>
                            )}
                        </Form.Group>

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

                        <Button variant="success" type="submit">
                            Add Product
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddProduct;
