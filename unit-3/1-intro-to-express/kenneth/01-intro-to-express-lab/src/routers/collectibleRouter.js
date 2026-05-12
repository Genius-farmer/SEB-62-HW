import express from "express";
import { getCollectible } from "../controllers/collectiblesController.js";

const router = express.Router();

router.get("/collectibles/:index", getCollectible);

export default router;
