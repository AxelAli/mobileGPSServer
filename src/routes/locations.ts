import express from "express";
import { getHome, createHome, updateHome } from "../controllers/locations";

const router: express.Router = express.Router();

router.route("/").post(createHome);

router
  .route("/:id")
  .get(getHome)
  .put(updateHome);

export default router;
