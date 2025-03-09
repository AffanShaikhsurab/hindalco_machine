import React from "react";

function QRGenerator({ deviceId }) {
    const deviceUrl = `https://hindalco-machine.vercel.app/device-view/${deviceId}`;

    return (
        <div>
            <h3>Scan or Click the QR Code</h3>
            <a 
                href={deviceUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img 
                    src={`http://localhost:7349/devices/qr/${deviceId}`} 
                    alt="QR Code" 
                />
            </a>
            <p>Click the QR code or scan with your device</p>
        </div>
    );
}

export default QRGenerator;
