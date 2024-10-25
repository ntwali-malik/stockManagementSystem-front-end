import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TablePagination,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Snackbar,
    Alert // To show notifications to users
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductsService from '../service/ProductService'; // Your service
import CategoriesService from '../service/CategoryService'; // Service to fetch categories
import { ArrowDropUp as ArrowDropUpIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

const ProductContent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // To store categories fetched from the backend
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        quantity: '',
        purchasePrice: '',
        tax: '', // This will store 0 for No Tax and 18 for VAT
        categoryId: ''
    });
    const [editProduct, setEditProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // To show success or error messages
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for the snackbar
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Severity for the snackbar

    const token = localStorage.getItem('token');

    // Fetch products and categories on mount
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productsData = await ProductsService.getAllProducts(token);
                const categoriesData = await CategoriesService.getAllCategories(token); // Assuming a service to fetch categories
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchProductsAndCategories();
    }, [token]);

    const handleAddProduct = async () => {
        try {
            const data = await ProductsService.createProduct(newProduct, token);
            setProducts([...products, data]);

            // Show success message
            setSnackbarMessage('Product added successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setNewProduct({
                name: '',
                description: '',
                quantity: '',
                purchasePrice: '',
                tax: '',
                categoryId: ''
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Show error message if the product already exists
                setSnackbarMessage(`Product with name '${newProduct.name}' already exists.`);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                console.error('Error adding product', error);
            }
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const data = await ProductsService.updateProduct(editProduct.id, editProduct, token);
            setProducts(products.map(product => (product.id === editProduct.id ? data : product)));
            setEditProduct(null);
            setOpen(false);

            // Show success message
            setSnackbarMessage('Product updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await ProductsService.deleteProduct(productId, token);
            setProducts(products.filter(product => product.id !== productId));

            // Show success message
            setSnackbarMessage('Product deleted successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handleClickOpen = (product) => {
        setEditProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setEditProduct(null);
        setOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const renderSortIcon = (column) => {
        if (sortBy === column) {
            return sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
        }
        return null;
    };

    const sortedProducts = [...products].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (aValue < bValue) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const paginatedProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = paginatedProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming product.category is an object
    );

    const totalProducts = sortedProducts.length;

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <TextField
                label="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table aria-label="product table" className="min-w-full">
                    <TableHead>
                        <TableRow className="bg-gray-200">
                            <TableCell onClick={() => handleSort('name')} className="cursor-pointer">
                                Name {renderSortIcon('name')}
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell onClick={() => handleSort('quantity')} className="cursor-pointer">
                                Quantity {renderSortIcon('quantity')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('purchasePrice')} className="cursor-pointer">
                                Purchase Price {renderSortIcon('purchasePrice')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('tax')} className="cursor-pointer">
                                Tax Rate {renderSortIcon('tax')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('category.name')} className="cursor-pointer">
                                Category {renderSortIcon('category.name')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('dateInserted')} className="cursor-pointer">
                                Date Inserted {renderSortIcon('dateInserted')}
                            </TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.purchasePrice}</TableCell>
                                <TableCell>{product.tax === 18 ? 'VAT' : 'No Tax'}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{new Date(product.dateInserted).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalProducts}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Form for adding a new product */}
            <h2 className="text-xl font-semibold mt-6">Add New Product</h2>
            <form noValidate autoComplete="off">
                <TextField
                    label="Product Name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Purchase Price"
                    name="purchasePrice"
                    type="number"
                    value={newProduct.purchasePrice}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tax</InputLabel>
                    <Select
                        name="tax"
                        value={newProduct.tax}
                        onChange={handleInputChange}
                    >
                        <MenuItem value={0}>No Tax</MenuItem>
                        <MenuItem value={18}>VAT (18%)</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="categoryId"
                        value={newProduct.categoryId}
                        onChange={handleInputChange}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProduct}
                    className="mt-4"
                >
                    Add Product
                </Button>
            </form>

            {/* Dialog for editing a product */}
            {editProduct && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Edit the details of the product below.</DialogContentText>
                        <TextField
                            label="Product Name"
                            name="name"
                            value={editProduct.name}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={editProduct.description}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={editProduct.quantity}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Purchase Price"
                            name="purchasePrice"
                            type="number"
                            value={editProduct.purchasePrice}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Tax</InputLabel>
                            <Select
                                name="tax"
                                value={editProduct.tax}
                                onChange={handleEditInputChange}
                            >
                                <MenuItem value={0}>No Tax</MenuItem>
                                <MenuItem value={18}>VAT (18%)</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="categoryId"
                                value={editProduct.categoryId}
                                onChange={handleEditInputChange}
                            >
                                {categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdateProduct} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Snackbar for success and error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductContent;
