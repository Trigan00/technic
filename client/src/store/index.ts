import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";
import technicSlice from "./slices/technicSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    technic: technicSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
