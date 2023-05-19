import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  id: number | null;
  username: string | null;
  roles: string[] | null;
}
const initialState: AuthState = {
  token: null,
  id: null,
  username: null,
  roles: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
    },
    clearAuth(state) {
      state.token = null;
      state.id = null;
      state.username = null;
      state.roles = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
