import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MailboxForm = (props) => {
  const [formData, setFormData] = useState({
    boxOwner: "",
    boxSize: "Small",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBox(formData);
    navigate("/mailboxes");
  };

  return (
    <>
      <h2>New Mailbox</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Boxholder:
          <input
            type="text"
            name="boxOwner"
            value={formData.boxOwner}
            onChange={handleChange}
            placeholder="Boxholder name"
          />
        </label>

        <label>
          Select a Box Size:
          <select
            name="boxSize"
            value={formData.boxSize}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MailboxForm;
