import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar.jsx";
import AppointmentList from "./components/AppointmentList.jsx";
import AppointmentDetail from "./components/AppointmentDetail.jsx";
import AppointmentForm from "./components/AppointmentForm.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/new" element={<AppointmentForm />} />
        <Route path="/edit/:id" element={<AppointmentForm />} />
      </Routes>
    </>
  );
}

export default App;
