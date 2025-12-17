import { createRoot } from 'react-dom/client';
import './index.css';
import React from 'react';
import NavbarLayout from './layout/NavbarLayout.jsx';
import Home from './components/Home.jsx';
import Orders from './components/Orders.jsx';
import Products from './components/Products.jsx';
import Cart from './components/Cart.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AddProductForm from './components/AddProductForm.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById('root')).render(
  <>
  <ToastContainer/>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addProductsForm" element={<PrivateRoute><AddProductForm/></PrivateRoute>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </>
);