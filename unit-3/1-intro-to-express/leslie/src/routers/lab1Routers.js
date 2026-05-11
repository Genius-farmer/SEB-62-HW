import express from "express";
import { getGreeting } from "../controllers/lab1Controllers.js";

const router = express.Router();

router.get("/greetings/:id", getGreeting);

export default router;
