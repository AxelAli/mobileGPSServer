import {
	createHome,
	deleteHome,
	getHomeById,
	getHomes,
	updateHome,
} from '../controllers/homes.js';

import express from 'express';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getHomes);

router
	.route('/:id')
	.get(protect, getHomeById)
	.post(protect, createHome)
	.put(protect, updateHome)
	.delete(protect, deleteHome);

export default router;
