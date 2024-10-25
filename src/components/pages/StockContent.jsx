import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import ProductService from '../service/ProductService'; // Service to fetch products

const StockContent = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch products and their remaining quantity on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await ProductService.getAllProducts(token);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [token]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Product Quantities</h1>
            <TableContainer component={Paper}>
                <Table aria-label="product table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Remaining Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StockContent;
