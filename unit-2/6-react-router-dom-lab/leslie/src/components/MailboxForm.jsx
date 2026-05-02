import React, { useState } from "react";
import styles from "./MailboxForm.module.css";

const MailboxForm = (props) => {
  const [mailbox, setMailbox] = useState({ boxOwner: "", boxSize: "Small" });

  const handleUpdate = (e) => {
    setMailbox((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <section className="container">
      <h1>New Mailbox</h1>
      <div className={styles.form}>
        <label htmlFor="boxholder-name">Enter a Boxholder:</label>
        <input
          type="text"
          id="boxholder-name"
          name="boxOwner"
          placeholder="Boxholder Name"
          value={mailbox.boxOwner}
          onChange={handleUpdate}
        />
        <label htmlFor="box-size">Enter a Boxholder:</label>
        <select id="box-size" name="boxSize" value={mailbox.boxSize} onChange={handleUpdate}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <button onClick={() => props.handleAdd(mailbox)}>Submit</button>
      </div>
    </section>
  );
};

export default MailboxForm;
