import { param, query } from "express-validator";
import { collectibles, shoes } from "../models/Models.js";

export const validateGreeting = [
  param("username", "username is required").exists(),
  param("username", "username should be between 1 to 20 characters long")
    .trim()
    .isLength({ min: 1, max: 20 }),
];

export const validateRolledNumber = [
  param("number", "number is required").exists(),
  param("number", "input must be a number").isInt({ min: 1 }),
];

// learnt that if validator function not found on documentation or unknown, use custom() to create your own. Must return true if valid, else throw Error.
export const validateCollectibles = [
  param("index", "index is required").exists(),
  param("index", "index must be a number which cannot be negative").isInt({
    min: 0,
  }),
  param("index").custom((idx) => {
    if (!collectibles[idx]) {
      throw new Error("This item is not yet in stock. Check back soon!");
    }
    return true;
  }),
];

export const validateShoes = [
  query("max-price", "max-price must be a number and cannot be negative")
    .optional()
    .isInt({ min: 0 }),
  query("min-price", "min-price must be a number and cannot be negative")
    .optional()
    .isInt({ min: 0 }),
  query("type")
    .optional()
    .custom((type) => {
      const found = shoes.some((item) => item.type === type);
      if (!found) {
        throw new Error(`${type} is not found, please try again`);
      }
      return true;
    }),
];
