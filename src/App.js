// App.js
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/common/Footer";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import Product from "./components/pages/Product";
import Category from "./components/pages/Category";
import Supplier from "./components/pages/Supplier";
import User from "./components/userspage/User";
import ReportsDashboard from "./components/pages/ReportsDashboard";
import Settings from "./components/pages/Settings";
import SettingDashboard from "./components/pages/SettingDashboard";
import RegisterDashboard from "./components/auth/RegisterDashboard";
import Sales from "./components/pages/Sales";
import Stock from "./components/pages/Stock";

function Layout({ children }) {
  const location = useLocation();
  const noHeaderFooterPaths = [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/profile",
    "/update-user",
    "/user-management",
    "/userDashboard",
    "/product",
    "/category",
    "/supplier",
    "/stock",
    "/reports",
    "/settings",
    "/sales",
    "/update-user/:userId"
  ];
  
  // Create a regex for dynamic paths
  const dynamicPathRegex = /^\/update-user\/\w+/;

  // Check if the current path is in the noHeaderFooterPaths or matches the dynamic regex
  const shouldHideHeaderFooter =
    noHeaderFooterPaths.includes(location.pathname.toLowerCase()) ||
    dynamicPathRegex.test(location.pathname.toLowerCase());

  return (
    <div>
      {!shouldHideHeaderFooter && <Navbar />}
      {children}
      {!shouldHideHeaderFooter && <FooterComponent />}
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<ProtectedRoute allowedRoles={['ADMIN']}><RegisterDashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><Dashboard /></ProtectedRoute>} />
            <Route path="/product" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><Product /></ProtectedRoute>} />
            <Route path="/category" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><Category /></ProtectedRoute>} />
            <Route path="/sales" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><Sales /></ProtectedRoute>} />
            <Route path="/stock" element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']}><Stock /></ProtectedRoute>} />
            <Route path="/register" element={<ProtectedRoute allowedRoles={['ADMIN']}><RegisterDashboard /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute allowedRoles={['ADMIN']}><User /></ProtectedRoute>} />
            <Route path="/update-user/:userId" element={<ProtectedRoute allowedRoles={['ADMIN']}><UpdateUser /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
export default App;
