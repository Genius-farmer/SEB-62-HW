import dotenv from "dotenv";
dotenv.config();

import express from "express";
import customers from "./src/routers/customers.js";
import connectDB from "./src/db/db.js";
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", customers);

app.listen(process.env.PORT || 5001);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    status: "error",
    msg: err.message,
  });
});
