// ProductForm.js
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ProductForm = ({ formData, handleInputChange, handleSubmit, editMode, resetForm }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBarcode">
                <Form.Label>Barcode</Form.Label>
                <Form.Control type="text" name="barcode" value={formData.barcode} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </Form.Group>
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
            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
                {editMode ? 'Update' : 'Add'}
            </Button>
            {editMode && (
                <Button variant="secondary" onClick={resetForm}>
                    Cancel
                </Button>
            )}
        </Form>
    );
};

export default ProductForm;