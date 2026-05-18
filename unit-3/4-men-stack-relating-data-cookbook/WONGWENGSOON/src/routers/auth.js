import express from "express";
import { signUp, signIn } from "../controller/auth.js";

const router = express.Router();

router.put("/sign-up", signUp);
router.post("/sign-in", signIn);

export default router;
