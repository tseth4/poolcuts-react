import React, { useEffect } from "react";
import { Book, NewBooking } from "../../store/types/Book";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/selectors/index";

import { Cut } from "../../store/types/Cut";
import { AppState } from "../../store";
import { User } from "../../store/types/Auth";
import { ThunkDispatch } from "redux-thunk";
// import { AppActions } from "../../store/types";
import { connect } from "react-redux";
import "./ReviewSubmit.scss";
import { FBUser } from "../../store/types/FBUser";
import { bindActionCreators } from "redux";
// import {
//   boundUnsetSuccessMessage,
//   boundCancelBooking,
//   boundUnsetCancelSuccessMessage,
// } from "../../store/actions/BookActions";

import { Redirect } from "react-router";

interface RsProps {
  cuts?: Cut[];
  handleSetBookForm: (key: string, value: any) => void;
  // handleStep: () => void;
  bookForm: NewBooking;
  selectedCut: Cut;
  // currentUser: User | FBUser;
}

interface RsState {}

type Props = RsProps & RsState;

const ReviewSubmit: React.FC<Props> = ({
  bookForm,
  selectedCut,
}: // currentUser,
// bookSuccess,
// boundUnsetSuccessMessage,
// boundCancelBooking,
// cancelBookResp,
Props) => {
  let buttonDisable: boolean = true;
  let buttonClass: string;
  let successMessage: any;
  let price: number = 0.0;

  const { currentUser } = useSelector(getAuth);

  // if button clicked true and successMessage

  function isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  if (bookForm.category == "haircut") {
    price = 27.0;
  } else if (bookForm.category == "kidscut") {
    price = 21.0;
  } else if (bookForm.category == "edgeup") {
    price = 16.0;
  }

  // handle time and date
  // time helper function
  function formatAMPM(date: Date) {
    var hours = date.getHours();
    var minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  let dateObj = new Date();

  if (selectedCut.appointmentDate != null) {
    dateObj = new Date(selectedCut.appointmentDate);
  }

  let date = dateObj.toDateString();

  // const testing = () => {
  //   let bookId = bookSuccess.bookId;
  //   if (bookId) {
  //     boundCancelBooking(bookId, currentUser);
  //   }
  //   if (!isEmpty(bookSuccess)) {
  //     return <Redirect to="/profile" />;
  //   }

  //   console.log("testing click");
  // };

  // if (!isEmpty(bookSuccess)) {
  //   successMessage = (
  //     <p className="rs-container__successmsg">
  //       successfully booked new booking with id: {bookSuccess.bookId}
  //     </p>
  //   );
  // }

  // useEffect(() => {
  //   boundUnsetSuccessMessage();
  //   // boundUnsetCancelSuccessMessage();
  //   return function cleanup() {
  //     console.log("clean up");
  //     boundUnsetSuccessMessage();
  //     // boundUnsetCancelSuccessMessage();
  //   };
  // }, []);

  // console.log(bookSuccess);

  return (
    <div className="rs-container">
      <h3>Review and book</h3>
      <div className="rs-container__item">
        <span className="rs-container__property"> Client: </span>
        {currentUser != undefined
          ? currentUser.firstName + " " + currentUser.lastName
          : ""}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Type: </span>
        {bookForm.category}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Location: </span>
        {selectedCut.location}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Date: </span>
        {date}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Time: </span>
        {formatAMPM(dateObj)}
      </div>
      {/* <div>Barber: {selectedCut.barberId}</div> */}
      <div className="rs-container__item">
        <span className="rs-container__property">Price: </span>
        {price}
      </div>
      {/* <div className="rs-container__button-container">
        <button disabled={buttonDisable} type="submit" className={buttonClass}>
          Book
        </button>
      </div> */}
      <div>{successMessage}</div>
    </div>
  );
};

export default ReviewSubmit;
