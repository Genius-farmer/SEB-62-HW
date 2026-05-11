import express from "express";
import { getCollectible, getDiceRoll, getGreeting } from "../controllers/lab1Controllers.js";

const router = express.Router();

router.get("/greetings/:id", getGreeting);
router.get("/roll/:max", getDiceRoll);
router.get("/collectibles/:index", getCollectible);

export default router;
