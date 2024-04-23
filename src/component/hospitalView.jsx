import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatientsAsync,
  fetchWardsAsync,
  updateHospitalStats,
  setTopWard
} from "../features";

const HospitalView = () => {
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital);
  const { patients, status } = useSelector((state) => state.patients);
  const { wards } = useSelector((state) => state.wards);

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchPatientsAsync());
        dispatch(fetchWardsAsync());
      }
    };

    loadData();
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "success") {
      const totalPatients = patients.length;
      const totalCapacity = wards.reduce(
        (sum, { capacity }) => sum + capacity,
        0
      );
      let currentOccupancyRate;
      if (totalCapacity) {
        currentOccupancyRate = (patients.length / totalCapacity) * 100;
      } else {
        currentOccupancyRate = 0;
      }
      const wardCount = patients.reduce(
        (acc, { ward: { wardNumber } }) => ({
          ...acc,
          [wardNumber]: (acc[wardNumber] ?? 0) + 1
        }),
        {}
      );
      let topWard;
      if (Object.entries(wardCount).length !== 0) {
        topWard = Object.entries(wardCount).reduce(
          (final, [key, value]) => (value >= final[1] ? [key, value] : final),
          Object.entries(wardCount)[0]
        )[0];
      } else {
        topWard = "-";
      }

      dispatch(
        updateHospitalStats({
          totalPatients,
          currentOccupancyRate,
          topWard
        })
      );
      dispatch(setTopWard(topWard));
    }
  }, [patients, status, dispatch, wards]);

  return (
    <div className="page details-page">
      <h2>Hospital View</h2>
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">Error loading data</p>}
      {status === "success" && (
        <>
          <p>
            <strong>Total Patients: </strong>
            {hospital.totalPatients}
          </p>
          <p>
            <strong>Current Occupancy Rate: </strong>
            {hospital.currentOccupancyRate.toFixed(2)}%
          </p>
          <p>
            <strong>Top Ward: </strong>
            {hospital.topWard ? hospital.topWard : "-"}
          </p>
        </>
      )}
    </div>
  );
};

export default HospitalView;
