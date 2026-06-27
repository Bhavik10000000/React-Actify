import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface EmpType {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  doj: string;
  salary: number;
  password: string;
  confirmPassword: string;
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
const API_URL =
  "https://peaceful-creation-production-a617.up.railway.app/employee";

export const fetchUser = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(API_URL);
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
  async (users, thunkAPI) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
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
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      // const data =  await response.json();
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: EmpType, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        // PUT OR PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update user.");
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
        state.data = [];
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (data: any) => data.id !== action.payload,
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = state.data.filter((data:any)=>data.id !== action.payload)
        const index = state.data.findIndex((emp) => emp.id === action.payload);
        state.data[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default EmpSlice.reducer;
