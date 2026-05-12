import express from "express";

const app = express();

// 1. Be Polite, Greet the User
app.get("/greetings/:username", (req, res) => {
  const name = req.params.username;
  const message = `Hello there, ${name}!`;
  res.send(message);
});

//2. Rolling the Dice
app.get("/roll/:number", (req, res) => {
  const string = req.params.number;
  if (isNaN(string)) {
    res.send(`"${string}" is not a number, you must specify a number`);
  }
  const number = parseInt(string);
  const rolledNumber = Math.floor(Math.random() * (number + 1));
  res.send(`you rolled a ${rolledNumber}`);
});

//3. I Want THAT One!
const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const string = req.params.index;

  if (isNaN(string))
    return res.send(`${string} is not a number, please input a number`);

  const idx = parseInt(string);

  if (idx < collectibles.length && idx >= 0) {
    const item = collectibles[idx];
    res.send(
      `So you want the [${item.name}]? For [$${item.price}], it can be yours!`,
    );
  } else if (idx > collectibles.length) {
    res.send(`This item is not yet in stock. Check back soon!`);
  } else {
    res.send(`${idx} cannot be negative number`);
  }
});

//4. Filter Shoes by Query Parameters
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

function checkMinValue(req, res) {
  const showShoes = [];
  const minValue = parseInt(req.query["min-price"]);
  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].price > minValue) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
}

function checkMaxValue(req, res) {
  const showShoes = [];
  const maxValue = parseInt(req.query["max-price"]);
  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].price < maxValue) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
}

const checkShoesType = (req, res) => {
  const showShoes = [];

  for (let i = 0; i < shoes.length; i++) {
    if (shoes[i].type == req.query.type) {
      showShoes.push(shoes[i]);
    }
  }
  res.send(showShoes);
};

app.get("/shoes", (req, res) => {
  const query = req.query;
  if (Object.keys(query) == "") {
    res.send(shoes);
  } else if (Object.keys(query) == "min-price") {
    if (isNaN(Object.values(query))) return res.send("value is not a number");
    checkMinValue(req, res);
  } else if (Object.keys(query) == "max-price") {
    if (isNaN(Object.values(query))) return res.send("value is not a number");
    checkMaxValue(req, res);
  } else if (Object.keys(query) == "type") {
    const found = shoes.some((item) => item.type === query.type);
    if (!found) return res.send(`type ${query.type} is not valid`);
    checkShoesType(req, res);
  } else {
    res.send("invalid query");
  }
});

app.listen(5001);
