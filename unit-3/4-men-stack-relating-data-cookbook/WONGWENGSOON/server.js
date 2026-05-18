import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/db/db.js";
import auth from "./src/routers/auth.js";
import foods from "./src/routers/foods.js";
import { isSignedIn } from "./src/middleware/isSignedIn.js";
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) =>
  res.json({ status: "ok", msg: "Server running" }),
);

app.use("/auth", auth);

app.use(isSignedIn); // ← protects all routes below this line

app.use("/users/:userId/foods", foods);

app.listen(process.env.PORT || 5001);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({ status: "error", msg: err.message });
});
