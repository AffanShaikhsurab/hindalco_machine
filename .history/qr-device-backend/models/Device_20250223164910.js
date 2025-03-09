const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: String,
    model: String,
    serialNumber: String,
    details: String
});

module.exports = mongoose.model("Device", deviceSchema);
