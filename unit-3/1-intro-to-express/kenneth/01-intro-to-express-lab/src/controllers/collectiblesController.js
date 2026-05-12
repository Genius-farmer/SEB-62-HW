import { collectibles } from "../models/collectiblesModel.js";

export const getCollectible = (req, res) => {
  const index = Number(req.params.index);
  const item = collectibles[index];

  if (!item) {
    return res.send(`This item is not yet in stock. Check back soon!`);
  }

  res.send(
    `So, you want the ${item.name}? For ${item.price}, it can be yours!`,
  );
};
