import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchData } from "../shared/sharedFetch.jsx";

const AppointmentForm = () => {
  const { id } = useParams(); // if id exists → edit mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    purpose: "",
    company: "",
    personMeeting: "",
    address: "",
    dateTime: "",
    comments: "",
  });

  useEffect(() => {
    if (isEditMode) {
      const loadAppointment = async () => {
        const data = await fetchData(`/api/appointments/${id}`);
        setFormData({
          title: data.title || "",
          type: data.type || "",
          purpose: data.purpose || "",
          company: data.company || "",
          personMeeting: data.personMeeting || "",
          address: data.address || "",
          dateTime: data.dateTime ? data.dateTime.slice(0, 16) : "",
          comments: data.comments || "",
        });
      };
      loadAppointment();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await fetchData(`/api/appointments/${id}`, "PATCH", formData);
    } else {
      await fetchData("/api/appointments", "PUT", formData);
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{isEditMode ? "Edit Appointment" : "New Appointment"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="type"
          placeholder="Type (e.g. medical, lunch)"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          name="personMeeting"
          placeholder="Person meeting with"
          value={formData.personMeeting}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          name="dateTime"
          type="datetime-local"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
        />
        <button type="submit">
          {isEditMode ? "Save Changes" : "Create Appointment"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
