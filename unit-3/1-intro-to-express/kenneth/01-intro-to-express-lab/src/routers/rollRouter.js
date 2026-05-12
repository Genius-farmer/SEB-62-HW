import express from "express";
import { rollDice } from "../controllers/rollController.js";

const router = express.Router();

router.get("/roll/:number", rollDice);

export default router;
