import express from "express";
import {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customers.js";

const router = express.Router();

router.get("/customers", getAllCustomers);
router.post("/customers", getOneCustomer);
router.put("/customers", createCustomer);
router.patch("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

export default router;
