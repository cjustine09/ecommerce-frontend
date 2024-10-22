import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Dashboard from './Dashboard';
import { Alert, Button } from 'react-bootstrap';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [view, setView] = useState('dashboard'); // To manage the current view ('dashboard', 'add', 'edit')

    const fetchProducts = useCallback(async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data); // Initialize filteredProducts with fetched products
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = () => {
        if (searchQuery) {
            const results = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(results); // Update filtered products with search results
        } else {
            setFilteredProducts(products); // Reset to all products if search input is empty
        }

        setSearchQuery('');
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
        setView('edit'); // Switch to the edit view
    };

    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
        setEditMode(false);
        setCurrentProductId(null);
        setSearchQuery(''); // Reset search term
        setFilteredProducts(products); // Reset filtered products
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
                <Button onClick={() => handleSwitchView('dashboard')} variant="primary" style={{ marginRight: '10px' }}>
                    Product List
                </Button>
                <Button onClick={() => handleSwitchView('add')} variant="success" style={{ marginRight: '10px' }}>
                    Add Product
                </Button>
            </div>

            {/* Conditionally render the components based on the current view */}
            {view === 'dashboard' && (
                <Dashboard
                    products={filteredProducts}
                    handleSearchChange={handleSearchChange}
                    handleSearch={handleSearch}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    searchQuery={searchQuery}
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
        </div>
    );
};

export default ProductManagement;
