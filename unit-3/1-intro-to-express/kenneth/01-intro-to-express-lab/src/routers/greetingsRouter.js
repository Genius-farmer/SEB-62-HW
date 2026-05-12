import express from "express";
import { greetUser } from "../controllers/greetingsController.js";

const router = express.Router();

router.get("/greetings/:username", greetUser);

export default router;
