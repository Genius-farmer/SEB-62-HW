import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MailboxDetails from "./components/MailBoxDetails";
import MailboxList from "./components/MailboxList";
import MailboxForm from "./components/MailboxForm";
import NavBar from "./components/NavBar";

function App() {
  const [mailboxes, setMailboxes] = useState([]);
  const addBox = (formData) => {
    const newMailbox = {
      ...formData,
      _id: mailboxes.length + 1,
    };
    setMailboxes([...mailboxes, newMailbox]);
  };
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Post Office</h1>
            </main>
          }
        />
        <Route
          path="/mailboxes"
          element={<MailboxList mailboxes={mailboxes} />}
        />
        <Route path="/new-mailbox" element={<MailboxForm addBox={addBox} />} />
        <Route
          path="/mailboxes/:mailboxId"
          element={<MailboxDetails mailboxes={mailboxes} />}
        />
      </Routes>
    </>
  );
}

export default App;
