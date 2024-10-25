import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import ProductsService from '../service/ProductService';

const MonthlyProductChart = () => {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await ProductsService.getAllProducts(token);
                const productsWithProfitLoss = allProducts.map(product => {
                    const totalCost = product.purchasePrice + (product.tax || 0);
                    const profitOrLoss = product.sellingPrice - totalCost;

                    return {
                        name: product.name,
                        profitOrLoss: profitOrLoss.toFixed(2), // Keep it as a string for display
                        sellingPrice: product.sellingPrice,
                        purchasePrice: product.purchasePrice,
                    };
                });
                setProducts(productsWithProfitLoss);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, [token]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Product Transaction chart</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={products}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profitOrLoss" fill="#8884d8" name="Profit/Loss" />
                    <Bar dataKey="sellingPrice" fill="#82ca9d" name="Selling Price" />
                    <Bar dataKey="purchasePrice" fill="#ffc658" name="Cost Price" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyProductChart;
