import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    purpose: { type: String, required: true },
    company: { type: String },
    personMeeting: { type: String },
    address: { type: String },
    dateTime: { type: Date, required: true },
    comments: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", AppointmentSchema);
