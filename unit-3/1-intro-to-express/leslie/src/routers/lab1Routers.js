import express from "express";
import { getCollectible, getDiceRoll, getGreeting, getShoes } from "../controllers/lab1Controllers.js";

const router = express.Router();

router.get("/greetings/:id", getGreeting);
router.get("/roll/:max", getDiceRoll);
router.get("/collectibles/:index", getCollectible);
router.get("/shoes", getShoes);

export default router;
