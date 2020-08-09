import { Book, BookActionTypes } from "../types/Book"

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

export { bookReducer, appointmentReducer };