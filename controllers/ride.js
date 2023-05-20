const express = require("express");
const router = express.Router();
const Ride = require("../models/ride");

// GET all rides
router.get("/rides", async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting rides");
  }
});

// POST a new ride
router.post("/rides", async (req, res) => {
  try {
    const newRide = new Ride({
      pickupLocation: JSON.stringify(req.body.pickupLocation),
      dropoffLocation: JSON.stringify(req.body.dropoffLocation),
      price: req.body.price,
      availableSeats: req.body.availableSeats,
      // ...
    });

    const ride = await newRide.save();
    res.status(200).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving ride");
  }
});

module.exports = router;
