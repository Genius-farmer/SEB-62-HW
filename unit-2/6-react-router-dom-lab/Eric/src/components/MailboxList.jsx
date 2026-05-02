import React from "react";
import { Link } from "react-router-dom";

const MailboxList = (props) => {
  return (
    <main>
      <h1>Mailbox List</h1>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {props.mailboxes.map((mailbox) => (
          <Link to={`/mailboxes/${mailbox._id}`} key={mailbox._id}>
            <div className="mail-box">{mailbox._id}</div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MailboxList;
