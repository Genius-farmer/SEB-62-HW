import express from "express";
import { getShoes } from "../controllers/shoesController.js";

const router = express.Router();

router.get("/shoes", getShoes);

export default router;
