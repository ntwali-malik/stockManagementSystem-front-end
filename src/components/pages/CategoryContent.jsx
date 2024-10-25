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
    Snackbar,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryService from '../service/CategoryService';
import { ArrowDropUp as ArrowDropUpIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

const CategoryContent = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });
    const [editCategory, setEditCategory] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAllCategories(token);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, [token]);

    const handleAddCategory = async () => {
        if (categories.some(category => category.name.toLowerCase() === newCategory.name.toLowerCase())) {
            // Show error if category already exists
            setSnackbarMessage('Category already exists!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const data = await CategoryService.createCategory(newCategory, token);
            setCategories([...categories, data]);
            setNewCategory({ name: '', description: '' });
            // Show success message
            setSnackbarMessage('Category added successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding category', error);
            // Show error message
            setSnackbarMessage('Failed to add category.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            const data = await CategoryService.updateCategory(editCategory.id, editCategory, token);
            setCategories(categories.map(category => (category.id === editCategory.id ? data : category)));
            setEditCategory(null);
            setOpen(false);
            // Show success message
            setSnackbarMessage('Category updated successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating category', error);
            // Show error message
            setSnackbarMessage('Failed to update category.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await CategoryService.deleteCategory(categoryId, token);
            setCategories(categories.filter(category => category.id !== categoryId));
            // Show success message
            setSnackbarMessage('Category deleted successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting category', error);
            // Show error message
            setSnackbarMessage('Failed to delete category.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCategory({ ...editCategory, [name]: value });
    };

    const handleClickOpen = (category) => {
        setEditCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setEditCategory(null);
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

    const sortedCategories = [...categories].sort((a, b) => {
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

    const paginatedCategories = sortedCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredCategories = paginatedCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCategories = sortedCategories.length;

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>List Of Categories</h1>
                <TextField
                    label="Search Categories"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    margin="normal"
                />
                <TableContainer component={Paper}>
                    <Table aria-label="category table">
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSort('name')}>
                                    Name {renderSortIcon('name')}
                                </TableCell>
                                <TableCell onClick={() => handleSort('description')}>
                                    Description {renderSortIcon('description')}
                                </TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCategories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(category)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={totalCategories}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </TableContainer>

                <h2>Add New Category</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={newCategory.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={newCategory.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Add Category</Button>
                </form>

                {editCategory && (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Edit category details below.</DialogContentText>
                            <TextField
                                label="Name"
                                name="name"
                                value={editCategory.name}
                                onChange={handleEditInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={editCategory.description}
                                onChange={handleEditInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleUpdateCategory} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default CategoryContent;
