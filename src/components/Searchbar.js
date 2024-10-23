import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ handleSearchChange, handleSearch, searchQuery }) => {
    return (
        <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <Button variant="dark" type="submit" className="ms-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBar;
