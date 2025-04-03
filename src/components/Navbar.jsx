import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const state = useSelector(state => state.handleCart);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        {/* تغيير اسم العلامة التجارية إلى ShopNest */}
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          ShopNest
        </NavLink>

        {/* زر التبديل للشاشات الصغيرة */}
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* عناصر التنقل */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            {/* الصفحة الرئيسية */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {/* المنتجات */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>

            {/* من نحن */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            {/* الاتصال */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* الأزرار (تسجيل الدخول، التسجيل، سلة التسوق) */}
          <div className="buttons text-center">
            {/* تسجيل الدخول */}
            <NavLink to="/login" className="btn btn-outline-dark m-2">
              <i className="fa fa-sign-in-alt mr-1"></i> Login
            </NavLink>

            {/* التسجيل */}
            <NavLink to="/register" className="btn btn-outline-dark m-2">
              <i className="fa fa-user-plus mr-1"></i> Register
            </NavLink>

            {/* سلة التسوق */}
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
