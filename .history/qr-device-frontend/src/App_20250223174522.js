import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS file

function App() {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/devices")
            .then(response => setDevices(response.data))
            .catch(error => console.error("Error fetching devices:", error));
    }, []);

    return (
        <div className="container">
            <h1>Device List</h1>
            {devices.map(device => (
                <div key={device._id} className="device-card">
                    <p className="device-name">{device.name} - {device.model}</p>

                    {/* Button to Show QR Code */}
                    <button className="qr-btn" onClick={() => setSelectedDevice(device._id)}>
                        Show QR Code
                    </button>

                    {/* Show QR Code when button is clicked */}
                    {selectedDevice === device._id && (
                        <div className="qr-container">
                            <img src={`http://localhost:5000/devices/qr/${device._id}`} alt="QR Code" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
