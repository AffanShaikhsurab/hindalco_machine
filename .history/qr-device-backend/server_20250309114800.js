const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const QRCode = require('qrcode');
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

    app.listen(7349, () => {
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
