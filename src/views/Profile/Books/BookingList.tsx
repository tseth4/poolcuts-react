import React, { useEffect, useState } from "react";
import "./BookingList.scss";
import { User } from "@store/types/Auth";
import { BookComponent } from "./Book";
import { SelectedIds } from "@store/types/SelectedIds";

// selectors for getting the state
import { useSelector } from "react-redux";
import { getBooks } from "@store/selectors/index";

// dispatches
import { setBooks, bookError } from "@store/slices/bookSlice";

// services for fetching data
import {
  getBarberBookingsService,
  cancelBooksByIdsArr,
} from "@store/mockServices/BookService/Book.service";
import { useAppDispatch } from "@store/index";
import { Book } from "@store/types/Book";
import { IError } from "@store/types/Error";

interface BookingListProps {
  currentUser: User;
}

interface BookingListState {}

type Props = BookingListProps & BookingListProps;

const BookingList: React.FC<Props> = ({ currentUser }: Props) => {
  let deleteDisabled: boolean = true;

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { books } = useSelector(getBooks);
  // let booksForSort = [...books];

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch();
  const _setBookingList = (payload: Book[]) => dispatch(setBooks(payload));
  const _bookError = (payload: IError) => dispatch(bookError(payload));

  useEffect(() => {
    getBarberBookingsService(currentUser)
      .then((res) => {
        _setBookingList(res);
      })
      .catch((err) => {
        _bookError(err);
      });
  }, []);

  // state for selectedBooks
  const [selectedBooks, setSelectedBooks] = useState<SelectedIds>({ ids: [] });

  const handleSetSelectedBooks = (id: number): void => {
    if (selectedBooks.ids.indexOf(id) == -1) {
      setSelectedBooks({ ids: [...selectedBooks.ids, id] });
    } else {
      setSelectedBooks({ ids: [...selectedBooks.ids.filter((i) => i != id)] });
    }
  };

  // Props
  const bookingListProps = {
    handleSetSelectedBooks: handleSetSelectedBooks,
    selectedBooksArr: selectedBooks.ids,
  };

  // Handle button enablement
  if (selectedBooks.ids.length > 0) {
    deleteDisabled = false;
  } else {
    deleteDisabled = true;
  }

  // handle delete button / click of button
  const handleClick = () => {
    console.log(selectedBooks)
    cancelBooksByIdsArr(selectedBooks)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="bookinglist-container">
        <h1>Your upcoming bookings</h1>
        <div className="bookinglist-table">
          <div className="bookinglist-table__row">
            <div className="bookinglist-table__head">Type</div>
            <div className="bookinglist-table__head">Date</div>
            <div className="bookinglist-table__head">Time</div>
            <div className="bookinglist-table__head">Client</div>
            <div className="bookinglist-table__head">Location</div>
          </div>
          {books.map(({ bookId, category, cut, fbClient, client }) => (
            <BookComponent
              {...bookingListProps}
              key={bookId}
              bookId={bookId}
              category={category}
              cut={cut}
              client={client}
            />
          ))}
        </div>
      </div>
      <div className="profile-container__item">
        <div className="bookinglist-table-container__buttoncontainer">
          <button
            disabled={deleteDisabled}
            onClick={handleClick}
            type="submit"
            className="bookinglist-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};


export default BookingList;
