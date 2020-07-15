import { Book } from "../types/Book";
import { Dispatch } from "react";
import { AppActions } from "../types";
import { AppState } from "..";
import { bookAppointmentService } from "../services/BookService";
import { User } from "../types/User";
import { FBUser } from "../types/FBUser";



export const boundBookAppointment = (book: Book, user: User | FBUser) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  bookAppointmentService(book, user);
}