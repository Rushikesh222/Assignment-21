import { configureStore } from "@reduxjs/toolkit";
import { hospitalSlice, patientsSlice, wardsSlice } from "../features";

export default configureStore({
  reducer: {
    hospital: hospitalSlice.reducer,
    patients: patientsSlice.reducer,
    wards: wardsSlice.reducer
  }
});
