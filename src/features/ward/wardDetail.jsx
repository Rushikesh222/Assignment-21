import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWardAsync } from "./wardSlice";

const WardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wardToUpdate = useSelector((state) => {
    const wards = state.wards.wards;
    return wards.find((ward) => ward._id === id);
  });

  if (!wardToUpdate) {
    return <p>Ward not found!</p>;
  }

  const handleDelete = () => {
    dispatch(deleteWardAsync(id));
    navigate("/wards");
  };

  return (
    <div className="page details-page">
      <h2>Ward Detail</h2>
      <p>
        <strong>Ward Number: </strong>
        {wardToUpdate.wardNumber}
      </p>
      <p>
        <strong>Capacity: </strong>
        {wardToUpdate.capacity}
      </p>
      <p>
        <strong>Specialization: </strong>
        {wardToUpdate.specialization}
      </p>

      <Link to={`/wards/edit/${id}`} state={wardToUpdate}>
        <button className="primary-btn">Edit Details</button>
      </Link>

      <button className="secondary-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default WardDetail;
