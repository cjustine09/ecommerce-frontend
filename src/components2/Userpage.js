import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';

const Userpage = () => {
  const [products, setProducts] = useState([]);
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
  }, []);

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
    <Container className="mt-4">
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
                  <Link to={`/products/${product.id}`}>
                    <Button variant="primary">View</Button>
                  </Link>
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
  );
};

export default Userpage;
