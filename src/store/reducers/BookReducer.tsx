import { Book, BookActionTypes } from "../types/Book"
import { IError } from "../types/Error";

const bookReducerDefaultState: Book[] = [];
const bookReducer = (state = bookReducerDefaultState, action: BookActionTypes): Book[] => {
  switch (action.type) {
    case "SET_BOOKS":
      return action.books;
    default:
      return state;
  }
}

const appointmentReducerDefaultState: Book[] = [];
const appointmentReducer = (state = appointmentReducerDefaultState, action: BookActionTypes): Book[] => {
  switch (action.type) {
    case "SET_APPTS":
      return action.appts;
    default:
      return state;
  }
}

const bookSuccessReducerDefaultState: Book = {};
const bookSuccessReducer = (state = bookSuccessReducerDefaultState, action: BookActionTypes): Book | any => {
  switch (action.type) {
    case "SET_BOOK_SUCCESS":
      return action.book;
    case "DELETE_BOOK_SUCCESS":
      return {};
    default:
      return state;
  }
}

const bookErrorReducerDefaultState: IError = {};
const bookErrorReducer = (state = bookErrorReducerDefaultState, action: BookActionTypes): IError | any => {
  switch (action.type) {
    case "SET_BOOK_ERROR":
      return action.bookError;
    case "DELETE_BOOK_ERROR":
      return {};
    default:
      return state;
  }
}

const cancelBookReducerDefaultState: number[] = [];
const cancelBookReducer = (state = cancelBookReducerDefaultState, action: BookActionTypes): number[] | any => {
  switch (action.type){
    case "CANCEL_BOOK_RESP":
      return [action.id];
    case "DELETE_CANCEL_BOOK_RESP":
      return [];
    default:
      return state;
    
  }
}


export { bookReducer, appointmentReducer, bookSuccessReducer, bookErrorReducer, cancelBookReducer };