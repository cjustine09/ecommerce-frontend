import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearchChange, handleSearch, searchQuery }) => {
    return (
        <Form className="d-flex w-100 w-md-75 w-lg-50 mx-auto mt-3" onSubmit={handleSearch}>
            <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="me-2"
            />
            <Button variant="dark" type="submit">
                Search
            </Button>
        </Form>
    );
};

export default SearchBar;
