import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchData } from "../shared/sharedFetch.jsx";

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const getAppointment = async () => {
      const data = await fetchData(`/api/appointments/${id}`);
      setAppointment(data);
    };
    getAppointment();
  }, [id]);

  if (!appointment) return <p>Loading...</p>;

  return (
    <div>
      <h1>{appointment.title}</h1>
      <p>
        <strong>Type:</strong> {appointment.type}
      </p>
      <p>
        <strong>Purpose:</strong> {appointment.purpose}
      </p>
      <p>
        <strong>Company:</strong> {appointment.company}
      </p>
      <p>
        <strong>Meeting With:</strong> {appointment.personMeeting}
      </p>
      <p>
        <strong>Address:</strong> {appointment.address}
      </p>
      <p>
        <strong>Date & Time:</strong>{" "}
        {new Date(appointment.dateTime).toLocaleString()}
      </p>
      <p>
        <strong>Comments:</strong> {appointment.comments}
      </p>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default AppointmentDetail;
