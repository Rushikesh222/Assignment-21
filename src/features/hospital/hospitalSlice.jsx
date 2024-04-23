import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPatients: 0,
  currentOccupancyRate: 0,
  topWard: null,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    updateHospitalStats: (state, action) => {
      const { totalPatients, currentOccupancyRate, topWard } = action.payload;
      state.totalPatients = totalPatients;
      state.currentOccupancyRate = currentOccupancyRate;
      state.topWard = topWard;
    },
    setTopWard: (state, action) => {
      state.topWard = action.payload;
    },
  },
});

export { hospitalSlice };

export const { updateHospitalStats, setTopWard } = hospitalSlice.actions;

export default hospitalSlice.reducer;
