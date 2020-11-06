import Location from "../models/Location.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc    Fetch all locations
// @route   GET /api/locations
// @access  Public
const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find();

  res.status(200).json(locations);
});

// @desc    Fetch single location
// @route   GET /api/locations/:id
// @access  Public
const getLocationById = asyncHandler(async (req, res) => {
  const location = await Location.findOne({
    user: mongoose.Types.ObjectId(req.params.id),
  });

  if (location) {
    res.status(200).json(location);
  } else {
    res.status(404);
    throw new Error("Location not found");
  }
});

// @desc    Delete a location
// @route   DELETE /api/locations/:id
// @access  Private
const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  if (location.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }

  await location.remove();

  res.status(200).json({ message: "Location removed" });
});

// @desc    Create a location
// @route   POST /api/locations
// @access  Private
const createLocation = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  console.log(req.body);
  const location = await Location.create(req.body);

  res.status(201).json(location);
});

// @desc    Update a location
// @route   PUT /api/locations/:id
// @access  Private
const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  if (location.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }
  console.log(req.body);

  const { home, current } = req.body;
  if (home) {
    location.home = home;
  }

  if (current) {
    location.current = current;
  }

  const updatedLocation = await location.save();

  res.status(200).json(location);
});

export {
  getLocations,
  getLocationById,
  deleteLocation,
  createLocation,
  updateLocation,
};
