import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addPatientAsync,
  updatePatientAsync,
  fetchWardsAsync
} from "../../features";

const PatientForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const { wards } = useSelector(({ wards }) => wards);

  const initialPatientData = {
    name: "",
    age: 0,
    gender: "Male",
    medicalHistory: "",
    contact: 0,
    ward: ""
  };

  const [patientInput, setPatientInput] = useState(
    isEditing
      ? {
          name: state.name,
          age: state.age,
          gender: state.gender,
          medicalHistory: state.medicalHistory.join(", "),
          contact: state.contact,
          ward: state.ward._id
        }
      : initialPatientData
  );

  const allGenders = ["Male", "Female", "Non-binary"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updatePatientAsync({
          id: state._id,
          updatedPatient: patientInput
        })
      );
      navigate(`/patients/${state._id}`);
    } else {
      dispatch(
        addPatientAsync({
          ...patientInput,
          ward: patientInput.ward ? patientInput.ward : wards[0]._id
        })
      );
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(fetchWardsAsync());
  }, [dispatch]);

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} patient</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            type="text"
            value={patientInput.name}
            onChange={(e) =>
              setPatientInput({ ...patientInput, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            placeholder="Age"
            type="number"
            min={0}
            value={patientInput.age}
            onChange={(e) =>
              setPatientInput({ ...patientInput, age: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <div className="radio-btn-container">
            {allGenders.map((gender) => (
              <label key={gender} className="radio-btn">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={
                    patientInput.gender &&
                    patientInput.gender.toLowerCase() === gender.toLowerCase()
                  }
                  onChange={() => setPatientInput({ ...patientInput, gender })}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Medical History:</label>
          <input
            placeholder="Separated by commas"
            type="text"
            value={patientInput.medicalHistory}
            onChange={(e) =>
              setPatientInput({
                ...patientInput,
                medicalHistory: e.target.value.replace(/ /g, "").split(",")
              })
            }
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            placeholder="Contact"
            type="number"
            min={0}
            value={patientInput.contact}
            onChange={(e) =>
              setPatientInput({
                ...patientInput,
                contact: e.target.value
              })
            }
            required
          />
        </div>
        <div>
          <label>Ward:</label>
          <select
            onChange={(e) =>
              setPatientInput({
                ...patientInput,
                ward: e.target.value
              })
            }
            value={patientInput.ward}
          >
            {wards.map(({ _id, wardNumber, specialization }) => (
              <option value={_id} key={_id}>
                {wardNumber} - {specialization}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
