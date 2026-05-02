import React from "react";
import { NavLink } from "react-router";
import styles from "./NavBar.module.css";
import paths from "../refs/paths";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={paths.home}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={paths.mailboxes}>
              Mailboxes
            </NavLink>
          </li>
          <li>
            <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={paths.newMailbox}>
              New Mailbox
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
