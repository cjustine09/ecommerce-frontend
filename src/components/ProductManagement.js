import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Dashboard from './Dashboard';
import { Alert, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);  // All products
    const [filteredProducts, setFilteredProducts] = useState([]);  // Displayed products (filtered by search)
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState('dashboard'); // To manage the current view ('dashboard', 'add', 'edit')
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal

    // Fetch products from the API
    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data); // Initialize filteredProducts with all products
        } catch (err) {
            setError('Failed to fetch products. Please try again later.');
            clearMessage();
            console.error('Error fetching products:', err);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Clear messages and errors after a timeout
    const clearMessage = () => {
        setTimeout(() => {
            setMessage('');
            setError('');
        }, 5000); // Clear message after 5 seconds
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('http://localhost:8000/api/products/search', {
                params: { query: searchQuery }  // Send query to API
            });

            setFilteredProducts(response.data);  // Update filtered products with search results
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError('Failed to fetch search results.');
            setLoading(false);
        }
    };

    // Handle product edit
    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
        setView('edit'); // Switch to the edit view
    };

    // Reset form and search query
    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
        setEditMode(false);
        setCurrentProductId(null);
        setSearchQuery(''); // Reset search term
        setFilteredProducts(products); // Reset filtered products to show all
    };

    // State for handling deletion
    const [deletionId, setDeletionId] = useState(null); // State to store product ID to be deleted

    // Handle product deletion (show modal)
    const handleDelete = (id) => {
        setDeletionId(id); // Store the ID of the product to be deleted
        setShowDeleteModal(true); // Show the delete confirmation modal
    };

    // Confirm product deletion
    const confirmDelete = async () => {
        try {
            await deleteProduct(deletionId);
            setMessage('Product Deleted uccessfully!');
            fetchProducts();  // Refresh the products after deletion
            clearMessage();
        } catch (err) {
            setError('An error occurred while deleting the product. Please try again.');
            clearMessage();
            console.error('Error deleting product:', err);
        } finally {
            setShowDeleteModal(false); // Close the modal after operation
            setDeletionId(null); // Reset deletionId
        }
    };

    // Close modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeletionId(null); // Reset deletionId when closing the modal
    };

    // Switch view handler
    const handleSwitchView = (viewName) => {
        setView(viewName); // Switch between 'dashboard', 'add', and 'edit'
        resetForm();
    };

    return (
        <div>
            <h2 style={{ marginLeft: '550px', marginTop: '30px' }}>Product Management</h2> {/* Moved title slightly to the right */}
            {error && <Alert variant="danger" style={{ marginLeft: '20px' }}>{error}</Alert>}
            {message && <Alert variant="success" style={{ marginLeft: '20px' }}>{message}</Alert>}

            {/* Display buttons to toggle views */}
            <div style={{ marginLeft: '1150px' }}> {/* Moved buttons slightly to the right */}
                <Button onClick={() => handleSwitchView('dashboard')} variant="dark" style={{ marginRight: '10px' }}>
                    Product List
                </Button>
                <Button onClick={() => handleSwitchView('add')} variant="dark" style={{ marginRight: '10px' }}>
                    Add Product
                </Button>
            </div>

            {/* Conditionally render the components based on the current view */}
            {view === 'dashboard' && (
                <Dashboard
                    products={filteredProducts}  // Use filtered products for the dashboard
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
