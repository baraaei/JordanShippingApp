const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  trackingNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'In Transit'
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema);
