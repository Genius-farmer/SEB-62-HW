const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

export const greetUser = (req, res) => {
  const { username } = req.params;
  res.send(`Hello there, ${username}!`);
};

export const rollDice = (req, res) => {
  const num = req.params.number;
  if (isNaN(num)) {
    return res.send("You must specify a nunber.");
  }
  const result = Math.floor(Math.random() * (Number(num) + 1));
  res.send(`You rolled a ${result}.`);
};

export const getCollectible = (req, res) => {
  const index = Number(req.params.index);
  const item = collectibles[index];
  if (!item) {
    return res.send("This item is not yet in stock. Check back soon!");
  }
  res.send(
    `So, you want the ${item.name}? For ${item.price}, it can be yours!`,
  );
};

export const filterShoes = (req, res) => {
  let results = shoes;
  if (req.query["min-price"]) {
    results = results.filter(
      (shoe) => shoe.price >= Number(req.query["min-price"]),
    );
  }
  if (req.query["max-price"]) {
    results = results.filter(
      (shoe) => shoe.price <= Number(req.query["max-price"]),
    );
  }
  if (req.query.type) {
    results = results.filter((shoe) => shoe.type === req.query.type);
  }
  res.send(results);
};
