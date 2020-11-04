import express from 'express';
import {
	getLocations,
	getLocationById,
	deleteLocation,
	createLocation,
	updateLocation,
} from '../controllers/locations.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(getLocations).post(protect, createLocation);

router
	.route('/:id')
	.get(getLocationById)
	.put(protect, updateLocation)
	.delete(protect, deleteLocation);

export default router;
