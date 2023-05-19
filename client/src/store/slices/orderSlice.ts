import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert } from "./alertSlice";

export interface OrderState {
  id: number;
  userid: number;
  technicid: number;
  dates: string;
  status: string;
  address: string;
}

interface InitialState {
  ordersList: OrderState[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}
const initialState: InitialState = {
  ordersList: [],
  status: "idle",
  error: "",
};

type OrderPayload = {
  username: string;
  userEmail: string;
  technicname: string;
  technicId: number;
  datesList: string[];
  token: string;
  address: string;
};
type DeletePayload = {
  id: number;
  token: string;
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async function (token: string, { rejectWithValue }) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/api/user/myOrders`,

        { headers: { authorization: "Bearer " + token } }
      );
      const responseOK = res && res.status === 200 && res.statusText === "OK";
      if (!responseOK) {
        throw new Error("Server Error!");
      }

      return res.data.orders;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addNewOrder = createAsyncThunk(
  "orders/addNewOrder",
  async function (payload: OrderPayload, { rejectWithValue, dispatch }) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/user/order`,
        {
          technicId: payload.technicId,
          dates: payload.datesList,
          username: payload.username,
          useremail: payload.userEmail,
          technicname: payload.technicname,
          address: payload.address,
        },
        { headers: { authorization: "Bearer " + payload.token } }
      );

      const responseOK =
        res && res.status === 201 && res.statusText === "Created";
      if (!responseOK) {
        throw new Error("Can't add order. Server error.");
      }

      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );

      return res.data.order;
    } catch (error: any) {
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async function (payload: DeletePayload, { rejectWithValue, dispatch }) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVERURL}/api/user/deleteOrder/${payload.id}`,

        { headers: { authorization: "Bearer " + payload.token } }
      );

      const responseOK =
        res && res.status === 201 && res.statusText === "Created";
      if (!responseOK) {
        throw new Error("Can't delete task. Server error.");
      }

      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );

      return payload.id;
    } catch (error: any) {
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
      return rejectWithValue(error.response.data.message);
    }
  }
);

const setError = (state: InitialState, action: PayloadAction<string>) => {
  state.status = "failed";
  state.error = action.payload;
};
const setPending = (state: InitialState) => {
  state.status = "pending";
  state.error = "";
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchOrders.pending, setPending);
    builder.addCase(addNewOrder.pending, setPending);
    builder.addCase(deleteOrder.pending, setPending);
    builder.addCase(
      fetchOrders.fulfilled,
      (state: InitialState, action: PayloadAction<OrderState[]>) => {
        state.status = "succeeded";
        state.ordersList = action.payload;
      }
    );
    builder.addCase(
      addNewOrder.fulfilled,
      (state: InitialState, action: PayloadAction<OrderState>) => {
        state.status = "succeeded";
        state.ordersList.push(action.payload);
      }
    );
    builder.addCase(
      deleteOrder.fulfilled,
      (state: InitialState, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.ordersList = state.ordersList.filter(
          (order) => order.id !== action.payload
        );
      }
    );
    builder.addCase(fetchOrders.rejected, setError);
    builder.addCase(addNewOrder.rejected, setError);
    builder.addCase(deleteOrder.rejected, setError);
  },
});

export default orderSlice.reducer;
