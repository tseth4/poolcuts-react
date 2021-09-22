import request from "../request";
import { Book, NewBooking } from "../types/Book";
import { User } from "../types/Auth";
import { FBUser, FBUserAuthResponse } from "../types/FBUser";
import { SelectedIds } from "../types/SelectedIds";
// import { useSelector } from "react-redux";
// import { getAuth } from "../../store/selectors/index";

export const bookApptService = (data: Book) => {};

export const bookAppointmentService = (data: NewBooking, user: User) => {

  // const { currentUser } = useSelector(getAuth);

  const bookJSON = localStorage.getItem("books");
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts = cutJSON ? JSON.parse(cutJSON) : [];
  let bookedCutsMap: any = {};
  let openCutToBook;

  for (const book of allBooks) {
    bookedCutsMap[book.cut.cutId] = 1;
  }
  // CHECK IF CUT IS BOOKED
  if (data.cutId) {
    if (bookedCutsMap[data.cutId]) {
      throw {
        errorCode: 400,
        timestamp: "2021-09-22T01:17:40.605+0000",
        jwtMessage: null,
        message: null,
      };
    }
  }
  // RETRIEVE CUT TO BOOK
  for (const cut of allCuts) {
    if (cut.cutId === data.cutId) {
      openCutToBook = cut;
    }
  }

  allBooks.push({
    bookId: Math.floor(Math.random() * 100),
    category: data.category,
    cut: openCutToBook,
    client: user,
  });
};

export const getBarberBookingsService = (barber: User) => {
  const bookJSON = localStorage.getItem("books");
  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let barberBooks = []
  for (const book of allBooks){
    if (barber.id === book.cut.barberId.id){
      barberBooks.push(book)
    }
  }
  return barberBooks
};

export const getClientAppointmentsService = (user: User) => {
  const bookJSON = localStorage.getItem("books");
  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let clientBooks = []
  for (const book of allBooks){
    if (user.id === book.client.id){
      clientBooks.push(book)
    }
  }
  return clientBooks
};

export const cancelAppointmentService = (id: number) => {};

export const cancelBooksByIdsArr = (data: SelectedIds) => {
  const bookJSON = localStorage.getItem("books");
  let allBooks;
  let returnJSON;
  let returnBooks;
  if (bookJSON) {
    allBooks = JSON.parse(bookJSON);
    for (const b of allBooks) {
      if (data.ids.includes(b.cutId)) {
        allBooks.splice(allBooks.indexOf(b.bookId), 1);
      }
    }
    localStorage.setItem("cuts", JSON.stringify(allBooks));
  }

  returnJSON = localStorage.getItem("books");

  if (returnJSON) {
    returnBooks = JSON.parse(returnJSON);
    return returnBooks;
  }

  throw {
    errorCode: 400,
    timestamp: "2021-09-21T23:54:23.825+0000",
    jwtMessage: null,
    message: null,
  };

};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
