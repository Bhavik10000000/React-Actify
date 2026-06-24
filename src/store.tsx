import { configureStore } from "@reduxjs/toolkit";
import { EmpSlice } from "./features/EmpSlice";
import { useDispatch } from "react-redux";
import userSlice from "./store/slices/userSlice";

export const store = configureStore({
  reducer: { empSlice: EmpSlice.reducer,user: userSlice  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;


