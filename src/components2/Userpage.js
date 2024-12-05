// src/components2/UserPage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const UserPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartCount, setCartCount] = useState(0); // State to track the number of items in the cart
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products'); // Adjust the API endpoint as needed
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        updateCartCount(); // Update cart count on component mount
    }, []);

    const updateCartCount = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(storedCart.length); // Set the cart count based on local storage
    };

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        storedCart.push(product);
        localStorage.setItem('cart', JSON.stringify(storedCart)); // Save to local storage
        alert('Product added to cart successfully!'); // Simple alert for feedback
        updateCartCount(); // Update cart count after adding a product
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    // Assuming categories are predefined
    const categories = ['Mobile', 'TV & AV', 'Laptop', 'Home Appliances', 'Accessories'];

    return (
        <Container>
            <h1 className="text-center mt-4">Welcome to Our Store</h1> {/* Centered Welcome Message */}
            <h1 className="mt-4">Product List</h1>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={() => navigate('/cart')} className="position-relative">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    {cartCount > 0 && (
                        <Badge pill bg="danger" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>
                            {cartCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {/* Search Bar */}
            <Form className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Form>

            {/* Category Filters - Horizontal Checkboxes */}
            <div className="mb-4">
                <Row className="d-flex justify-content-start" style={{ flexWrap: 'nowrap' }}>
                    {categories.map((category) => (
                        <Col key={category} xs="auto" className="mb-2">
                            <Form.Check
                                type="checkbox"
                                label={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
 />
                        </Col>
                    ))}
                </Row>
            </div>

            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product.id} md={4} className="mb-4">
                            <Card>
                                <Link to={`/products/${product.id}`}>
                                    <Card.Img variant="top" src={product.image} /> {/* Assuming product has an image */}
                                </Link>
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                                    </Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>₱{product.price}</Card.Text>
                                    <Button variant="primary" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No products found.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default UserPage;