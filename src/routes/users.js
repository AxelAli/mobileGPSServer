import express from "express";
import { authUser, registerUser, getUserById } from "../controllers/users.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").post(registerUser);

router.post("/login", authUser);

router.route("/:id").get(getUserById);

export default router;
