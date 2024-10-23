import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';
import SearchBar from './Searchbar';

const Dashboard = ({ products, handleEdit, handleDelete, searchQuery, loading, error, handleSearchChange, handleSearch }) => {
    
    return (
        <Container className="d-flex justify-content-center mt-5"> {/* Center the card */}
            <Card className="w-100"> {/* Set card width as needed */}
                <Card.Body>
                    <Row className="align-items-center mb-4">
                        <Col md={6}>
                            <Card.Title>Product List</Card.Title> {/* Left-aligned title */}
                        </Col>
                        <Col md={6} className="text-end"> {/* Right-aligned search bar */}
                            <SearchBar
                                handleSearchChange={handleSearchChange}  // Pass the search input handler
                                handleSearch={handleSearch}              // Pass the search form submission handler
                                searchQuery={searchQuery}                // Pass the current search query
                            />
                        </Col>
                    </Row>

                    {/* Conditional rendering for loading, error, and products */}
                    {loading && <p>Loading...</p>}  {/* Show loading message when data is being fetched */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message if something goes wrong */}

                    {!loading && !error && (
                        products.length === 0 ? (
                            <Card style={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
                                <Card.Body>
                                    <Card.Text>No products available</Card.Text>
                                </Card.Body>
                            </Card>
                        ) : (
                            <ProductList
                                products={products}  // Display all products
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;
