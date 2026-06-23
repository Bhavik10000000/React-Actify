import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface EmpType {
  id: string;
  name: string;
  email: string;
  phone: number;
  department: string;
  designation: string;
  doj: string;
  salary: number;
}

interface EmpState {
  data: EmpType[];
  loading: boolean;
  error: string | null;
}

const initialState: EmpState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/employee");
      if (!response.ok) {
        throw new Error("Server error, Failed to load data.");
      }
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to add new user.");
      }
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const EmpSlice = createSlice({
  name: "empSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default EmpSlice.reducer;
