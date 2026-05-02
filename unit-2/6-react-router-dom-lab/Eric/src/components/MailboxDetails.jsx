import React from "react";
import { useParams } from "react-router-dom";

const MailBoxDetails = (props) => {
  const { mailboxId } = useParams();
  const selectedBox = props.mailboxes.find(
    (mailbox) => mailbox._id === Number(mailboxId),
  );
  return (
    <main>
      {selectedBox ? (
        <div>
          <h1>Mailbox {selectedBox._id}</h1>
          <div className="space-y-4">
            <h2>Details</h2>
            <p>Box Owner: {selectedBox.boxOwner}</p>
            <p>Box Size: {selectedBox.boxSize}</p>
          </div>
        </div>
      ) : (
        <p>Mailbox not found.</p>
      )}
    </main>
  );
};

export default MailBoxDetails;
