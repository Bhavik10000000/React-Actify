import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/slices/userSlice";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: { user: userSlice },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
