import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import technicSlice from "./slices/technicSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    technic: technicSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
