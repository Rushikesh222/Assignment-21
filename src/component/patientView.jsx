import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsAsync } from "../features/patient/patientSlice";
import PatientList from "../features/patient/patientList";

const PatientView = () => {
  const { patients, status, error } = useSelector(({ patients }) => patients);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchPatientsAsync());
      }
    };
    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">{error}</p>}
      {status === "success" && <PatientList patients={patients} />}
    </div>
  );
};

export default PatientView;
