import express from "express";
import lab1Controllers from "./src/routers/lab1Routers.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", lab1Controllers);

app.listen(5001);
