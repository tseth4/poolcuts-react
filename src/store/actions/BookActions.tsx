import { Book, NewBooking } from "../types/Book";
import { Dispatch } from "react";
import { AppActions } from "../types";
import { AppState } from "..";
import {
  bookAppointmentService,
  getBarberBookingsService,
  getFacebookBarberBookingsService,
  getFBClientAppointmentsService,
  getClientAppointmentsService,
  cancelAppointmentService,
  cancelBooksByIdsArr,
} from "../services/BookService";
import { User } from "../types/User";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
// import { recieveError, deleteError } from "./AuthErrorActions";
import { deleteUser } from "./UserActions";
import { deleteFBUser } from "./FBUserActions";
import { IError } from "../types/Error";
import { SelectedIds } from "../types/SelectedIds";

export const recieveBooks = (books: Book[]): AppActions => {
  return {
    type: "SET_BOOKS",
    books,
  };
};

export const recieveAppointments = (appts: Book[]): AppActions => {
  return {
    type: "SET_APPTS",
    appts,
  };
};

export const cancelAppointment = (id: number): AppActions => {
  return {
    type: "CANCEL_BOOK_RESP",
    id,
  };
};

export const deleteCancelBookResp = (): AppActions => {
  return {
    type: "DELETE_CANCEL_BOOK_RESP",
  };
};

// Error and success responses

export const recieveSuccessfullBooking = (book: Book): AppActions => {
  return {
    type: "SET_BOOK_SUCCESS",
    book,
  };
};

export const deleteSuccessfullBooking = (): AppActions => {
  return {
    type: "DELETE_BOOK_SUCCESS",
  };
};

export const recieveBookError = (error: IError): AppActions => {
  console.log(error);
  return {
    type: "SET_BOOK_ERROR",
    bookError: error,
  };
};

export const deleteBookError = (): AppActions => {
  return {
    type: "DELETE_BOOK_ERROR",
  };
};

export const boundBookAppointment = (book: NewBooking, user: User | FBUser) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  bookAppointmentService(book, user)
    .then((res) => {
      dispatch(recieveSuccessfullBooking(res));
    })
    .catch((e) => {
      recieveBookError(e);
    });
};

export const boundUnsetSuccessMessage = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bound un setting");
  dispatch(deleteSuccessfullBooking());
};

export const boundUnsetCancelSuccessMessage = () => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  dispatch(deleteCancelBookResp());
};

export const boundGetBarberBookings = (barber: User) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  getBarberBookingsService(barber)
    .then((res) => {
      dispatch(recieveBooks(res));
      dispatch(deleteBookError());
    })
    .catch((e) => {
      dispatch(recieveBookError(e));
      dispatch(deleteUser());
      dispatch(deleteFBUser());
    });
};

export const boundGetFacebookBarberBookings = (barber: FBUserAuthResponse) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  getFacebookBarberBookingsService(barber)
    .then((res) => {
      dispatch(recieveBooks(res));
      dispatch(deleteBookError());
    })
    .catch((e) => {
      dispatch(recieveBookError(e));
      dispatch(deleteUser());
      dispatch(deleteFBUser());
    });
};

export const boundGetFacebookUserAppointments = (user: FBUserAuthResponse) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  getFBClientAppointmentsService(user)
    .then((res) => {
      dispatch(recieveAppointments(res));
      dispatch(deleteBookError());
    })
    .catch((e) => {
      dispatch(recieveBookError(e));
      dispatch(deleteUser());
      dispatch(deleteFBUser());
    });
};

export const boundGetUserAppointments = (user: User) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  getClientAppointmentsService(user)
    .then((res) => {
      dispatch(recieveAppointments(res));
      dispatch(deleteBookError());
    })
    .catch((e) => {
      dispatch(recieveBookError(e));
      dispatch(deleteUser());
      dispatch(deleteFBUser());
    });
};

export const boundCancelBooking = (id: number, user: any) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  console.log("bound canceling");
  cancelAppointmentService(id, user)
    .then((res) => {
      dispatch(cancelAppointment(res));
    })
    .catch((e) => {
      dispatch(deleteCancelBookResp());
      dispatch(recieveBookError(e));
    });
};

export const boundCancelBooksByIdArr = (ids: SelectedIds, user: any) => (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  cancelBooksByIdsArr(ids, user)
    .then((res) => console.log(res))
    .catch((e) => dispatch(recieveBookError(e)));
};
