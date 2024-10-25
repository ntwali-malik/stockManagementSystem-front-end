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
    TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SuppliersService from '../service/SupplierService'; // Import your service here
import { ArrowDropUp as ArrowDropUpIcon, ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

const SupplierContent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        contactNumber: '', // Changed from contactPerson to contactNumber
        phone: '',
        email: '',
        address: ''
    });
    const [editSupplier, setEditSupplier] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await SuppliersService.getAllSuppliers(token); // Adjust this function to your service
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching suppliers', error);
            }
        };

        fetchSuppliers();
    }, [token]);

    const handleAddSupplier = async () => {
        try {
            const data = await SuppliersService.createSupplier(newSupplier, token); // Adjust this function to your service
            setSuppliers([...suppliers, data]);
            setNewSupplier({
                name: '',
                contactNumber: '', // Reset contactNumber field
                email: '',
                address: ''
            });
        } catch (error) {
            console.error('Error adding supplier', error);
        }
    };

    const handleUpdateSupplier = async () => {
        try {
            const data = await SuppliersService.updateSupplier(editSupplier.id, editSupplier, token); // Adjust this function to your service
            setSuppliers(suppliers.map(supplier => (supplier.id === editSupplier.id ? data : supplier)));
            setEditSupplier(null);
            setOpen(false);
        } catch (error) {
            console.error('Error updating supplier', error);
        }
    };

    const handleDeleteSupplier = async (supplierId) => {
        try {
            await SuppliersService.deleteSupplier(supplierId, token); // Adjust this function to your service
            setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
        } catch (error) {
            console.error('Error deleting supplier', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditSupplier({ ...editSupplier, [name]: value });
    };

    const handleClickOpen = (supplier) => {
        setEditSupplier(supplier);
        setOpen(true);
    };

    const handleClose = () => {
        setEditSupplier(null);
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

    const sortedSuppliers = [...suppliers].sort((a, b) => {
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

    const paginatedSuppliers = sortedSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredSuppliers = paginatedSuppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) // Updated to use contactNumber
    );

    const totalSuppliers = sortedSuppliers.length;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Suppliers</h1>
            <TextField
                label="Search Suppliers"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />
            <TableContainer component={Paper}>
                <Table aria-label="supplier table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => handleSort('name')}>
                                Name {renderSortIcon('name')}
                            </TableCell>
                            <TableCell>Contact Number</TableCell> {/* Updated label here */}
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSuppliers.map(supplier => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.name}</TableCell>
                                <TableCell>{supplier.contactNumber}</TableCell> {/* Updated to use contactNumber */}
                                <TableCell>{supplier.email}</TableCell>
                                <TableCell>{supplier.address}</TableCell>
                                <TableCell>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(supplier)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSupplier(supplier.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalSuppliers}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>

            <h2>Add New Supplier</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSupplier(); }}>
                <TextField
                    label="Name"
                    name="name"
                    value={newSupplier.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contact Number" // Updated label here
                    name="contactNumber" // Changed from contactPerson to contactNumber
                    value={newSupplier.contactNumber} // Updated to use contactNumber
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={newSupplier.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address"
                    name="address"
                    value={newSupplier.address}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Add Supplier</Button>
            </form>

            {editSupplier && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Edit Supplier</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Edit supplier details below.</DialogContentText>
                        <TextField
                            label="Name"
                            name="name"
                            value={editSupplier.name}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contact Number" // Updated label here
                            name="contactNumber" // Changed from contactPerson to contactNumber
                            value={editSupplier.contactNumber} // Updated to use contactNumber
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={editSupplier.email}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={editSupplier.address}
                            onChange={handleEditInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleUpdateSupplier} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default SupplierContent;
