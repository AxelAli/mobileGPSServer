import express from "express";
import { createUser } from "../controllers/users";

const router: express.Router = express.Router();

router.route("/").post(createUser);

export default router;
