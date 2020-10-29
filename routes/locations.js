import express from 'express';
import {
	getLocationById,
	createLocation,
	updateLocation,
} from '../controllers/locations.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').post(createLocation);

router.route('/:id').get(getLocationById).put(updateLocation);

export default router;
