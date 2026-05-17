import mongoose from "mongoose";

const AirlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iataCode: { type: String, required: true },
  country: { type: String, required: true },
  fleetSize: { type: Number, required: true },
});

export default mongoose.model("Airline", AirlineSchema);
