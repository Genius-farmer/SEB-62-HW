import express from "express";
import {
  getAllAirlines,
  getOneAirline,
  createAirline,
  updateAirline,
  deleteAirline,
} from "../controller/airlines.js";

const router = express.Router();

router.get("/airlines", getAllAirlines);
router.get("/airlines/:id", getOneAirline);
router.put("/airlines/", createAirline);
router.patch("/airlines/:id", updateAirline);
router.delete("/airlines/:id", deleteAirline);

export default router;
