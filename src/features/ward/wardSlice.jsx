import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL =
  "https://568c8f30-80a5-409d-8229-dbd59a8f28f7-00-3v9h81st5qc19.sisko.replit.dev/";

const initialState = {
  wards: [],
  status: "idle",
  error: null,
};

const fetchWardsAsync = createAsyncThunk("wards/fetchWards", async () => {
  try {
    const response = await fetch(API_BASE_URL + "wards");
    if (response.status === 200) {
      const jsonData = await response.json();
      return jsonData.data;
    } else {
      throw new Error("Unable to fetch all wards");
    }
  } catch (error) {
    throw new Error(error.error);
  }
});

const addWardAsync = createAsyncThunk("wards/addWardAsync", async (newWard) => {
  try {
    const response = await fetch(API_BASE_URL + "wards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWard),
    });

    if (response.status === 201) {
      const jsonData = await response.json();
      return jsonData.data;
    } else {
      throw new Error("Unable to add ward");
    }
  } catch (error) {
    throw new Error(error.error);
  }
});

const updateWardAsync = createAsyncThunk(
  "wards/updateWardAsync",
  async ({ id, updatedWard }) => {
    try {
      const response = await fetch(API_BASE_URL + `wards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWard),
      });
      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update ward");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    try {
      const response = await fetch(API_BASE_URL + `wards/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete ward");
      }
    } catch (error) {
      throw new Error(error.error);
    }
  },
);

const wardsSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWardsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWardsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.wards = action.payload;
      })
      .addCase(fetchWardsAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addWardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWardAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.wards.push(action.payload);
      })
      .addCase(addWardAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateWardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWardAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedWard = action.payload;
        const index = state.wards.findIndex(
          (ward) => ward._id === updatedWard._id,
        );
        if (index !== -1) {
          state.wards[index] = updatedWard;
        }
      })
      .addCase(updateWardAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteWardAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWardAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.wards = state.wards.filter(
          (ward) => ward._id !== action.payload._id,
        );
      })
      .addCase(deleteWardAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export {
  wardsSlice,
  fetchWardsAsync,
  addWardAsync,
  updateWardAsync,
  deleteWardAsync,
};

export default wardsSlice.reducer;
