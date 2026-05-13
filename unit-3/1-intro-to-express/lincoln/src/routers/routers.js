import express from "express";
import {
  checkCollectibles,
  checkGreetings,
  checkRolledNumber,
  checkShoes,
  checkMaxValue,
  checkMinValue,
  checkShoesType,
} from "../controllers/controllers.js";
import {
  validateCollectibles,
  validateGreeting,
  validateRolledNumber,
  validateShoes,
} from "../validators/validators.js";
import { checkErrors } from "../validators/checkErrors.js";

const routers = express.Router();

// 1. Be Polite, Greet the User
routers.get(
  "/greetings/:username",
  validateGreeting,
  checkErrors,
  checkGreetings,
);

//2. Rolling the Dice
routers.get(
  "/roll/:number",
  validateRolledNumber,
  checkErrors,
  checkRolledNumber,
);

//3. I Want THAT One!
routers.get(
  "/collectibles/:index",
  validateCollectibles,
  checkErrors,
  checkCollectibles,
);

//4. Filter Shoes by Query Parameters

routers.get("/shoes", validateShoes, checkErrors, checkShoes);

export default routers;
