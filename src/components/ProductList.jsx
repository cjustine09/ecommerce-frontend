// ProductList.js
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Barcode from 'react-barcode'; // Import barcode component

const ProductList = ({ products, handleEdit, handleDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Barcode</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <Barcode 
                                value={product.barcode} 
                                width={1}   // Adjust the width (default is 2)
                                height={30} // Adjust the height (default is 100)
                                displayValue={true} // Optionally hide the text value
                            />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.category}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleEdit(product)}>
                                Edit
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => handleDelete(product.id)}>
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
