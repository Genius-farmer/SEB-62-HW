import React from "react";
import { Link } from "react-router-dom";

const MailboxList = (props) => {
  return (
    <main>
      <h2>Mailbox List</h2>

      <div className="mailbox-grid">
        {props.mailboxes.map((mailbox) => (
          <Link key={mailbox._id} to={`/mailboxes/${mailbox._id}`}>
            <div className="mail-box"> Mailbox {mailbox._id}</div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MailboxList;
