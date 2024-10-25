import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the AccountCircle icon

const Settings = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        bgcolor: 'background.default' 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 400, 
          bgcolor: 'background.paper', 
          borderRadius: 2,
          textAlign: 'center' 
        }}
      >
        <Box mt={2}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/profile" 
            startIcon={<AccountCircleIcon />} 
            sx={{ 
              px: 3, // Horizontal padding
              py: 1.5, // Vertical padding
              fontSize: '1rem', // Font size
              borderRadius: 2, // Rounded corners
            }}
          >
            Change Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
