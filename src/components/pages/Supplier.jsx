// Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import SupplierContent from './SupplierContent';

const Supplier = () => {
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
              SUPPLIER
            </Typography>
          </Toolbar>
        </AppBar>

        {/* SUPPLIER Content */}
        <SupplierContent />
      </Grid>
    </Grid>
  );
};

export default Supplier;
