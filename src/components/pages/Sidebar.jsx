import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Box,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  People as SupplierIcon,
  Assignment as OrdersIcon,
  BarChart as ReportsIcon,
  Person as ProfileIcon,
  ExitToApp as LogoutIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon, // Hamburger icon
} from "@mui/icons-material";

const Sidebar = () => {
  const [open, setOpen] = useState(false); // State to manage sidebar visibility
  const isAuthenticated = UserService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate("/");
    }
  };

  const handleToggleSidebar = () => {
    setOpen(!open); // Toggle the sidebar state
  };

  return (
    <>
      {/* Hamburger Menu Icon (only on small screens) */}
      <IconButton
        onClick={handleToggleSidebar}
        sx={{
          display: { xs: "block", sm: "none" },
          color: "#E5E5E5",
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10, // Ensure it is above other elements
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer for small devices */}
      <Drawer
        variant="temporary" // Temporary variant for mobile
        anchor="left"
        open={open}
        onClose={handleToggleSidebar}
        PaperProps={{
          style: {
            backgroundColor: "#0f52bd", // Changed to blue (you can adjust the shade)
            width: "280px",
            color: "#E5E5E5",
            borderRight: "2px solid #173F1F",
          },
        }}
      >
        {/* User Section */}
        <Box textAlign="center" py={3} sx={{ backgroundColor: "#303F9F" }}>
          <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 1 }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Stock Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#C2C2C2" }}>
            Welcome, User
          </Typography>
        </Box>

        <Divider style={{ backgroundColor: "#C2C2C2" }} />

        <List>
          {/* Sidebar Menu Items */}
          {[
            { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
            { label: "Products", icon: <InventoryIcon />, path: "/products" },
            { label: "Category", icon: <SupplierIcon />, path: "/category" },
            { label: "Suppliers", icon: <OrdersIcon />, path: "/orders" },
            { label: "Stock Levels", icon: <InventoryIcon />, path: "/stock-levels" },
            { label: "Reports", icon: <ReportsIcon />, path: "/reports" },
            { label: "User Management", icon: <ProfileIcon />, path: "/user-management" },
            { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  backgroundColor: "#1976D2", // Hover color changed to blue
                },
                color: "#E5E5E5",
              }}
            >
              <ListItemIcon sx={{ color: "#E5E5E5" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider style={{ backgroundColor: "#C2C2C2" }} />

        {/* Logout Button */}
        {isAuthenticated && (
          <Box textAlign="center" py={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8B0000",
                "&:hover": {
                  backgroundColor: "#A52A2A",
                },
                color: "#fff",
                width: "80%",
                fontWeight: "bold",
              }}
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Drawer>

      {/* Sidebar for larger devices */}
      <Drawer
        variant="permanent" // Permanent variant for larger devices
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        PaperProps={{
          style: {
            backgroundColor: "#3F51B5", // Changed to blue (you can adjust the shade)
            width: "280px",
            color: "#E5E5E5",
            borderRight: "2px solid #173F1F",
          },
        }}
      >
        {/* User Section */}
        <Box textAlign="center" py={3} sx={{ backgroundColor: "#303F9F" }}>
          <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 1 }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            Stock Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#C2C2C2" }}>
            Welcome, User
          </Typography>
        </Box>

        <Divider style={{ backgroundColor: "#C2C2C2" }} />

        <List>
          {/* Sidebar Menu Items */}
          {[
            { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
            { label: "Products", icon: <InventoryIcon />, path: "/product" },
            { label: "Category", icon: <SupplierIcon />, path: "/category" },
            { label: "Stock", icon: <InventoryIcon />, path: "/stock" },
            { label: "Sales", icon: <ReportsIcon />, path: "/sales" },
            { label: "User Management", icon: <ProfileIcon />, path: "/user-management" },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  backgroundColor: "#1976D2", // Hover color changed to blue
                },
                color: "#E5E5E5",
              }}
            >
              <ListItemIcon sx={{ color: "#E5E5E5" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider style={{ backgroundColor: "#C2C2C2" }} />

        {/* Logout Button */}
        {isAuthenticated && (
          <Box textAlign="center" py={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8B0000",
                "&:hover": {
                  backgroundColor: "#A52A2A",
                },
                color: "#fff",
                width: "80%",
                fontWeight: "bold",
              }}
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;
