import React from "react";

function QRGenerator({ deviceId }) {
    return (
        <div>
            <h3>Scan the QR Code</h3>
            <img src={`http://localhost:5000/devices/qr/${deviceId}`} alt="QR Code" />
        </div>
    );
}

export default QRGenerator;
