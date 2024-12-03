import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Spinner, Form, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

const Userpage = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = ['Mobile', 'TV & AV', 'Laptop', 'Home Appliances', 'Accessories'];

  useEffect(() => {
    // Fetch products from the API
    axios.get('http://localhost:8000/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    // Fetch initial cart count from the backend or session
    axios.get('http://localhost:8000/api/cart')
      .then((response) => {
        console.log('Initial cart data:', response.data); // Debug log
        setCartCount(Object.keys(response.data).length);
      })
      .catch((error) => console.error('Error fetching cart data:', error));
  }, []);

  const handleAddToCart = (productId) => {
    axios.post('http://localhost:8000/api/cart/add', { product_id: productId, quantity: 1 })
        .then((response) => {
            console.log('Response from add to cart:', response.data);
            if (response.data.success) {
                setCartCount((prevCount) => prevCount + 1); // Increment cart count locally
                alert('Product added to cart successfully!');
            }
        })
        .catch((error) => {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        });
};

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      // Add category to selected categories
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter products based on search query and selected categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Our Store</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/cart" className="nav-link">
              🛒 Cart <span className="badge bg-primary">{cartCount}</span>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container>
        <h1 className="text-center mb-4">Welcome to Our Store</h1>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>

        {/* Category Filters */}
        <Row className="mb-3">
          <Col>
            <Form>
              <Row className="d-flex justify-content-start" style={{ flexWrap: 'nowrap' }}>
                {categories.map((category, index) => (
                  <Col key={index} xs="auto" className="mb-2">
                    <Form.Check 
                      type="checkbox" 
                      label={category} 
                      checked={selectedCategories.includes(category)} 
                      onChange={() => handleCategoryChange(category)} 
                    />
                  </Col>
                ))}
              </Row>
            </Form>
          </Col>
        </Row>

        {/* Product List */}
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col md={4} sm={6} xs={12} className="mb-4" key={product.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description.substring(0, 50)}...
                    </Card.Text>
                    <Card.Text>
                      <strong>Price: ₱{product.price}</strong>
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="primary">View</Button>
                      </Link>
                      <Button 
                        variant="success" 
                        onClick={() => handleAddToCart(product.id)} 
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products found</p>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Userpage;
