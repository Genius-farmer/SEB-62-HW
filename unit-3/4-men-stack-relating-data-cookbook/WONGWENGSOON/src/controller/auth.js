import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).json({ status: "ok", msg: "User created", id: user._id });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", msg: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    res.json({ status: "ok", token });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
