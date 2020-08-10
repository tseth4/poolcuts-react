import React, { useEffect, useState } from "react";
import { Book, NewBooking } from "../../store/types/Book";
import { Cut } from "../../store/types/Cut";
import { format } from "path";
import { AppState } from "../../store";
import { User } from "../../store/types/User";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { connect } from "react-redux";
import "./ReviewSubmit.scss";
import { FBUser } from "../../store/types/FBUser";
import { bindActionCreators } from "redux";
import { boundUnsetSuccessMessage, boundCancelBooking, boundUnsetCancelSuccessMessage } from "../../store/actions/BookActions";

interface RsProps {
  cuts?: Cut[];
  handleSetForm: (key: string, value: string) => void;
  handleStep: () => void;
  form: NewBooking;
  selectedCut: Cut;
  currentUser: User | FBUser;
}

interface RsState {}

type Props = RsProps & LinkDispatchToProps & LinkStateProps & RsState;

const ReviewSubmit: React.FC<Props> = ({
  form,
  selectedCut,
  currentUser,
  bookSuccess,
  boundUnsetSuccessMessage,
  boundCancelBooking,
  cancelBookResp
}: Props) => {

  let buttonDisable: boolean = true;
  let buttonClass: string;
  let successMessage: string = "";
  let cancelSuccessMessage: string = "";
  let cancelButton: any;
  let price: number = 0.0;

  function isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  if (form.category == "haircut") {
    price = 27.0;
  } else if (form.category == "kidscut") {
    price = 21.0;
  } else if (form.category == "edgeup") {
    price = 16.0;
  }

  let dateObj = new Date();

  if (selectedCut.appointmentDate != null) {
    dateObj = new Date(selectedCut.appointmentDate);
  }

  let date = dateObj.toDateString();

  if (
    (form.category == undefined )||
    (form.clientId == undefined && form.fbClientId == undefined) ||
    (form.cutId == undefined)
  ) {
    buttonDisable = true;
    buttonClass = "rs-container__button disabled";
  } else {
    buttonDisable = false;
    buttonClass = "rs-container__button";
  }

  const testing = () => {
    let bookId = bookSuccess.bookId;
    if (bookId){
      boundCancelBooking(bookId, currentUser);
    }
    console.log("testing click");
  }

  if (!isEmpty(bookSuccess)){
    successMessage = "successfully booked new booking with id: " + bookSuccess.bookId;
    cancelButton = (
      <React.Fragment>
        <div onClick={testing}>Cancel Book</div>
      </React.Fragment>
    )
  }

  if (cancelBookResp.length > 0){
    successMessage = "";
    cancelSuccessMessage = "Cancel successfull for book id " + cancelBookResp[0];
    cancelButton = (<React.Fragment></React.Fragment>);
  }

  useEffect(() => {
    boundUnsetSuccessMessage();
    boundUnsetCancelSuccessMessage();
    return function cleanup() {
      console.log("clean up")
      boundUnsetSuccessMessage();
      boundUnsetCancelSuccessMessage();
    }
  }, []);

  console.log(bookSuccess);

  return (
    <div className="rs-container">
      <div className="rs-container__item">
        <span className="rs-container__property"> Client: </span>
        {currentUser.firstName + " " + currentUser.lastName}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Type: </span>
        {form.category}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Location: </span>
        {selectedCut.location}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Date: </span>
        {date}
      </div>
      {/* <div>Barber: {selectedCut.barberId}</div> */}
      <div className="rs-container__item">
        <span className="rs-container__property">Price: </span>
        {price}
      </div>
      <div className="rs-container__button-container">
        <button disabled={buttonDisable} type="submit" className={buttonClass}>
          Book
        </button>
        {successMessage}
        {cancelButton}
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  bookSuccess: Book;
  cancelBookResp: number[];
}

interface LinkDispatchToProps {
  // boundGetAllCuts: (user: User) => void;
  boundUnsetSuccessMessage: () => void;
  boundCancelBooking: (id: number, user: any) => void;
  boundUnsetCancelSuccessMessage: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: RsProps
): LinkStateProps => ({
  // cuts: state.cut,
  user: state.user,
  fbUser: state.fbUser,
  bookSuccess: state.bookSuccess,
  cancelBookResp: state.cancelBookResp
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: RsProps
): LinkDispatchToProps => ({
  // boundGetAllCuts: bindActionCreators(boundGetAllCuts, dispatch),
  boundUnsetSuccessMessage: bindActionCreators(boundUnsetSuccessMessage, dispatch),
  boundCancelBooking: bindActionCreators(boundCancelBooking, dispatch),
  boundUnsetCancelSuccessMessage: bindActionCreators(boundUnsetCancelSuccessMessage, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);
