import { collectibles, shoes } from "../models/Models.js";

export const checkGreetings = (req, res) => {
  const name = req.params.username;
  const message = `Hello there, ${name}!`;
  res.send(message);
};

export const checkRolledNumber = (req, res) => {
  const string = req.params.number;
  const number = parseInt(string);
  const rolledNumber = Math.floor(Math.random() * (number + 1));
  res.send(`you rolled a ${rolledNumber}`);
};

export const checkCollectibles = (req, res) => {
  const string = req.params.index;
  const idx = parseInt(string);
  const item = collectibles[idx];
  res.send(
    `So you want the [${item.name}]? For [$${item.price}], it can be yours!`,
  );
};

export function checkMinValue(req, res) {
  const showShoes = [];
  const minValue = parseInt(req.query["min-price"]);
  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].price > minValue) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
}

export function checkMaxValue(req, res) {
  const showShoes = [];
  const maxValue = parseInt(req.query["max-price"]);
  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].price < maxValue) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
}

export const checkShoesType = (req, res) => {
  const showShoes = [];

  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].type == req.query.type) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
};

export const checkShoes = (req, res) => {
  const query = req.query;
  if (Object.keys(query) == "") {
    res.send(shoes);
  } else if (Object.keys(query) == "min-price") {
    checkMinValue(req, res);
  } else if (Object.keys(query) == "max-price") {
    checkMaxValue(req, res);
  } else if (Object.keys(query) == "type") {
    checkShoesType(req, res);
  } else {
    res.send("invalid query");
  }
};
