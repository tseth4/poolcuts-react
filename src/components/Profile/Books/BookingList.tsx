import React, { useEffect } from 'react'
import "./BookingList.scss";
import { boundGetBarberBookings, boundGetFacebookBarberBookings } from '../../../store/actions/BookActions';
import { connect } from "react-redux";
import { Book } from '../../../store/types/Book';
import { User } from '../../../store/types/User';
import { AppState } from '../../../store';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../store/types';
import { FBUserAuthResponse } from '../../../store/types/FBUser';
import { BookComponent } from './Book';

interface BookingListProps {}

interface BookingListState {}

type Props = BookingListProps & LinkDispatchToProps & LinkStateProps & BookingListProps;

const BookingList: React.FC<Props> = ({books, user, fbUser, boundGetBarberBookings, boundGetFacebookBarberBookings }: Props) =>  {

  console.log(books);
  console.log(user);

  useEffect(() => {
    if (user.length > 0 && user != null){
      boundGetBarberBookings(user[0]);
    } else if (fbUser.length > 0 && fbUser != null) {
      boundGetFacebookBarberBookings(fbUser[0]);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="bookinglist-container">
        <h1>Your upcoming bookings</h1>
        <table className="bookinglist-table">
          <thead className="bookinglist-table__head">
            <tr>
              <th>Category</th>
              <th>Barber</th>
              <th>Date</th>
              <th>Time</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody className="bookinglist-table__body">
            {books.map(({ bookId, category, cut, fbClient, client}) => (
              <BookComponent
                key={bookId}
                bookId={bookId}
                category={category}
                cut={cut}
                client={client}
                fbClient={fbClient}
              />
            ))}
          </tbody>

        </table>
      </div>
    </React.Fragment>
  )
}

interface LinkStateProps {
  books: Book[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundGetBarberBookings: (barber: User) => void;
  boundGetFacebookBarberBookings: (barber: FBUserAuthResponse) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BookingListProps
): LinkStateProps => ({
  books: state.book,
  user: state.user,
  fbUser: state.fbUser
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BookingListProps
): LinkDispatchToProps => ({
  boundGetBarberBookings: bindActionCreators(boundGetBarberBookings, dispatch),
  boundGetFacebookBarberBookings: bindActionCreators(boundGetFacebookBarberBookings, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingList);