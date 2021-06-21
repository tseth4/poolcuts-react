import { RootState } from "../types/index";

export const getBooks = (state: RootState) => state.bookState;

export const getCuts = (state: RootState) => state.cutState;

export const getAuth = (state: RootState) => state.authState;