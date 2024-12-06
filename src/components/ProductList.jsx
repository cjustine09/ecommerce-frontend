import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Barcode from 'react-barcode';

const ProductList = ({ products, handleEdit, handleDelete }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Function to handle sorting logic
    const handleSort = (key) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.key === key && prevState.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Sorting logic applied to products
    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Barcode</th>
                    <th>
                        Name{' '}
                        <Button
                            variant="black"
                            size="sm"
                            onClick={() => handleSort('name')}
                        >
                            {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </Button>
                    </th>
                    <th>Description</th>
                    <th>
                        Price{' '}
                        <Button
                            variant="black"
                            size="sm"
                            onClick={() => handleSort('price')}
                        >
                            {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </Button>
                    </th>
                    <th>Quantity{' '}
                        <Button
                            variant="black"
                            size="sm"
                            onClick={() => handleSort('quantity')}
                        >
                            {sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </Button></th>
                    <th>
                        Category{' '}
                        <Button
                            variant="black"
                            size="sm"
                            onClick={() => handleSort('category')}
                        >
                            {sortConfig.key === 'category' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </Button>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sortedProducts.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <Barcode
                                value={product.barcode}
                                width={1}
                                height={25}
                                displayValue={true}
                            />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td>
                            <Button variant="dark" onClick={() => handleEdit(product)}>
                                Edit
                            </Button>
                            <Button
                                variant="dark"
                                className="ms-2"
                                onClick={() => handleDelete(product.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductList;
