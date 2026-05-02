import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import FourOFour from "./components/FourOFour";
import MailboxList from "./components/MailboxList";
import MailboxForm from "./components/MailboxForm";
import MailboxDetails from "./components/MailboxDetails";
import paths from "./refs/paths";

function App() {
  const [uniqueId, setUniqueId] = useState(4);
  const initMailBoxes = [
    {
      _id: 1,
      boxSize: "Small",
      boxOwner: "Alex",
    },
    {
      _id: 2,
      boxSize: "Medium",
      boxOwner: "Ben",
    },
    {
      _id: 3,
      boxSize: "Large",
      boxOwner: "Claire",
    },
  ];
  const [mailboxes, setMailboxes] = useState(initMailBoxes);

  const navigate = useNavigate();

  const addMailbox = (mailboxObj) => {
    const newId = uniqueId;
    setMailboxes((prevState) => [...prevState, { ...mailboxObj, _id: newId }]);
    setUniqueId((prevState) => prevState + 1);
    navigate(`${paths.mailboxes}/${newId}`);
  };

  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.mailboxes} element={<MailboxList mailboxes={mailboxes} />} />
        <Route path={paths.newMailbox} element={<MailboxForm handleAdd={addMailbox} />} />
        <Route path={paths.detailMailbox} element={<MailboxDetails mailboxes={mailboxes} />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </div>
  );
}

export default App;
