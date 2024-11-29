import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';  // Import Navigate
import SideBar from './components/SideBar';
import Dashboard from './components/Dashboard';
import SignUp from './SignUp';
import LoginForm from './LoginForm';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import './App.css';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setIsSignedIn(true);
    }
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  const handleUserSignOut = () => {
    setIsSignedIn(false);
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <div className="app-container">
        {isSignedIn && <SideBar />}
        <div className="content">
          <h1>Wings Cafe Inventory System</h1>

          {isSignedIn ? (
            <button onClick={handleUserSignOut} className="logout-button">
              Logout
            </button>
          ) : (
            <Link to="/signup" className="signup-link">Sign Up</Link>
          )}

          <Routes>
            {/* Public routes */}
            <Route path="/" element={isSignedIn ? <Dashboard products={products} /> : <LoginForm setIsSignedIn={setIsSignedIn} />} />
            <Route path="/signup" element={<SignUp users={users} setUsers={setUsers} />} />
            <Route path="/login" element={<LoginForm setIsSignedIn={setIsSignedIn} />} />

            {/* Private routes */}
            <Route 
              path="/product-management" 
              element={isSignedIn ? <ProductManagement setProducts={setProducts} /> : <LoginForm setIsSignedIn={setIsSignedIn} />} 
            />
            <Route 
              path="/user-management" 
              element={isSignedIn ? <UserManagement users={users} setUsers={setUsers} /> : <LoginForm setIsSignedIn={setIsSignedIn} />} 
            />
            {/* Redirect to dashboard if no matching route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />  {/* Use Navigate instead of Redirect */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
