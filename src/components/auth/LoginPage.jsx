import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { 
    Typography, 
    Container, 
    TextField, 
    Button, 
    Alert, 
    Link, 
    Box 
} from '@mui/material';
import Logo from '../assets/logoF.jpg.png'; // Adjust the path to your logo image

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate('/dashboard');
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    return (
        <div>
            <Container maxWidth="xs" style={{ marginTop: '100px' }}>
                {/* Company Logo and Name */}
            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={4}>
                <img src={Logo} alt="Company Logo" style={{ width: '100px', height: 'auto' }} />
                <Typography variant="h5" align="center" gutterBottom>
                    Fabritech-Stock Management
                </Typography>
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
                Sign In
            </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                    >
                        Login
                    </Button>
                </form>
            </Container>
        </div>
    );
}

export default LoginPage;
