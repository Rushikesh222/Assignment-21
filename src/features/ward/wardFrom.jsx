import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addWardAsync, updateWardAsync } from "../../features";

const WardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const initialWardData = {
    wardNumber: 0,
    capacity: 0,
    specialization: "General Ward"
  };

  const [wardInput, setWardInput] = useState(
    isEditing
      ? {
          wardNumber: state.wardNumber,
          capacity: state.capacity,
          specialization: state.specialization
        }
      : initialWardData
  );

  const allSpecializations = [
    "General Ward",
    "Emergency Ward",
    "Intensive Care Unit (ICU)",
    "Intensive Coronary Care Unit (ICCU)",
    "Postnatal Care Ward",
    "Pediatric Ward",
    "Orthopedic Ward",
    "Psychiatric Ward",
    "Neurology Ward",
    "Cardiology Ward",
    "Surgical Ward",
    "Radiology Ward"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateWardAsync({
          id: state._id,
          updatedWard: wardInput
        })
      );
      navigate(`/wards/${state._id}`);
    } else {
      dispatch(addWardAsync(wardInput));
      navigate("/wards");
    }
  };

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} Ward</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Ward Number:</label>
          <input
            placeholder="Ward Number"
            type="number"
            min={0}
            value={wardInput.wardNumber}
            onChange={(e) =>
              setWardInput({ ...wardInput, wardNumber: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            placeholder="Capacity"
            type="number"
            min={0}
            value={wardInput.capacity}
            onChange={(e) =>
              setWardInput({ ...wardInput, capacity: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Specialization:</label>
          <select
            onChange={(e) =>
              setWardInput({
                ...wardInput,
                specialization: e.target.value
              })
            }
            value={wardInput.specialization}
          >
            {allSpecializations.map((specialization) => (
              <option value={specialization} key={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Ward</button>
      </form>
    </div>
  );
};

export default WardForm;
