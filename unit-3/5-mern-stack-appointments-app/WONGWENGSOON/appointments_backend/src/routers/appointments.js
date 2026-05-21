import express from "express";
import {
  getAllAppointments,
  getOneAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controller/appointments.js";

const router = express.Router();

router.get("/appointments", getAllAppointments);
router.get("/appointments/:id", getOneAppointment);
router.put("/appointments", createAppointment);
router.patch("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

export default router;
