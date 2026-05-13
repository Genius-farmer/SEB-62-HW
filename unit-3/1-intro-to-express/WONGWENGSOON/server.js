import dotenv from "dotenv";
dotenv.config();

import express from "express";
import lab from "./src/routers/lab.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", lab);

app.listen(process.env.PORT || 5001);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    msg: err.message,
  });
});
