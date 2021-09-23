import { Cut } from "@store/types/Cut";
import { User } from "../types/Auth";
import { Book, NewBooking } from "../types/Book";
import { SelectedIds } from "../types/SelectedIds";

export const bookApptService = (data: Book) => {};

export const bookAppointmentService = (data: NewBooking, user: User) => {
  const bookJSON = localStorage.getItem("books");
  const cutJSON = localStorage.getItem("cuts");

  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let allCuts = cutJSON ? JSON.parse(cutJSON) : [];
  let bookedCutsMap: any = {};
  let openCutToBook: Cut;
  let book;

  for (const book of allBooks) {
    bookedCutsMap[book.cut.cutId] = 1;
  }

  return new Promise<Book>((resolve, reject) => {
    // CHECK IF CUT IS BOOKED
    if (data.cutId) {
      if (bookedCutsMap[data.cutId]) {
        reject({
          errorCode: 400,
          timestamp: "2021-09-22T01:17:40.605+0000",
          jwtMessage: null,
          message: null,
        });
      }
    }

    // RETRIEVE CUT TO BOOK
    for (const cut of allCuts) {
      if (cut.cutId === data.cutId) {
        openCutToBook = cut;
      }
    }

    book = {
      bookId: Math.floor(Math.random() * 100),
      category: data.category,
      cut: openCutToBook,
      client: user,
    };

    allBooks.push(book);
    localStorage.setItem("books", JSON.stringify(allBooks));
    resolve(book);
  });
};

export const getBarberBookingsService = (barber: User) => {
  const bookJSON = localStorage.getItem("books");
  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let barberBooks: any[] = [];
  for (const book of allBooks) {
    if (barber.id === book.cut.barberId.id) {
      barberBooks.push(book);
    }
  }

  return new Promise<Book[]>((resolve, reject) => {
    resolve(barberBooks);
  });
  // return barberBooks;
};

export const getClientAppointmentsService = (user: User) => {
  const bookJSON = localStorage.getItem("books");
  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let clientBooks: any[] = [];
  for (const book of allBooks) {
    if (user.id === book.client.id) {
      clientBooks.push(book);
    }
  }

  return new Promise<Book[]>((resolve, reject) => {
    resolve(clientBooks);
  });
  // return clientBooks;
};

export const cancelAppointmentService = (id: number) => {};

export const cancelBooksByIdsArr = (data: SelectedIds) => {
  console.log(data);
  const bookJSON = localStorage.getItem("books");
  let allBooks = bookJSON ? JSON.parse(bookJSON) : [];
  let returnBooks: Book[] = [];
  return new Promise<Book[]>((resolve, reject) => {
    for (const b of allBooks) {
      if (!data.ids.includes(b.bookId)) {
        returnBooks.push(b);
      }
    }
    localStorage.setItem("books", JSON.stringify(returnBooks));
    resolve(returnBooks);
  });
};

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
