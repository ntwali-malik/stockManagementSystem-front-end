// Dashboard.js
import React from 'react';
import Sidebar from '../pages/Sidebar';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import UserManagementPage from './UserManagementPage';

const User = () => {
  return (
    <Grid container>
      {/* Sidebar on the left */}
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <Sidebar />
      </Grid>

      {/* Main content area */}
      <Grid item xs={12} sm={8} md={9} lg={10}>
        {/* AppBar for the dashboard header */}
        <AppBar position="static" sx={{ backgroundColor: "#133075", color: "#E5E5E5" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Management
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Category Content */}
        <UserManagementPage />
      </Grid>
    </Grid>
  );
};

export default User;