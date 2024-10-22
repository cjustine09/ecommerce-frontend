import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import ProductList from './ProductList';

const Dashboard = ({ products, handleSearchChange, handleSearch, handleEdit, handleDelete, searchQuery }) => {
    return (
        <Container className="d-flex justify-content-center mt-5"> {/* Center the card */}
            <Card className="w-100"> {/* Set card width as needed */}
                <Card.Body>
                    <Row className="align-items-center mb-4">
                        <Col md={6}>
                            <Card.Title>Product List</Card.Title> {/* Left-aligned title */}
                        </Col>
                        <Col md={6} className="text-end"> {/* Right-aligned search bar */}
                            <input
                                type="text"
                                placeholder="Search product..."
                                onChange={handleSearchChange}
                                value={searchQuery}
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button onClick={handleSearch} variant="dark">Search</Button>
                        </Col>
                    </Row>

                    {/* Product List */}
                    {products.length === 0 ? (
                        <Card style={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
                            <Card.Body>
                                <Card.Text>No products available</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <ProductList
                            products={products}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;
