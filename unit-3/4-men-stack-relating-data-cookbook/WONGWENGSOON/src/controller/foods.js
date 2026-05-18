import User from "../models/user.js";

// GET all foods in pantry
export const getAllFoods = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({ status: "error", msg: "User not found" });
    res.json(user.pantry);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// POST - show one food item
export const getOneFood = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({ status: "error", msg: "User not found" });
    const food = user.pantry.id(req.params.itemId);
    if (!food)
      return res.status(404).json({ status: "error", msg: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// PUT - add food to pantry
export const createFood = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({ status: "error", msg: "User not found" });
    user.pantry.push({ name: req.body.name });
    await user.save();
    res.status(201).json({ status: "ok", msg: "Food added to pantry" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// PATCH - update a food item
export const updateFood = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({ status: "error", msg: "User not found" });
    const food = user.pantry.id(req.params.itemId);
    if (!food)
      return res.status(404).json({ status: "error", msg: "Food not found" });
    food.name = req.body.name;
    await user.save();
    res.json({ status: "ok", msg: "Food updated" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// DELETE - remove a food item
export const deleteFood = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(404).json({ status: "error", msg: "User not found" });
    user.pantry.pull(req.params.itemId);
    await user.save();
    res.json({ status: "ok", msg: "Food deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
