import Collectibles from "../models/Lab1-3-model.js";
import Shoes from "../models/Lab1-4-model.js";

// . Be Polite, Greet the User

export const getGreeting = (req, res) => {
  res.send(`Hello there, ${req.params.id}!`);
};

// 2. Rolling the Dice

export const getDiceRoll = (req, res) => {
  if (req.params.max && req.params.max.trim().length > 0) {
    // Note: this is assuming general coding definition of between 0 and max where max is excluded.
    res.send(`You rolled a ${Math.floor(Math.random() * Number(req.params.max))}.`);
  } else {
    res.status(400).send("You must specify a number.");
  }
};

// 3. I Want THAT One!

export const getCollectible = (req, res) => {
  if (req.params.index && req.params.index.trim().length > 0) {
    const idx = Number(req.params.index);
    if (isNaN(idx)) {
      res.send("You must specify an index number.");
    } else if (idx < 0 || idx >= Collectibles.length) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const collectibleFound = Collectibles[idx];
      res.send(`The ${collectibleFound.name} is available at ${collectibleFound.price}.`);
    }
  } else {
    res.send("You must specify an index number.");
  }
};

// 4. Filter Shoes by Query Parameters

const checkQueryForErrors = (query) => {
  const errorMsgs = [];
  const minPrice = "min-price";
  const maxPrice = "max-price";
  const shoeType = "type";

  if (
    (minPrice in query && !(query[minPrice] && query[minPrice].trim().length > 0)) ||
    (minPrice in query && isNaN(Number(query[minPrice])))
  ) {
    errorMsgs.push(`You must specify a number for ${minPrice}.`);
  }

  if (
    (maxPrice in query && !(query[maxPrice] && query[maxPrice].trim().length > 0)) ||
    (maxPrice in query && isNaN(Number(query[maxPrice])))
  ) {
    errorMsgs.push(`You must specify a number for ${maxPrice}.`);
  }

  return errorMsgs.length > 0 && errorMsgs;
};

const isNotSmaller = (minValue, targetValue) => {
  return !(+targetValue < +minValue);
};

const isNotGreater = (maxValue, targetValue) => {
  return !(+targetValue > +maxValue);
};

const isShoeType = (matchValue, targetValue) => {
  return targetValue === matchValue;
};

export const getShoes = (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.send(Shoes);
    return;
  }

  const criteria = {
    "min-price": { checkFn: isNotSmaller, key: "price" },
    "max-price": { checkFn: isNotGreater, key: "price" },
    type: { checkFn: isShoeType, key: "type" },
  };

  const filteredQueryObj = Object.fromEntries(Object.entries(req.query).filter(([key]) => key in criteria));

  if (Object.keys(filteredQueryObj).length === 0) {
    res.status(400).send("No valid parameters were found in query");
  } else {
    const queryErrors = checkQueryForErrors(filteredQueryObj);

    if (queryErrors) {
      res.status(400).send(queryErrors.join(" "));
    } else {
      const result = Shoes.filter((shoe) =>
        Object.entries(filteredQueryObj).every(([key, value]) => criteria[key].checkFn(value, shoe[criteria[key].key])),
      );

      res.send(result);
    }
  }
};
