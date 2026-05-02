import { useState } from "react";
import { useNavigate } from "react-router";

const MailboxForm = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    boxOwner: "",
    boxSize: "Small",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBox(formData);
    navigate("/mailboxes");
  };

  return (
    <main>
      <h1>New Mailbox</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter a BoxHolder:</label>
        <input
          name="boxOwner"
          value={formData.boxOwner}
          onChange={handleChange}
        />
        <label>Select a Box Size:</label>
        <select name="boxSize" value={formData.boxSize} onChange={handleChange}>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default MailboxForm;
