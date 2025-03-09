const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const qr = require('qr-image');
const Device = require('./models/Device');

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://affanpics:affanaffan@cluster0.jafgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },     console.log('Connected to MongoDB')
);

    app.listen(5000, () => {
      console.log(`Server running on port 5000`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

startServer();

app.post("/add-device", async (req, res) => {
    try {
        const { name, model, serialNumber, details } = req.body;

        // Create a new device entry
        const newDevice = new Device({ name, model, serialNumber, details });

        // Generate a QR code that points to our frontend device viewer
        // IMPORTANT: Change this URL to your production URL when deployed
        const qrCodeData = `http://localhost:3000/device-tools/view/${newDevice._id}`;
        
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        // Store QR code in database
        newDevice.qrCode = qrCodeImage;
        await newDevice.save();

        res.json({ success: true, qrCodeUrl: qrCodeImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/devices", async (req, res) => {
    try {
        const devices = await Device.find(); 
        // Fetch all devices from MongoDB
        console.log(devices
        );
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new route to get a single device by ID
app.get("/device/:id", async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) {
            return res.status(404).json({ error: "Device not found" });
        }
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use("/devices", require("./routes/deviceRoutes"));

// Improved QR Code Generation
app.get('/devices/qr/:id', async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) return res.status(404).send('Device not found');
        
        const qrData = JSON.stringify({
            id: device._id,
            name: device.name,
            serial: device.serialNumber,
            lastUpdated: new Date()
        });

        const qr_svg = qr.image(qrData, {
            type: 'png',
            size: 10,
            margin: 2,
            ec_level: 'H'
        });
        
        res.type('png');
        qr_svg.pipe(res);
    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).send('Error generating QR code');
    }
});

// Enhanced Device Endpoint with Error Handling
app.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find().sort({ createdAt: -1 });
        res.json({
            status: 'success',
            results: devices.length,
            data: { devices }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch devices',
            error: error.message
        });
    }
});

// Add validation to device creation
app.post("/add-device", async (req, res) => {
    try {
        const { name, model, serialNumber } = req.body;
        if (!name || !model || !serialNumber) {
            return res.status(400).json({ 
                error: "Missing required fields: name, model, serialNumber" 
            });
        }

        const existingDevice = await Device.findOne({ serialNumber });
        if (existingDevice) {
            return res.status(409).json({ 
                error: "Device with this serial number already exists" 
            });
        }

        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
    cacth
);
