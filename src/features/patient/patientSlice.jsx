import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL =
  "https://568c8f30-80a5-409d-8229-dbd59a8f28f7-00-3v9h81st5qc19.sisko.replit.dev/";

const initialState = {
  patients: [],
  status: "idle",
  error: null,
};

const fetchPatientsAsync = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    try {
      const response = await fetch(API_BASE_URL + "patients");
      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData.data)
        return jsonData.data;
      } else {
        throw new Error("Unable to fetch all patients");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newPatient) => {
    try {
      const response = await fetch(API_BASE_URL + "patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to add patient");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    try {
      const response = await fetch(API_BASE_URL + `patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPatient),
      });
      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update patient");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    try {
      const response = await fetch(API_BASE_URL + `patients/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete patient");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatientsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = action.payload;
      })
      .addCase(fetchPatientsAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addPatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.patients.push(action.payload);
      })
      .addCase(addPatientAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updatePatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatientAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedPatient = action.payload;
        const index = state.patients.findIndex(
          (patient) => patient._id === updatedPatient._id,
        );
        if (index !== -1) {
          state.patients[index] = updatedPatient;
        }
      })
      .addCase(updatePatientAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deletePatientAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatientAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload._id,
        );
      })
      .addCase(deletePatientAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export {
  patientsSlice,
  fetchPatientsAsync,
  addPatientAsync,
  updatePatientAsync,
  deletePatientAsync,
};

export default patientsSlice.reducer;
