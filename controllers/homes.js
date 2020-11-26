import Home from '../models/Home.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Fetch all homes
// @route   GET /api/homes
// @access  Public
const getHomes = asyncHandler(async (req, res) => {
	const homes = await Home.find();

	res.status(200).json(homes);
});

// @desc    Fetch single home
// @route   GET /api/homes/:id
// @access  Public
const getHomeById = asyncHandler(async (req, res) => {
	const home = await Home.findOne({
		user: mongoose.Types.ObjectId(req.params.id),
	});

	if (home) {
		res.status(200).json(home);
	} else {
		res.status(404);
		throw new Error('Home not found');
	}
});

// @desc    Delete a home
// @route   DELETE /api/homes/:id
// @access  Private
const deleteHome = asyncHandler(async (req, res) => {
	const home = await Home.findById(req.params.id);

	if (!home) {
		res.status(404);
		throw new Error('Home not found');
	}

	if (home.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorised');
	}

	await home.remove();

	res.status(200).json({ message: 'Home removed' });
});

// @desc    Create a home
// @route   POST /api/homes
// @access  Private
const createHome = asyncHandler(async (req, res) => {
	req.body.user = req.user.id;
	console.log(req.body);
	const home = await Home.create(req.body);

	res.status(201).json(home);
});

// @desc    Update a home
// @route   PUT /api/homes/:id
// @access  Private
const updateHome = asyncHandler(async (req, res) => {
	const home = await Home.findById(req.params.id);

	if (!home) {
		res.status(404);
		throw new Error('Home not found');
	}

	if (home.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorised');
	}
	console.log(req.body);

	const { home, current } = req.body;
	if (home) {
		home.home = home;
	}

	if (current) {
		home.current = current;
	}

	const updatedHome = await home.save();

	res.status(200).json(updatedHome);
});

export { getHomes, getHomeById, deleteHome, createHome, updateHome };
