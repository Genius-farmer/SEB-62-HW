import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">All Appointments</Link>
      <Link to="/new">+ New Appointment</Link>
    </nav>
  );
};

export default NavBar;
