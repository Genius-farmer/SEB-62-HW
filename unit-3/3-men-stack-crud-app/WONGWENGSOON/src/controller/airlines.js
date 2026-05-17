import Airline from "../models/airline.js";

export const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const getOneAirline = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    if (!airline) {
      return res
        .status(404)
        .json({ status: "error", msg: "Airline not found" });
    }
    res.json(airline);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const createAirline = async (req, res) => {
  try {
    const airline = await Airline.create({
      name: req.body.name,
      iataCode: req.body.iataCode,
      country: req.body.country,
      fleetSize: req.body.fleetSize,
    });
    res
      .status(201)
      .json({ status: "ok", msg: "Airline created", id: airline._id });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const updateAirline = async (req, res) => {
  try {
    const airline = await Airline.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      iataCode: req.body.iataCode,
      country: req.body.country,
      fleetSize: req.body.fleetSize,
    });
    res.json({ status: "ok", msg: "Airline updated" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const deleteAirline = async (req, res) => {
  try {
    await Airline.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "Airline deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
