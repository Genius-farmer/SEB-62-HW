import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
          <label htmlFor="boxOwner">Enter a Boxholder:</label>
          <input
            id="boxOwner"
            type="text"
            name="boxOwner"
            value={formData.boxOwner}
            onChange={handleChange}
            placeholder="Boxholder name"
          />
        </div>
        <div>
          <label htmlFor="boxSize">Select a Box Size:</label>
          <select
            id="boxSize"
            name="boxSize"
            value={formData.boxSize}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default MailboxForm;
