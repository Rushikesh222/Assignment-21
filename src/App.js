import { Routes, Route, NavLink } from "react-router-dom";

import { HospitalView, PatientView, WardView } from "./component";
import { PatientDetail, PatientForm, WardDetail, WardForm } from "./features";

import "./styles.css";

export default function App() {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "500" : "",
    color: isActive ? "#f1e7ea" : ""
  });

  return (
    <div className="App">
      <div>
        <h1>Patient Management System</h1>
        <nav>
          <ul className="navbar">
            <li>
              <NavLink to="/" style={isActiveStyle} className="nav-item">
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink to="/wards" style={isActiveStyle} className="nav-item">
                Wards
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/hospital"
                style={isActiveStyle}
                className="nav-item"
              >
                Hospital
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<PatientView />} />
        <Route path="/wards" element={<WardView />} />
        <Route path="/hospital" element={<HospitalView />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/edit/:id" element={<PatientForm />} />
        <Route path="/wards/:id" element={<WardDetail />} />
        <Route path="/wards/add" element={<WardForm />} />
        <Route path="/wards/edit/:id" element={<WardForm />} />
      </Routes>
      <footer>
        <p>Designed and Developed by Vishal Singh Rawat</p>
      </footer>
    </div>
  );
}
