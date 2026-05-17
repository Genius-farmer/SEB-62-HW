import dotenev from "dotenv";
dotenev.config();

import express from "express";
import airlines from "./src/routers/airlines.js";
import connectDB from "./src/db/db.js";
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json({ status: "ok", msg: "Server is running" });
});

app.use("/api", airlines);

app.listen(process.env.PORT || 5001);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({ status: "error", msg: err.message });
});
