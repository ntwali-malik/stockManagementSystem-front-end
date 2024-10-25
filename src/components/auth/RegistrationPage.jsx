import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Alert, 
    Box, 
    Link 
} from '@mui/material';
import Logo from '../assets/stock.png'; // Adjust the path as necessary

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        city: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                city: ''
            });
            setSuccess('User registered successfully');
            setError('');
            setTimeout(() => navigate('/admin/user-management'), 2000); // Navigate after 2 seconds

        } catch (error) {
            console.error('Error registering user:', error);
            setError('An error occurred while registering user');
            setSuccess('');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                REGISTER USER
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '16px' }}
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default RegistrationPage;
