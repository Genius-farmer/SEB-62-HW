import express from "express";
import {
  greetUser,
  rollDice,
  getCollectible,
  filterShoes,
} from "../controller/lab.js";

const router = express.Router();

router.get("/greetings/:username", greetUser);
router.get("/roll/:number", rollDice);
router.get("/collectibles/:index", getCollectible);
router.get("/shoes", filterShoes);

export default router;
