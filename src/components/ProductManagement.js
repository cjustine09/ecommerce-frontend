// ProductManagement.js
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/ProductService';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ barcode: '', name: '', description: '', price: '', quantity: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Basic validation
        if (formData.price < 0 || formData.quantity < 0) {
            alert('Price and quantity must be non-negative.');
            return;
        }

        try {
            if (editMode) {
                await updateProduct(currentProductId, formData);
            } else {
                await addProduct(formData);
            }
            fetchProducts(); // Refresh the product list after adding or updating
            resetForm(); // Reset the form fields
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                // Server responded with a status other than 200
                console.error('Error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'An error occurred while saving the product.'}`);
            } else {
                // Network error or other issues
                console.error('Error:', error.message);
                alert('An error occurred while saving the product. Please check your network connection and try again.');
            }
        }
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditMode(true);
        setCurrentProductId(product.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
            alert('An error occurred while deleting the product. Please try again.');
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
        </div>
    );
};

export default ProductManagement;