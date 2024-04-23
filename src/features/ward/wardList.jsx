import React from "react";
import { Link, useNavigate } from "react-router-dom";

const WardList = ({ wards }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Wards View</h2>
      <button className="primary-btn" onClick={() => navigate("/wards/add")}>
        Add Ward
      </button>
      {wards.length === 0 ? (
        <p className="message">No wards available for display</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Ward Number</th>
              <th>Capacity</th>
              <th>Specialization</th>
            </tr>
          </thead>
          <tbody>
            {wards.map(({ _id, wardNumber, capacity, specialization }) =>{ console.log(wardNumber);
            return (
              <tr key={_id} className="item-card">
                <td>
                  <Link to={`/wards/${_id}`}>{wardNumber ?? "-"}</Link>
                </td>
                <td>
                  <Link to={`/wards/${_id}`}>{capacity ?? "-"}</Link>
                </td>
                <td>
                  <Link to={`/wards/${_id}`}>{specialization ?? "-"}</Link>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WardList;
