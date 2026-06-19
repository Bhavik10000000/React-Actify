import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const API_URL = "https://www.jsonkeeper.com/b/OMZAZ";

interface UserState {
  users: string[];
  loading: boolean;
  error: boolean;
}
const userData = ["Bhavik", "Pratham", "Daksh", "Talha"];

const initialState: UserState = {
  users: userData,
  loading: false,
  error: false,
};
export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
});

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    deleteUser(state) {
      state.users.pop();
    },
    clearUser(state) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addUser, deleteUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
