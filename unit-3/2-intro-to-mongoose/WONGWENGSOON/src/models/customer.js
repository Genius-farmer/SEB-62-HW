import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.model("Customer", CustomerSchema);
