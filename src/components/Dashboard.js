// Import necessary dependencies from React and React Bootstrap
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

// Import custom components for product listing and search bar
import ProductList from './ProductList';
import SearchBar from './Searchbar';

/**
 * Dashboard component that displays a list of products and a search bar.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.products - List of products to display
 * @param {Function} props.handleEdit - Handler for editing a product
 * @param {Function} props.handleDelete - Handler for deleting a product
 * @param {String} props.searchQuery - Current search query
 * @param {Boolean} props.loading - Flag indicating whether data is being fetched
 * @param {String} props.error - Error message if something goes wrong
 * @param {Function} props.handleSearchChange - Handler for search input changes
 * @param {Function} props.handleSearch - Handler for search form submission
 */
const Dashboard = ({
  products,
  handleEdit,
  handleDelete,
  searchQuery,
  loading,
  error,
  handleSearchChange,
  handleSearch,
}) => {
  return (
    // Container element to center the content horizontally
    <Container className="d-flex justify-content-center mt-5">
      <Card className="w-100">
        <Card.Body>
          {/* Row element to display the title and search bar */}
          <Row className="align-items-center mb-4">
            <Col md={6}>
              {/* Title of the product list */}
              <Card.Title>Product List</Card.Title>
            </Col>
            <Col md={6} className="text-end">
              {/* Search bar component with props for handling search input and submission */}
              <SearchBar
                handleSearchChange={handleSearchChange} // Pass the search input handler
                handleSearch={handleSearch} // Pass the search form submission handler
                searchQuery={searchQuery} // Pass the current search query
              />
            </Col>
          </Row>

          {/* Conditional rendering for loading, error, and products */}
          {loading && (
            // Display loading message when data is being fetched
            <p>Loading...</p>
          )}
          {error && (
            // Display error message if something goes wrong
            <p style={{ color: 'red' }}>{error}</p>
          )}

          {/* Display products if data is available and no errors */}
          {!loading && !error && (
            products.length === 0 ? (
              // Display message if no products are available
              <Card style={{ marginTop: '20px', padding: '20px', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Text>No products available</Card.Text>
                </Card.Body>
              </Card>
            ) : (
              // Display product list component with props for handling edit and delete actions
              <ProductList
                products={products} // Display all products
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

// Export the Dashboard component as the default export
export default Dashboard;