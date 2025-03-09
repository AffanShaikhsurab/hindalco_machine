import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DeviceTemplate.css";

const DeviceTemplate = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    setLoading(true);
<<<<<<< HEAD
    axios.get(`https://hindalco-machine.onrender.com/device/${id}`)
=======
    axios.get(`http://localhost:7349/device/${id}`)
>>>>>>> 057ccdc9431877bc9dc1e00a86944c77dd2c0af4
      .then(response => {
        setDevice(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching device:", err);
        setError("Failed to load device information");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="device-template-loading">
        <div className="loading-spinner"></div>
        <p>Loading device information...</p>
      </div>
    );
  }

  if (error || !device) {
    return (
      <div className="device-template-error">
        <div className="error-icon">!</div>
        <h2>Device Not Found</h2>
        <p>{error || "The requested device could not be found"}</p>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get primary image or placeholder
  const getPrimaryImage = () => {
    if (device.images && device.images.length > 0) {
      const primaryImage = device.images.find(img => img.isPrimary) || device.images[0];
      return primaryImage.url;
    }
    return "https://via.placeholder.com/300x200?text=No+Image+Available";
  };
  
  // Get status badge class
  const getStatusClass = () => {
    const statusMap = {
      'active': 'status-active',
      'maintenance': 'status-maintenance',
      'retired': 'status-retired',
      'lost': 'status-lost'
    };
    return statusMap[device.status] || 'status-unknown';
  };
  
  return (
    <div className="device-template">
      <div className="device-template-header">
        <h1>Device Information</h1>
        <div className={`status-badge ${getStatusClass()}`}>
          {device.status || "Unknown"}
        </div>
      </div>
      
      <div className="device-template-card">
        <div className="device-image-container">
          <img src={getPrimaryImage()} alt={device.name} className="device-image" />
        </div>
        
        <div className="device-template-title">
          <h2>{device.name}</h2>
          <span className="model-badge">{device.model}</span>
        </div>
        
        <div className="device-tabs">
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={`tab-button ${activeTab === 'maintenance' ? 'active' : ''}`}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance
          </button>
        </div>
        
        {activeTab === 'details' && (
          <div className="device-template-details">
            <div className="detail-item">
              <span className="detail-label">Serial Number</span>
              <span className="detail-value">{device.serialNumber}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Manufacturer</span>
              <span className="detail-value">{device.manufacturer || "N/A"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">{device.category || "N/A"}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Location</span>
              <span className="detail-value">
                {device.location ? 
                  `${device.location.building || ""}, ${device.location.room || ""}, ${device.location.floor || ""}` 
                  : "N/A"}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Description</span>
              <p className="detail-value">{device.details || "No details available"}</p>
            </div>
          </div>
        )}
        
        {activeTab === 'specs' && (
          <div className="device-template-details">
            <div className="detail-item">
              <span className="detail-label">Purchase Date</span>
              <span className="detail-value">{formatDate(device.purchaseDate)}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Warranty Expiration</span>
              <span className="detail-value">{formatDate(device.warrantyExpiration)}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Additional Images</span>
              <div className="image-gallery">
                {device.images && device.images.length > 0 ? 
                  device.images.map((img, index) => (
                    <div key={index} className="gallery-image-container">
                      <img src={img.url} alt={img.caption} className="gallery-image" />
                      <span className="image-caption">{img.caption}</span>
                    </div>
                  )) : 
                  <p>No additional images available</p>
                }
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'maintenance' && (
          <div className="device-template-details">
            <h3 className="section-title">Maintenance History</h3>
            
            {device.maintenanceHistory && device.maintenanceHistory.length > 0 ? (
              <div className="maintenance-history">
                {device.maintenanceHistory.map((record, index) => (
                  <div key={index} className="maintenance-record">
                    <div className="maintenance-date">{formatDate(record.date)}</div>
                    <div className="maintenance-details">
                      <p className="maintenance-description">{record.description}</p>
                      <div className="maintenance-meta">
                        <span className="technician">Technician: {record.technician}</span>
                        <span className="cost">Cost: ${record.cost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-records">No maintenance records available</p>
            )}
          </div>
        )}
        
        <div className="device-template-actions">
          <button className="action-button primary">Report Issue</button>
          <button className="action-button">Request Service</button>
        </div>
      </div>
      
      <div className="device-template-footer">
        <p>Scan this device again to access this information in the future</p>
      </div>
    </div>
  );
};

export default DeviceTemplate;
