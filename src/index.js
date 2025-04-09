import React from "react";
import ReactDOM from "react-dom/client";

// استيراد ملفات الستايل
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // ✅ بدون أقواس

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,            // ✅ صفحة السلة - Redux
  Login,
  Register,
  Checkout,        // ✅ صفحة الدفع - Redux
  PageNotFound,
} from "./pages";

import OrderSuccess from './pages/OrderSuccess'; // ✅ استيراد صفحة نجاح الطلب
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

// ✅ استيراد AuthProvider و ProtectedRoute
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// ⬇️ الرندر الصحيح للتطبيق
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* 🔥 تغليف التطبيق بسياق المستخدم */}
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔒 حماية صفحة الدفع (Checkout) */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ScrollToTop>
          <Toaster /> {/* ✅ تنبيهات التوست */}
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
