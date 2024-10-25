import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';

const DashboardContent = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [totalSales, setTotalSales] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [activities, setActivities] = useState([]);
  const [salesData, setSalesData] = useState([]); // For chart data

  useEffect(() => {
    // Function to fetch sales data for the chart
    const fetchSalesDataForChart = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sales/all');
        const sales = response.data;

        // Create an array to hold the total sales for each month
        const monthlySales = new Array(12).fill(0); // Initialize with 0 for 12 months

        sales.forEach(sale => {
          const month = new Date(sale.salesDate).getMonth(); // Get month index (0-11)
          monthlySales[month] += sale.quantitySold; // Accumulate sales per month
        });

        setSalesData(monthlySales); // Store monthly sales in state
      } catch (error) {
        console.error('Error fetching sales data for chart:', error);
      }
    };

    fetchSalesDataForChart();
  }, []);

  useEffect(() => {
    if (chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
            'Aug', 'Sep', 'Oct', 'Nov', 'Dec' // Added remaining months
          ],
          datasets: [
            {
              label: 'Product Sold',
              data: salesData, // Use fetched sales data
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [salesData]); // Re-run this effect whenever salesData changes

  // Fetch total sales count
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sales/totalSales');
        setTotalSales(response.data);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    fetchTotalSales();
  }, []);

  // Fetch recent activities
  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sales/all');
        const salesData = response.data;

        const activitiesList = salesData.map(sale => {
          return `${sale.customerName} purchased ${sale.quantitySold} units of ${sale.product.name}`;
        });

        setActivities(activitiesList);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchRecentActivities();
  }, []);

  // Fetch total products
  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Product/totalQuantity');
        setTotalQuantity(response.data);
      } catch (error) {
        console.error('Error fetching total Products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem', padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Stock Management Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Total Stock */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#f5f5f5', padding: '1.5rem', textAlign: 'center' }}>
            <CardContent>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Total Stock
              </Typography>
              <Typography sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'primary.main' }}>
                {totalQuantity}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Products Sold */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#f5f5f5', padding: '1.5rem', textAlign: 'center' }}>
            <CardContent>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Products Sold
              </Typography>
              <Typography sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'primary.main' }}>
                {totalSales}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Stock Levels Over Time (Chart) */}
        <Grid item xs={12}>
          <Paper sx={{ height: '350px', padding: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Stock Levels Over Time
            </Typography>
            <canvas ref={chartContainer} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: '1.5rem', backgroundColor: '#fafafa' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box>
              {activities.length === 0 ? (
                <Typography variant="body1" gutterBottom>
                  No recent activities found.
                </Typography>
              ) : (
                activities.map((activity, index) => (
                  <Typography key={index} variant="body1" gutterBottom>
                    - {activity}
                  </Typography>
                ))
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardContent;
