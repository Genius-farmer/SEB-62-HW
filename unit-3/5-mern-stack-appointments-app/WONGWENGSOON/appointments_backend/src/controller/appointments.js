import Appointment from "../models/appointment.js";

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find(
      {},
      { title: 1, type: 1, dateTime: 1, personMeeting: 1 },
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const getOneAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ status: "error", msg: "Appointment not found" });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      title: req.body.title,
      type: req.body.type,
      purpose: req.body.purpose,
      company: req.body.company,
      personMeeting: req.body.personMeeting,
      address: req.body.address,
      dateTime: req.body.dateTime,
      comments: req.body.comments,
    });
    res.status(201).json({
      status: "ok",
      msg: "Appointment created",
      id: appointment._id,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updateDetails = {};
    if ("title" in req.body) updateDetails.title = req.body.title;
    if ("type" in req.body) updateDetails.type = req.body.type;
    if ("purpose" in req.body) updateDetails.purpose = req.body.purpose;
    if ("company" in req.body) updateDetails.company = req.body.company;
    if ("personMeeting" in req.body)
      updateDetails.personMeeting = req.body.personMeeting;
    if ("address" in req.body) updateDetails.address = req.body.address;
    if ("dateTime" in req.body) updateDetails.dateTime = req.body.dateTime;
    if ("comments" in req.body) updateDetails.comments = req.body.comments;

    await Appointment.findByIdAndUpdate(req.params.id, updateDetails);
    res.json({ status: "ok", msg: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};
