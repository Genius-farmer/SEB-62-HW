const AppointmentCard = ({ appointment, onDelete, onViewDetail, onEdit }) => {
  return (
    <div>
      <h3>{appointment.title}</h3>
      <p>Type: {appointment.type}</p>
      <p>With: {appointment.personMeeting}</p>
      <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
      <button onClick={onViewDetail}>View Details</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(appointment._id)}>Delete</button>
    </div>
  );
};

export default AppointmentCard;
