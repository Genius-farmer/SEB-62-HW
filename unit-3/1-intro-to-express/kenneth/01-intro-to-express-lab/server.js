import express from "express";
import greetingRouter from "./src/routers/greetingsRouter.js";
import rollRouter from "./src/routers/rollRouter.js";
import collectibleRouter from "./src/routers/collectibleRouter.js";
import sayHelloRouter from "./src/routers/sayHelloRouter.js";
import shoesRouter from "./src/routers/shoesRouter.js";

const app = express();

app.use("/", shoesRouter);

app.listen(5002);
