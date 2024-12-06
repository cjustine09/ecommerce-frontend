import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ProductForm = ({ formData, handleInputChange, handleSubmit, editMode, resetForm }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formBarcode">
                        <Form.Label>Barcode</Form.Label>
                        <Form.Control
                            type="text"
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} lg={4} className="mb-3">
                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                    {editMode ? 'Update' : 'Add'}
                </Button>
                {editMode && (
                    <Button variant="secondary" onClick={resetForm}>
                        Cancel
                    </Button>
                )}
            </div>
        </Form>
    );
};

export default ProductForm;
