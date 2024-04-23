import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PatientList = ({ patients }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Patients View</h2>
      <button className="primary-btn" onClick={() => navigate("/patients/add")}>
        Add Patient
      </button>
      {patients.length === 0 ? (
        <p className="message">No patients available for display</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(({ _id, name, age, gender, ward }) => (
              <tr key={_id} className="item-card">
                <td>
                  <Link to={`/patients/${_id}`}>{name ?? "-"}</Link>
                </td>
                <td>
                  <Link to={`/patients/${_id}`}>{age ?? "-"}</Link>
                </td>
                <td>
                  <Link to={`/patients/${_id}`}>{gender ?? "-"}</Link>
                </td>
                <td>
                  <Link to={`/patients/${_id}`}>{ward.wardNumber ?? "-"}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
