import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            setProducts(response.data);
            setFilteredProducts(response.data); // Initialize filteredProducts
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        // Filter products based on the search term
        if (searchTerm) {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(products); // Reset filtered products if search term is empty
        }

        // Clear the search input after searching
        setSearchTerm('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.price || !formData.quantity) {
            alert('All fields are required.');
            return;
        }
        if (formData.price < 0 || formData.quantity < 0) {
            alert('Price and quantity must be non-negative.');
            return;
        }

        setLoading(true);
        try {
            if (editMode) {
                await updateProduct(currentProductId, formData);
                setSuccessMessage('Product updated successfully!');
            } else {
                await addProduct(formData);
                setSuccessMessage('Product added successfully!');
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error.response ? error.response.data : error.message);
            alert('An error occurred while saving the product.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true);
            try {
                await deleteProduct(id);
                fetchProducts();
                alert('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error.response ? error.response.data : error.message);
                alert('An error occurred while deleting the product.');
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setFormData({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
        setEditMode(false);
        setCurrentProductId(null);
        setSuccessMessage('');
        setSearchTerm(''); // Reset search term
        setFilteredProducts(products); // Reset filtered products
    };

    return (
        <div>
            <h2>Product Management</h2>
            {loading && <p>Loading...</p>}
            {successMessage && <p>{successMessage}</p>}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ padding: '10px', width: '300px', marginRight: '10px' }} // Styling for the search input
                />
                <button onClick={handleSearch} style={{ padding: '10px' }}>Search</button>
            </div>
            <ProductForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
                editMode={editMode} 
                resetForm={resetForm} 
            />
            <ProductList 
                products={filteredProducts} // Use filteredProducts for display
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
            />
        </div>
    );
};

export default ProductManagement;
