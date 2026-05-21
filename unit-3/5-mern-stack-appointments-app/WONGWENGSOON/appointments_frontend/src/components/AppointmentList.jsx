import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchData } from "../shared/sharedFetch.jsx";
import AppointmentCard from "./AppointmentCard.jsx";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getAppointments = async () => {
    const data = await fetchData("/api/appointments");
    setAppointments(data);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleDelete = async (id) => {
    await fetchData(`/api/appointments/${id}`, "DELETE");
    getAppointments();
  };

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.map((appt) => (
        <AppointmentCard
          key={appt._id}
          appointment={appt}
          onDelete={handleDelete}
          onViewDetail={() => navigate(`/appointments/${appt._id}`)}
          onEdit={() => navigate(`/edit/${appt._id}`)}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
