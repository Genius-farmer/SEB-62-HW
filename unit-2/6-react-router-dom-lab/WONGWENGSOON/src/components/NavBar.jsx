import { Link } from "react-router";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/mailboxes">MailBoxes</Link>
      <Link to="/new-mailbox">New MailBox</Link>
    </nav>
  );
};

export default NavBar;
