import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import BusinessSetup from './pages/dashboard/BusinessSetup';
import CounterSetup from './pages/dashboard/CounterSetup';
import StaffManagement from './pages/dashboard/StaffManagement';
import LiveQueue from './pages/dashboard/LiveQueue';
import './App.css';

// Protected Route Component (Simple check)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<LiveQueue />} />
            <Route path="business" element={<BusinessSetup />} />
            <Route path="counters" element={<CounterSetup />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
