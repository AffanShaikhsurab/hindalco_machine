import React, { useState, useEffect } from "react";

const DevicePage = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        fetch("mongodb+srv://affanpics:affanaffan@cluster0.jafgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devices") // Fetch data from backend
            .then(res => res.json())
            .then(data => setDevices(data))
            .catch(error => console.error("Error fetching devices:", error));
    }, []);

    return (
        <div>
            <h2>Device List</h2>
            {devices.map(device => (
                <div key={device._id} style={{ marginBottom: "20px", border: "1px solid black", padding: "10px" }}>
                    <h3>{device.name} ({device.model})</h3>
                    <p>Serial Number: {device.serialNumber}</p>
                    <p>Details: {device.details}</p>
                    
                    {/* Button to show QR Code */}
                    <button onClick={() => setSelectedDevice(device._id)}>
                        Show QR Code for {device._id}
                    </button>

                    {/* Display QR Code when button is clicked */}
                    {selectedDevice === device._id && (
                        <div>
                            <img src={`http://localhost:5000/devices/qr/${device._id}`} alt="QR Code" width="150" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DevicePage;
