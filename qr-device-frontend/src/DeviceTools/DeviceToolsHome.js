import React from "react";
import { Link } from "react-router-dom";
import "./DeviceTools.css";

const DeviceToolsHome = () => {
  return (
    <div className="device-tools-home">
      <h2>Welcome to Device Tools</h2>
      <p>
        Scan a QR code to view device information or explore our device management tools.
      </p>
      
      <div className="tools-grid">
        <div className="tool-card">
          <h3>Device Inventory</h3>
          <p>View and manage all registered devices</p>
          <Link to="/devices" className="tool-link">
            Open Inventory
          </Link>
        </div>
        
        <div className="tool-card">
          <h3>Register Device</h3>
          <p>Add a new device to the system</p>
          <Link to="/add-device" className="tool-link">
            Register Device
          </Link>
        </div>
        
        <div className="tool-card">
          <h3>Generate QR Codes</h3>
          <p>Create QR codes for existing devices</p>
          <Link to="/generate-qr" className="tool-link">
            Generate QR
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeviceToolsHome;