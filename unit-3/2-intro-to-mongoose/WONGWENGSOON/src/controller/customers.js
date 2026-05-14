import Customer from "../models/customer.js";

// GET all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// POST - read one customer by id
export const getOneCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.body.id);
    if (!customer) {
      return res
        .status(404)
        .json({ status: "error", msg: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// PUT - create a new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      name: req.body.name,
      age: req.body.age,
    });
    res
      .status(201)
      .json({ status: "ok", msg: "Customer created", id: customer._id });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// PATCH - update a customer
export const updateCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
    });
    res.json({ status: "ok", msg: "Customer updated" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// DELETE - remove a customer
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
