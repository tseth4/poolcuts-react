import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CutState } from "../types/Cut";
import { IError } from "../types/Error";

export const initialState: CutState = {
  cuts: [],
  error: {},
  loading: true
};

export const cutSlice = createSlice({
  name: "cutSlice",
  initialState,
  reducers: {
    setOpenCuts: (state, { payload }: PayloadAction<any>) => {
      state.cuts = payload;
      state.loading = false;
      state.error = {}
    },
    cutError: (state, {payload}: PayloadAction<IError>) => {
      state.error = payload
    }
  },
});

export const { setOpenCuts, cutError } = cutSlice.actions;

export default cutSlice.reducer;
