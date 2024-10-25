import React, { useState, useEffect } from 'react';
import SalesService from '../service/SalesService'; // Adjust the path to your SalesService
import ProductService from '../service/ProductService'; // Assuming you have a ProductService for fetching products
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const SalesContent = () => {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [saleData, setSaleData] = useState({
        productId: '',
        quantitySold: '',
        sellingPrice: '',
        salesDate: '',
        customerName: '',
        vatApplicable: false,
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
    const [customerNameFilter, setCustomerNameFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [selectedProductQuantity, setSelectedProductQuantity] = useState(0); // New state for selected product quantity

    useEffect(() => {
        fetchSales();
        fetchProducts();
    }, []);

    const fetchSales = async () => {
        try {
            const token = localStorage.getItem('token');
            const salesData = await SalesService.getAllSales(token);
            setSales(salesData);
        } catch (error) {
            setError('Failed to fetch sales');
            console.error('Error fetching sales:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const productData = await ProductService.getAllProducts(token);
            // Filter products to only include those with quantity greater than zero
            const availableProducts = productData.filter(product => product.quantity > 0);
            setProducts(availableProducts);
        } catch (error) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSaleData({
            ...saleData,
            [name]: type === 'checkbox' ? checked : value,
        });
        // Check for selected product and set its quantity
        if (name === 'productId') {
            const product = products.find(product => product.id === value);
            setSelectedProductQuantity(product ? product.quantity : 0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check stock availability
        if (parseInt(saleData.quantitySold, 10) > selectedProductQuantity) {
            alert('Insufficient stock to sell');
        }
        try {
            const token = localStorage.getItem('token');
            await SalesService.createSale({
                product: { id: saleData.productId },
                quantitySold: parseInt(saleData.quantitySold, 10),
                sellingPrice: parseFloat(saleData.sellingPrice),
                vatApplicable: saleData.vatApplicable,
                customerName: saleData.customerName,
                salesDate: saleData.salesDate
            }, token);
            alert('Sale added successfully!');
            setSaleData({
                productId: '',
                quantitySold: '',
                sellingPrice: '',
                salesDate: '',
                customerName: '',
                vatApplicable: false,
            });
            fetchSales();
        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error);
        }
    };

    // Function to filter sales by selected month and customer name
    const filteredSales = sales.filter((sale) => {
        const saleMonth = new Date(sale.salesDate).getMonth() + 1;
        const matchesMonth = !monthFilter || saleMonth === parseInt(monthFilter, 10);
        const matchesCustomerName = !customerNameFilter || sale.customerName.toLowerCase().includes(customerNameFilter.toLowerCase());
        return matchesMonth && matchesCustomerName;
    });

    // Sorting function
    const sortedSales = [...filteredSales].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const printPDF = async () => {
        const pdf = new jsPDF();
        const logoUrl = '/logoF.png';
        const logoImg = new Image();
        logoImg.src = logoUrl;

        logoImg.onload = async () => {
            pdf.addImage(logoImg, 'PNG', 10, 10, 40, 40);
            pdf.setFontSize(20);
            pdf.text('Sales Report', 70, 30);

            const table = document.querySelector('#salesTable');
            if (!table) {
                console.error('Sales table not found');
                return;
            }

            const canvas = await html2canvas(table, { useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 50, pdf.internal.pageSize.getWidth() - 20, (canvas.height * (pdf.internal.pageSize.getWidth() - 20)) / canvas.width);
            pdf.save('sales_report.pdf');
        };

        logoImg.onerror = () => {
            console.error('Error loading the logo image');
        };
    };

    return (
        <div>

            <div className="mb-8">
                <h3>Add New Sale</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Product</label>
                        <select
                            name="productId"
                            value={saleData.productId}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        >
                            <option value="">Select a product</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Quantity Sold</label>
                        <input
                            type="number"
                            name="quantitySold"
                            value={saleData.quantitySold}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            value={saleData.sellingPrice}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Customer Name</label>
                        <input
                            type="text"
                            name="customerName"
                            value={saleData.customerName}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Sales Date</label>
                        <input
                            type="date"
                            name="salesDate"
                            value={saleData.salesDate}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">VAT</label>
                        <input
                            type="checkbox"
                            name="vatApplicable"
                            checked={saleData.vatApplicable}
                            onChange={handleChange}
                        /> VAT applicable
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Sale
                    </button>
                </form>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Filter by Month</label>
                <select
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                >
                    <option value="">All Months</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filter by Customer Name */}
            <div className="mb-4">
                <label className="block text-gray-700">Filter by Customer Name</label>
                <input
                    type="text"
                    value={customerNameFilter}
                    onChange={(e) => setCustomerNameFilter(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <button 
                onClick={printPDF} 
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Print PDF
            </button>

            <table id="salesTable" className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('customerName')} className="cursor-pointer border border-gray-300 p-2">Customer Name</th>
                        <th onClick={() => requestSort('product.name')} className="cursor-pointer border border-gray-300 p-2">Product</th>
                        <th onClick={() => requestSort('quantitySold')} className="cursor-pointer border border-gray-300 p-2">Quantity Sold</th>
                        <th onClick={() => requestSort('product.purchasePrice')} className="cursor-pointer border border-gray-300 p-2">Purchase Price</th>
                        <th onClick={() => requestSort('sellingPrice')} className="cursor-pointer border border-gray-300 p-2">Selling Price</th>
                        <th onClick={() => requestSort('salesDate')} className="cursor-pointer border border-gray-300 p-2">Sales Date</th>
                        <th onClick={() => requestSort('vatApplicable')} className="cursor-pointer border border-gray-300 p-2">VAT Applicable</th>
                        <th onClick={() => requestSort('vat')} className="cursor-pointer border border-gray-300 p-2">VAT</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSales.map((sale, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 p-2">{sale.customerName}</td>
                            <td className="border border-gray-300 p-2">{sale.product.name}</td>
                            <td className="border border-gray-300 p-2">{sale.quantitySold}</td>
                            <td className="border border-gray-300 p-2">{sale.product.purchasePrice}</td>
                            <td className="border border-gray-300 p-2">{sale.sellingPrice}</td>
                            <td className="border border-gray-300 p-2">{new Date(sale.salesDate).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{sale.vatApplicable ? 'Yes' : 'No'}</td>
                            <td className="border border-gray-300 p-2">{sale.vat}</td>
                        </tr>
                    ))}
                    {/* Total VAT row */}
                        <tr>
                            <td className="border border-gray-300 p-2 font-bold" colSpan="7">Total VAT</td>
                            <td className="border border-gray-300 p-2 font-bold">
                                {sortedSales.reduce((total, sale) => total + sale.vat, 0).toFixed(2)}
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesContent;
