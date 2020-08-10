import { Cut } from './Cut';
import { User, fbClient, Client } from './User';
import { FBUserAuthResponse } from './FBUser';
import { IError } from './Error';

export interface Book {
  bookId?: number;
  category?: string;
  cut?: Cut;
  client?: Client;
  fbClient?: fbClient
}

export interface NewBooking {
  category?: string;
  cutId?: number;
  clientId?: number;
  fbClientId?: number;
}

export const ADD_BOOK = "ADD_BOOK";
export const CANCEL_BOOK_RESP = "CANCEL_BOOK_RESP";
export const DELETE_CANCEL_BOOK_RESP = "DELETE_CANCEL_BOOK_RESP";

export const UPDATE_BOOK = "UPDATE_BOOK";
export const SET_BOOKS = "SET_BOOKS";
export const SET_APPTS = "SET_APPTS";

export const SET_BOOK_SUCCESS = "SET_BOOK_SUCCESS";
export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";

export const SET_CANCEL_BOOK_SUCCESS = "SET_CANCEL_SUCCESS";
export const DELETE_CANCEL_BOOK_SUCCESS = "DELETE_CANCEL_SUCCESS";

export const SET_BOOK_ERROR = "SET_BOOK_ERROR";
export const DELETE_BOOK_ERROR = "DELETE_BOOK_ERROR";



export interface AddBookAction {
  type: typeof ADD_BOOK;
  book: Book
}

export interface CancelBookRespAction {
  type: typeof CANCEL_BOOK_RESP;
  id: number;
}

export interface DeleteCancelBookResp {
  type: typeof DELETE_CANCEL_BOOK_RESP;

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

// Book Error Actions
export interface SetBookErrorAction {
  type: typeof SET_BOOK_ERROR;
  bookError: IError
}

export interface DeleteBookErrorAction {
  type: typeof DELETE_BOOK_ERROR;
}

// Success booking response
export interface SetSuccessfullBookAction {
  type: typeof SET_BOOK_SUCCESS;
  book: Book
}

export interface DeleteSuccessfullBookAction {
  type: typeof DELETE_BOOK_SUCCESS;
}

// Success canceling response
// export interface SetSuccessfullCancelBookAction {
//   type: typeof SET_CANCEL_BOOK_SUCCESS;
//   bookId: number
// }

// export interface DeleteSuccesfullBookAction {
//   type: typeof DELETE_CANCEL_BOOK_SUCCESS;
// }

export type BookActionTypes = SetBooksAction | AddBookAction | CancelBookRespAction | UpdateBookAction | SetAppointmentsAction | SetSuccessfullBookAction | SetBookErrorAction | DeleteBookErrorAction | DeleteSuccessfullBookAction | DeleteCancelBookResp;
