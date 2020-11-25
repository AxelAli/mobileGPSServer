import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { username, pin } = req.body;

	const user = await User.findOne({ username }).select('+pin');

	if (user && (await user.matchPin(pin))) {
		res.json({
			_id: user._id,
			username: user.username,
			pin: user.pin,
			token: generateToken(user._id),
		});
	} else {
		res
			.status(401)
			.json({ success: false, msg: 'Invalid email or password' });
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, pin } = req.body;

	const userExists = await User.findOne({ username });

	if (userExists) {
		res
			.status(400)
			.json({ success: false, msg: 'User already exists' });
	}

	const user = await User.create({
		username,
		pin,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			pin: user.pin,
			token: generateToken(user._id),
		});
	} else {
		res
			.status(400)
			.json({ success: false, msg: 'Invalid credentials' });
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.status(200).json({ success: true, msg: 'User removed' });
	} else {
		res.status(404).json({ success: false, msg: 'User not found' });
	}
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404), json({ success: false, msg: 'User not found' });
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.username = req.body.username || user.username;

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
		});
	} else {
		res.status(404), json({ success: false, msg: 'User not found' });
	}
});

export {
	authUser,
	registerUser,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
