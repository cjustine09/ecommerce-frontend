import React from 'react'; // Added useState import
import { Form, Button, Card, Container} from 'react-bootstrap';
import Barcode from 'react-barcode';

const EditProduct = ({ formData, setFormData, updateProduct, currentProductId, 
                       fetchProducts, setMessage, setError, clearMessage }) => {
    

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

    return (
        <Container className="d-flex justify-content-center mt-5"> {/* Center the card */}
        <Card className="w-50"> {/* Set card width as needed */}
            <Card.Body>
                <Card.Title>Edit Product</Card.Title>
            <Form onSubmit={handleSubmit}>
                {/* Barcode */}
                <div className="mb-3">
                    <Form.Label>Barcode:</Form.Label>
                        {/* Render the barcode directly without an input field */}
                    <Barcode 
                        value={formData.barcode} 
                        width={1}    // Adjust the width of each bar
                        height={50}  // Adjust the height of the barcode
                        displayValue={true} // Hides the value below the barcode
                    />
                </div>

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

                <div className="mt-3">
                    <Button variant="success" type="submit">
                        Add 
                    </Button>
                </div>
            </Form>
        </Card.Body>
        </Card>
        </Container>
    );
};

export default EditProduct;
