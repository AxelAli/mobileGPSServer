import Location from '../models/Location.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Fetch all locations
// @route   GET /api/locations
// @access  Public
const getLocations = asyncHandler(async (req, res) => {
	const locations = await Location.find();

	res.status(200).json(locations);
});

export default getLocations;
