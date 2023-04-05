import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface TechnicState {
  id: number;
  name: string;
  type: string;
  fullDescription: string;
  shortDescription: string;
  characteristic: string;
  imgname: string;
  imgFileDescription: string;
  price: number;
}

interface State {
  technicList: TechnicState[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string;
}
const initialState: State = {
  technicList: [],
  status: "idle",
  error: "",
};

export const fetchTechnic = createAsyncThunk(
  "technic/fetchTechnic",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/api/technic/getAll`
      );

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data = await response.json();

      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const technicSlice = createSlice({
  name: "technic",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchTechnic.pending, (state: State) => {
      state.status = "pending";
      state.error = "";
    });
    builder.addCase(
      fetchTechnic.fulfilled,
      (state: State, action: PayloadAction<TechnicState[]>) => {
        state.status = "succeeded";
        state.technicList = action.payload;
      }
    );
    builder.addCase(
      fetchTechnic.rejected,
      (state: State, action: PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
      }
    );
  },
});

export default technicSlice.reducer;
