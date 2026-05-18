import express from "express";
import {
  getAllFoods,
  getOneFood,
  createFood,
  updateFood,
  deleteFood,
} from "../controller/foods.js";

const router = express.Router({ mergeParams: true });

router.get("/", getAllFoods);
router.put("/", createFood);
router.post("/:itemId", getOneFood);
router.patch("/:itemId", updateFood);
router.delete("/:itemId", deleteFood);

export default router;
