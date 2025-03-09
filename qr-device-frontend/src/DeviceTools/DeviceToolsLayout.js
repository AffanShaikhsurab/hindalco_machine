import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./DeviceTools.css";

const DeviceToolsLayout = () => {
  return (
    <div className="device-tools-layout">
      <header className="device-tools-header">
        <div className="logo">
          <h1>Device Tools</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/device-tools">Home</Link></li>
            <li><Link to="/devices">Device Inventory</Link></li>
          </ul>
        </nav>
      </header>
      <main className="device-tools-content">
        <Outlet />
      </main>
      <footer className="device-tools-footer">
        <p>&copy; 2025 Device Tools. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeviceToolsLayout;