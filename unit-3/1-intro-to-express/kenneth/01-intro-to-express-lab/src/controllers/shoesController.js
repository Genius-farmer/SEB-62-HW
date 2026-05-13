import { shoes } from "../models/shoesModel.js";

export const getShoes = (req, res) => {
  let filteredShoes = [...shoes];
  const minPrice = Number(req.query["min-price"]);
  const maxPrice = Number(req.query["max-price"]);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }
  if (!isNaN(maxPrice)) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type);
  }

  res.json(filteredShoes);
};
