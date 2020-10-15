import React, { useEffect, useState } from "react";
import "./BookingList.scss";
import {
  boundGetBarberBookings,
  boundGetFacebookBarberBookings,
  boundCancelBookingsByIdArr,
} from "../../../store/actions/BookActions";
import { connect } from "react-redux";
import { Book } from "../../../store/types/Book";
import { User } from "../../../store/types/User";
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { AppActions } from "../../../store/types";
import { FBUserAuthResponse } from "../../../store/types/FBUser";
import { BookComponent } from "./Book";
import { SelectedIds } from "../../../store/types/SelectedIds";

interface BookingListProps {}

interface BookingListState {}

type Props = BookingListProps &
  LinkDispatchToProps &
  LinkStateProps &
  BookingListProps;

const BookingList: React.FC<Props> = ({
  books,
  user,
  fbUser,
  boundGetBarberBookings,
  boundGetFacebookBarberBookings,
  boundCancelBookingsByIdArr,
}: Props) => {
  let deleteDisabled: boolean = true;
  let currentUser: any = undefined;

  // Setting currentUser
  if (user !== undefined && user.length > 0) {
    currentUser = user[0];
  } else if (fbUser !== undefined && fbUser.length > 0) {
    currentUser = fbUser[0];
  }

  // fetch books method
  const fetchBooks  = () => {
    if (user.length > 0 && user != null) {
      boundGetBarberBookings(user[0]);
    } else if (fbUser.length > 0 && fbUser != null) {
      boundGetFacebookBarberBookings(fbUser[0]);
    }
  }

  // fetch bookings based on user type
  useEffect(() => {
    fetchBooks();
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
    boundCancelBookingsByIdArr(selectedBooks, currentUser);
  };

  return (
    <React.Fragment>
      <div className="bookinglist-container">
        <h1>Your upcoming bookings</h1>
        <div className="bookinglist-table">
          <div className="bookinglist-table__row">
            <div className="bookinglist-table__head">Type</div>
            {/* <div className="bookinglist-table__head">Barber</div> */}
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
              fbClient={fbClient}
            />
          ))}
        </div>
      </div>
      <div className="profile-container__item">
        {" "}
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

interface LinkStateProps {
  books: Book[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundGetBarberBookings: (barber: User) => void;
  boundGetFacebookBarberBookings: (barber: FBUserAuthResponse) => void;
  boundCancelBookingsByIdArr: (ids: SelectedIds, user: any) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BookingListProps
): LinkStateProps => ({
  books: state.book,
  user: state.user,
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BookingListProps
): LinkDispatchToProps => ({
  boundGetBarberBookings: bindActionCreators(boundGetBarberBookings, dispatch),
  boundGetFacebookBarberBookings: bindActionCreators(
    boundGetFacebookBarberBookings,
    dispatch
  ),
  boundCancelBookingsByIdArr: bindActionCreators(
    boundCancelBookingsByIdArr,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);
