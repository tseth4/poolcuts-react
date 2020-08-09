import { Book } from "../types/Book";
import { Dispatch } from "react";
import { AppActions } from "../types";
import { AppState } from "..";
import { bookAppointmentService, getBarberBookingsService, getFacebookBarberBookingsService, getFBClientAppointmentsService, getClientAppointmentsService } from "../services/BookService";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { recieveError } from "./ErrorAction";

export const recieveBooks = (books: Book[]): AppActions => {
  return {
    type: "SET_BOOKS",
    books
  }
}

export const recieveAppointments = (appts: Book[]): AppActions => {
  return {
    type: "SET_APPTS",
    appts
  }
}

export const boundBookAppointment = (book: Book, user: User | FBUser) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  bookAppointmentService(book, user);
}

export const boundGetBarberBookings = (barber: User) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getBarberBookingsService(barber).then((res) => {
    dispatch(recieveBooks(res));
  }).catch(e => {
    dispatch(recieveError(e));
  })
}

export const boundGetFacebookBarberBookings = (barber: FBUserAuthResponse) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getFacebookBarberBookingsService(barber).then((res) => {
    dispatch(recieveBooks(res));
  }).catch(e => {
    dispatch(recieveError(e));
  })
} 

export const boundGetFacebookUserAppointments = (user: FBUserAuthResponse) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getFBClientAppointmentsService(user).then((res) => {
    dispatch(recieveAppointments(res));
  }).catch(e => {
    dispatch(recieveError(e));
  })
}

export const boundGetUserAppointments = (user: User) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
  getClientAppointmentsService(user).then((res) => {
    dispatch(recieveAppointments(res));
  }).catch(e => {
    console.log("error in boundGetUserAppointments");
    dispatch(recieveError(e));
  })
}