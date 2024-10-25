// Dashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
import ProductContent from './ProductContent';
import SalesContent from './SalesContent';
import StockContent from './StockContent';

const Stock = () => {
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
              STOCK
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Category Content */}
        <StockContent />
      </Grid>
    </Grid>
  );
};

export default Stock;
