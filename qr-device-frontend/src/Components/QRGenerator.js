import React from "react";
import { FiExternalLink } from "react-icons/fi";

function QRGenerator({ deviceId }) {
    const deviceUrl = `https://hindalco-machine.vercel.app/device-view/${deviceId}`;

    return (
<<<<<<< HEAD
        <div className="qr-generator">
            <h3>Scan or Click the QR Code</h3>
            <a 
                href={deviceUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img 
                    src={`https://hindalco-machine.onrender.com/devices/qr/${deviceId}`} 
                    alt="QR Code" 
                    className="qr-code-image"
                />
            </a>
            <p>Click the QR code or scan with your device</p>
            
            <a 
                href={deviceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-link-button"
            >
                <FiExternalLink className="link-icon" />
                Open Device Details
            </a>
=======
        <div>
            <h3>Scan the QR Code</h3>
            <img src={`http://localhost:7349/devices/qr/${deviceId}`} alt="QR Code" />
>>>>>>> 057ccdc9431877bc9dc1e00a86944c77dd2c0af4
        </div>
    );
}

export default QRGenerator;
