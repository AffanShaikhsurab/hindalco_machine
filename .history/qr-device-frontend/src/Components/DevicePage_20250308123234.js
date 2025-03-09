import React, { useState, useEffect } from "react";
import "./DevicePage.css";
import { motion } from "framer-motion";

const DevicePage = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // grid or list

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/devices")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch devices");
                }
                return res.json();
            })
            .then(data => {
                setDevices(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching devices:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function to toggle device selection
    const toggleDevice = (id) => {
        setSelectedDevice(selectedDevice === id ? null : id);
    };

    // Filter devices based on search input
    const filteredDevices = devices.filter(device => 
        device.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        device.model.toLowerCase().includes(filterValue.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(filterValue.toLowerCase())
    );

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your devices...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <div className="error-icon">!</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
                Try Again
            </button>
        </div>
    );
    
    return (
        <div className="device-page">
            <div className="page-header">
                <div className="header-content">
                    <h1>Device Inventory</h1>
                    <p className="subtitle">Manage and track your equipment portfolio</p>
                </div>
                
                <div className="action-bar">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search devices..."
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    
                    <div className="view-toggle">
                        <button 
                            className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <span className="grid-icon">□□<br/>□□</span>
                        </button>
                        <button 
                            className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <span className="list-icon">≡</span>
                        </button>
                    </div>
                </div>
            </div>

            {filteredDevices.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>No devices found</h3>
                    <p>
                        {filterValue 
                            ? `No results for "${filterValue}". Try different keywords.` 
                            : "Add some devices to get started."}
                    </p>
                    <button className="add-device-button">
                        Add New Device
                    </button>
                </div>
            ) : (
                <motion.div 
                    className={`device-container ${viewMode}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredDevices.map(device => (
                        <motion.div 
                            key={device._id} 
                            className="device-card"
                            variants={itemVariants}
                        >
                            <div className="card-header">
                                <h3>{device.name}</h3>
                                <span className="device-badge">{device.model}</span>
                            </div>
                            
                            <div className="device-info">
                                <div className="info-row">
                                    <span className="info-label">Serial</span>
                                    <span className="info-value">{device.serialNumber}</span>
                                </div>
                                
                                <div className="info-row">
                                    <span className="info-label">Details</span>
                                    <span className="info-value details">{device.details}</span>
                                </div>
                            </div>
                            
                            <div className="card-actions">
                                <button 
                                    className={`qr-button ${selectedDevice === device._id ? 'active' : ''}`}
                                    onClick={() => toggleDevice(device._id)}
                                >
                                    {selectedDevice === device._id ? "Hide QR Code" : "Show QR Code"}
                                </button>
                                
                                <button className="options-button">
                                    <span className="options-icon">⋮</span>
                                </button>
                            </div>

                            {selectedDevice === device._id && device.qrCode && (
                                <motion.div 
                                    className="qr-container"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <img 
                                        src={device.qrCode} 
                                        alt="QR Code" 
                                        className="qr-image" 
                                    />
                                    <div className="qr-actions">
                                        <a 
                                            href={device.qrCode} 
                                            download={`qr-${device.name}.png`}
                                            className="download-link"
                                        >
                                            <span className="download-icon">↓</span>
                                            Download
                                        </a>
                                        <button className="print-button">
                                            <span className="print-icon">🖨️</span>
                                            Print
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            )}
            
            <button className="fab-button">+</button>
        </div>
    );
};

export default DevicePage;
