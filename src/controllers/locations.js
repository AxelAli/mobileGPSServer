import Location from "../models/Location.js";
import asyncHandler from "express-async-handler";

// @desc      Get single location
// @route     GET /locations/:id
// @access    Public
const getLocationById = asyncHandler(async (req, res, next) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  res.status(200).json({ success: true, data: location });
});

// @desc    Create a Location
// @route   POST /location/
// @access  Private
const createLocation = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;

  const check = await Location.findOne({ user: req.user.id });

  if (check) {
    res.status(400);
    throw new Error("Location already exists");
  }

  res.status(201).json({
    success: true,
    data: location,
  });
});

// @desc      Update location
// @route     PUT /location/:id
// @access    Private
const updateLocation = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: location });
});

export { getLocationById, createLocation, updateLocation };
