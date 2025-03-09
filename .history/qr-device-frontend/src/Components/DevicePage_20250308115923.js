import React, { useState, useEffect } from "react";
import "./DevicePage.css"; // We'll create this for styling

const DevicePage = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div className="loading">Loading devices...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    
    return (
        <div className="device-page">
            <h2>Device Inventory</h2>
            {devices.length === 0 ? (
                <p>No devices found. Add some devices to get started.</p>
            ) : (
                <div className="device-grid">
                    {devices.map(device => (
                        <div key={device._id} className="device-card">
                            <h3>{device.name}</h3>
                            <p className="model">{device.model}</p>
                            <p><strong>Serial:</strong> {device.serialNumber}</p>
                            <p><strong>Details:</strong> {device.details}</p>
                            
                            <button 
                                className="qr-button"
                                onClick={() => toggleDevice(device._id)}
                            >
                                {selectedDevice === device._id ? "Hide QR Code" : "Show QR Code"}
                            </button>

                            {selectedDevice === device._id && device.qrCode && (
                                <div className="qr-container">
                                    {/* Use the QR code directly from the device object */}
                                    <img 
                                        src={device.qrCode} 
                                        alt="QR Code" 
                                        className="qr-image" 
                                    />
                                    <a 
                                        href={device.qrCode} 
                                        download={`qr-${device.name}.png`}
                                        className="download-link"
                                    >
                                        Download QR
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DevicePage;
