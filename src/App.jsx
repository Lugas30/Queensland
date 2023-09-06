import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/global.css";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductView } from "./pages/ProductView";
import { Cart } from "./pages/Cart";
import { Shipping } from "./pages/Shipping";
import { Thankyou } from "./pages/Thankyou";
import { Signin } from "./pages/auth/Signin";
import { Register } from "./pages/auth/Register";
import { ForgotPass } from "./pages/auth/ForgotPass";

import axios from 'axios';

axios.defaults.baseURL = "https://api.queensland.id/api/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Shop/:categoryId" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductView />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Shipping" element={<Shipping />} />
          <Route path="/Thankyou" element={<Thankyou />} />
          <Route path="/auth/Signin" element={<Signin />} />
          <Route path="/auth/Register" element={<Register />} />
          <Route path="/auth/ForgotPass" element={<ForgotPass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
