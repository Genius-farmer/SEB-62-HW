import React from "react";
import { useParams } from "react-router";

const MailboxDetails = (props) => {
  const { mailboxId } = useParams();
  const mailbox = props.mailboxes.find((item) => item._id === Number(mailboxId));
  return (
    <section className="container">
      <h1>{`Mailbox ${mailbox._id}`}</h1>
      <h2>Details</h2>
      <ul>
        <li>{`Boxholder: ${mailbox.boxOwner}`}</li>
        <li>{`Box Size: ${mailbox.boxSize}`}</li>
      </ul>
    </section>
  );
};

export default MailboxDetails;
