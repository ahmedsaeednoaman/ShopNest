import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // تأكد من وجود ملف CSS لتنسيق الـ Sidebar

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "☰" : "✕"}
      </button>
      <h2>Dashboard</h2>
      <ul>
        <li>
          <NavLink
            to="/dashboard/products"
            activeClassName="active"
            className="nav-link"
          >
            <span className="icon">📦</span>
            {!isCollapsed && <span>Manage Products</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/users"
            activeClassName="active"
            className="nav-link"
          >
            <span className="icon">👤</span>
            {!isCollapsed && <span>Manage Users</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/orders"
            activeClassName="active"
            className="nav-link"
          >
            <span className="icon">📋</span>
            {!isCollapsed && <span>Manage Orders</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/settings"
            activeClassName="active"
            className="nav-link"
          >
            <span className="icon">⚙️</span>
            {!isCollapsed && <span>Settings</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;