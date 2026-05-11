import express from "express";
import { getDiceRoll, getGreeting } from "../controllers/lab1Controllers.js";

const router = express.Router();

router.get("/greetings/:id", getGreeting);
router.get("/roll/:max", getDiceRoll);

export default router;
