import express from "express";
import { sayHello } from "../controllers/sayHelloController.js";

const router = express.Router();

router.get("/hello", sayHello);

export default router;
