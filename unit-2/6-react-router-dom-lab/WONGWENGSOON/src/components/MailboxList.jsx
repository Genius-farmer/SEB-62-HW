import { Link } from "react-router";
import "./mailboxlist.css";

const MailboxList = (props) => {
  return (
    <main>
      <h1>Mailbox List</h1>
      {props.mailboxes.map((mailbox) => (
        <Link key={mailbox._id} to={`/mailboxes/${mailbox._id}`}>
          Mailbox {mailbox._id}
        </Link>
      ))}
    </main>
  );
};

export default MailboxList;
