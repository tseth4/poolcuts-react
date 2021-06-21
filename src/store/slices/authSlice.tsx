import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { truncateSync } from "fs";
import { AuthState } from "../types/Auth";
import { IError } from "../types/Error";

export const initialState: AuthState = {
  currentUser: undefined,
  isAuthenticated: false,
  loading: true,
  error: {},
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginError: (state, { payload }: PayloadAction<IError>) => {
      state.error = payload;
      state.isAuthenticated = false;
      state.loading = false;
    },

    logout: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = undefined;
      state.error = {};
      state.loading = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
