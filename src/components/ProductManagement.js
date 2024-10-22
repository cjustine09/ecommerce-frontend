import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Alert, Form, Button, InputGroup, Row, Col, Modal } from 'react-bootstrap';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedProduct, setSelectedProduct] = useState(null); // Product to display in modal

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
            clearMessage();
            console.error('Error fetching products:', err);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const clearMessage = () => {
        setTimeout(() => {
            setMessage('');
            setError('');
        }, 5000); // Clear message after 5 seconds
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        const foundProduct = products.find((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (foundProduct) {
            setSelectedProduct(foundProduct); // Store product details for modal
            setShowModal(true); // Open modal
            setMessage('');
        } else {
            setMessage(`Product "${searchQuery}" does not exist.`);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.price < 0 || formData.quantity < 0) {
            setError('Price and quantity must be non-negative.');
            clearMessage();
            return;
        }

        try {
            if (editMode) {
                await updateProduct(currentProductId, formData);
                setMessage('Product updated successfully!');
            } else {
                await addProduct(formData);
                setMessage('Product created successfully!');
            }
            fetchProducts();
            resetForm();
            clearMessage();
        } catch (err) {
            setError(err.response?.data.message || 'An error occurred while saving the product. Please try again.');
            clearMessage();
            console.error('Error saving product:', err);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setMessage('Product deleted successfully!');
                fetchProducts();
                clearMessage();
            } catch (err) {
                setError('An error occurred while deleting the product. Please try again.');
                clearMessage();
                console.error('Error deleting product:', err);
            }
        }
    };

    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
        setEditMode(false);
        setCurrentProductId(null);
    };

    return (
        <div>
            <h2>Product Management</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
            {message && <Alert variant="warning">{message}</Alert>} {/* Display search not found message */}

            {/* Smaller Search Bar */}
            <Row className="justify-content-center mb-3">
                <Col xs={8} sm={6} md={4}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search by product name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            size="sm"
                        />
                        <Button variant="primary" size="sm" onClick={handleSearch}>
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <ProductForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
                editMode={editMode} 
                resetForm={resetForm} 
            />

            <ProductList 
                products={products} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
            />

            {/* Product Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <div>
                            <p><strong>Barcode:</strong> {selectedProduct.barcode}</p>
                            <p><strong>Name:</strong> {selectedProduct.name}</p>
                            <p><strong>Description:</strong> {selectedProduct.description}</p>
                            <p><strong>Price:</strong> ${selectedProduct.price}</p>
                            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                            <p><strong>Category:</strong> {selectedProduct.category}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductManagement;
