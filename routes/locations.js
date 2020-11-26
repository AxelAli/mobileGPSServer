import getLocations from '../controllers/locations.js';

import express from 'express';
import protect from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getLocations);

export default router;
