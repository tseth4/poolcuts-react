import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookState } from "../types/Book";
import { IError } from "../types/Error";

export const initialState: BookState = {
  books: [],
  appointments: [],
  error: {},
  loading: true,
};

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setBooks: (state, { payload }: PayloadAction<any>) => {
      state.books = payload;
    },
    setAppointments: (state, { payload }: PayloadAction<any>) => {
      state.appointments = payload;
    },
    bookError: (state, { payload }: PayloadAction<IError>) => {
      state.error = payload;
    },
  },
});

export const { setBooks, setAppointments, bookError } = bookSlice.actions;

export default bookSlice.reducer;
