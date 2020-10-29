import Location from '../models/Location.js';
import asyncHandler from 'express-async-handler';

// @desc      Get single location
// @route     GET /api/locations/:id
// @access    Public
const getLocationById = asyncHandler(async (req, res, next) => {
	const location = await Location.findById(req.params.id);

	if (!location) {
		res.status(404);
		throw new Error('Location not found');
	}

	res.status(200).json({ success: true, data: location });
});

// @desc    Create a Location
// @route   POST /api/location/
// @access  Private
const createLocation = asyncHandler(async (req, res) => {
	const location = await Location.create(req.body);

	res.status(201).json({
		success: true,
		data: location,
	});
});

// @desc      Update location
// @route     PUT /api/location/:id
// @access    Private
const updateLocation = asyncHandler(async (req, res, next) => {
	const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!location) {
		res.status(404);
		throw new Error('Location not found');
	}

	res.status(200).json({ success: true, data: location });
});

export { getLocationById, createLocation, updateLocation };
