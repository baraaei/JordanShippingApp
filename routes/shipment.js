const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment');

// View All Shipments
router.get('/shipments', (req, res) => {
  Shipment.find()
    .then(shipments => {
      res.render('shipments', { pageTitle: 'Shipments', shipments });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/'); // Redirect if error occurs
    });
});

// Add Shipment Page
router.get('/add-shipment', (req, res) => {
  res.render('add-shipment', { pageTitle: 'Add Shipment' });
});

// Handle Shipment Submission
router.post('/add-shipment', (req, res) => {
  const { name, trackingNumber } = req.body;

  const shipment = new Shipment({ name, trackingNumber });
  shipment
    .save()
    .then(() => res.redirect('/shipments'))
    .catch(err => console.log(err));
});

// Edit Shipment Page (GET)
router.get('/edit-shipment/:id', (req, res) => {
  const shipmentId = req.params.id;

  // Find the shipment by ID
  Shipment.findById(shipmentId)
    .then(shipment => {
      // Render the edit form with existing shipment details
      res.render('edit-shipment', {
        pageTitle: 'Edit Shipment',
        shipment: shipment
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/shipments'); // Redirect if error occurs
    });
});

// Update Shipment Route (POST)
router.post('/edit-shipment/:id', (req, res) => {
  const shipmentId = req.params.id;
  const updatedName = req.body.name;
  const updatedTrackingNumber = req.body.trackingNumber;
  const updatedStatus = req.body.status;

  // Update the shipment in the database
  Shipment.findByIdAndUpdate(
    shipmentId,
    {
      name: updatedName,
      trackingNumber: updatedTrackingNumber,
      status: updatedStatus
    },
    { new: true }  // Return the updated document
  )
    .then(updatedShipment => {
      // Redirect to the shipments page after updating
      res.redirect('/shipments');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/shipments'); // Redirect if error occurs
    });
});

// Delete Shipment Route (POST)
router.post('/delete-shipment/:id', (req, res) => {
  const shipmentId = req.params.id;

  // Delete the shipment from the database
  Shipment.findByIdAndDelete(shipmentId)
    .then(() => {
      // Redirect to the shipments page after deletion
      res.redirect('/shipments');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/shipments'); // Redirect if error occurs
    });
});

module.exports = router;
