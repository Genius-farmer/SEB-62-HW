import React from "react";
import { Link } from "react-router";
import styles from "./MailboxList.module.css";

const MailboxList = (props) => {
  return (
    <section className="container">
      <h1>Mailboxes</h1>
      <div className={styles.listing}>
        <ul>
          {props.mailboxes.map((mailbox, idx) => (
            <li key={idx}>
              <Link to={`/mailboxes/${mailbox._id}`}>{`Mailbox ${mailbox._id}`}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MailboxList;
