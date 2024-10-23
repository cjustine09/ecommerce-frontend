import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Dashboard from './Dashboard';
import { Alert, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data);
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
        }, 5000);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/products/search', {
                params: { query: searchQuery }
            });
            setFilteredProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results.');
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
        setView('edit');
    };

    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
        setEditMode(false);
        setCurrentProductId(null);
        setSearchQuery('');
        setFilteredProducts(products);
    };

    const [deletionId, setDeletionId] = useState(null);

    const handleDelete = (id) => {
        setDeletionId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProduct(deletionId);
            setMessage('Product Deleted Successfully!');
            fetchProducts();
            clearMessage();
        } catch (err) {
            setError('An error occurred while deleting the product. Please try again.');
            clearMessage();
            console.error('Error deleting product:', err);
        } finally {
            setShowDeleteModal(false);
            setDeletionId(null);
        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeletionId(null);
    };

    const handleSwitchView = (viewName) => {
        setView(viewName);
        resetForm();
    };

    const logOut = () => {
        setShowLogoutModal(true);
    }

    const confirmLogout = () => {
        localStorage.removeItem("user-info");
        navigate("/");
        setShowLogoutModal(false);
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <div>
            <h2 style={{ marginLeft: '550px', marginTop: '30px' }}>Product Management</h2>
            {error && <Alert variant="danger" style={{ marginLeft: '20px' }}>{error}</Alert>}
            {message && <Alert variant="success" style={{ marginLeft: '20px' }}>{message}</Alert>}

            {/* Display buttons side by side */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '200px', marginBottom: '20px' }}>
                <Button onClick={() => handleSwitchView('dashboard')} variant="dark" style={{ marginRight: '10px' }}>
                    Product List
                </Button>
                <Button onClick={() => handleSwitchView('add')} variant="dark" style={{ marginRight: '10px' }}>
                    Add Product
                </Button>
                <Button onClick={logOut} variant="success">
                    Logout
                </Button>
            </div>

            {view === 'dashboard' && (
                <Dashboard
                    products={filteredProducts}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    searchQuery={searchQuery}
                    loading={loading}
                />
            )}

            {view === 'add' && (
                <AddProduct
                    formData={formData}
                    setFormData={setFormData}
                    addProduct={addProduct}
                    fetchProducts={fetchProducts}
                    setMessage={setMessage}
                    setError={setError}
                    clearMessage={clearMessage}
                />
            )}

            {view === 'edit' && editMode && (
                <EditProduct
                    formData={formData}
                    setFormData={setFormData}
                    updateProduct={updateProduct}
                    currentProductId={currentProductId}
                    fetchProducts={fetchProducts}
                    setMessage={setMessage}
                    setError={setError}
                    clearMessage={clearMessage}
                />
            )}

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={cancelLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={confirmLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductManagement;
