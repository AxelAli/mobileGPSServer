import express from 'express';
import {
	authUser,
	registerUser,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from '../controllers/users.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);

router.post('/login', authUser);

router
	.route('/:id')
	.get(protect, getUserById)
	.delete(protect, deleteUser)
	.put(protect, updateUser);

export default router;
