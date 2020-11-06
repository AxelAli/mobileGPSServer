import {
  createLocation,
  deleteLocation,
  getLocationById,
  getLocations,
  updateLocation,
} from "../controllers/locations.js";

import express from "express";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getLocations).post(protect, createLocation);

router
  .route("/:id")
  .get(getLocationById)
  .post(protect, createLocation)
  .put(protect, updateLocation)
  .delete(protect, deleteLocation);

export default router;
