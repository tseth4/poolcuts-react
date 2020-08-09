import { Cut } from './Cut';
import { User } from './User';
import { FBUserAuthResponse } from './FBUser';

export interface Book {
  bookId?: number;
  category?: string;
  cutId?: number | Cut;
  clientId?: number | User | FBUserAuthResponse;
}

export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const SET_BOOKS = "SET_BOOKS";
export const SET_APPTS = "SET_APPTS";

export interface AddBookAction {
  type: typeof ADD_BOOK;
  book: Book
}

export interface DeleteBookAction {
  type: typeof DELETE_BOOK;
  id: string;
}

export interface UpdateBookAction {
  type: typeof UPDATE_BOOK;
  book: Book;
}

export interface SetBooksAction {
  type: typeof SET_BOOKS;
  books: Book[];
}

export interface SetAppointmentsAction {
  type: typeof SET_APPTS;
  appts: Book[];
}

export type BookActionTypes = SetBooksAction | AddBookAction | DeleteBookAction | UpdateBookAction | SetAppointmentsAction;
