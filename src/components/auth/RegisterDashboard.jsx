// Dashboard.js
import React from 'react';
// import Sidebar from './Sidebar';
// import DashboardContent from './DashboardContent';
import { Grid, AppBar, Toolbar, Typography } from '@mui/material';
// import MonthlyProductChart from './MonthlyProductChart';
import RegistrationPage from './RegistrationPage';
import Sidebar from '../pages/Sidebar';

const RegisterDashboard = () => {
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
              Register
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <RegistrationPage />
      </Grid>
    </Grid>
  );
};

export default RegisterDashboard;
