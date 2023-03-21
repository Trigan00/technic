import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string | null;
  id: string | null;
  isAdmin: boolean | null;
  isVerified: boolean | null;
  token: string | null;
}

interface UserAction {
  email: string | null;
  id: string | null;
  isAdmin: boolean | null;
  isVerified: boolean | null;
  token: string | null;
}

const initialState: UserState = {
  email: null,
  id: null,
  isAdmin: null,
  isVerified: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserAction>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.isAdmin = action.payload.isAdmin;
      state.isVerified = action.payload.isVerified;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.isAdmin = null;
      state.isVerified = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
