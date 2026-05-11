import Collectibles from "../models/Lab1-3-model.js";

export const getGreeting = (req, res) => {
  res.send(`Hello there, ${req.params.id}!`);
};

export const getDiceRoll = (req, res) => {
  if (req.params.max && req.params.max.trim().length > 0) {
    // Note: this is assuming general coding definition of between 0 and max where max is excluded.
    res.send(`You rolled a ${Math.floor(Math.random() * Number(req.params.max))}.`);
  } else {
    res.status(400).send("You must specify a number.");
  }
};

export const getCollectible = (req, res) => {
  if (req.params.index && req.params.index.trim().length > 0) {
    const idx = Number(req.params.index);
    if (idx < 0 || idx >= Collectibles.length) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const collectibleFound = Collectibles[idx];
      res.send(`The ${collectibleFound.name} is available at ${collectibleFound.price}.`);
    }
  } else {
    res.send("You must specify an index number.");
  }
};
