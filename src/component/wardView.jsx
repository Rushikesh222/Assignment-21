import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWardsAsync } from "../features/ward/wardSlice";
import WardList from "../features/ward/wardList";

const WardView = () => {
  const { wards, status, error } = useSelector(({ wards }) => wards);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchWardsAsync());
      }
    };

    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">{error}</p>}
      {status === "success" && <WardList wards={wards} />}
    </div>
  );
};

export default WardView;
