import React from "react";
import { Book } from "../../store/types/Book";
import { Cut } from "../../store/types/Cut";
import { format } from "path";
import { AppState } from "../../store";
import { User } from "../../store/types/User";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { connect } from "react-redux";
import "./ReviewSubmit.scss";
import { FBUser } from "../../store/types/FBUser";

interface RsProps {
  cuts?: Cut[];
  handleSetForm: (key: string, value: string) => void;
  handleStep: () => void;
  form: Book;
  selectedCut: Cut;
  currentUser: User | FBUser;
}

interface RsState {}

type Props = RsProps & LinkDispatchToProps & LinkStateProps & RsState;

const ReviewSubmit: React.FC<Props> = ({ form, selectedCut, currentUser }: Props) => {
  let buttonDisable: boolean = true;
  let buttonClass: string;
  let price: number = 0.0;
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

  if (form.category == null || 
    // form.clientId == null || 
    form.cutId == null){
    console.log(form)
    buttonDisable = true;
    buttonClass = "rs-container__button disabled"; 
  } else {
    buttonDisable = false;
    buttonClass = "rs-container__button"; 
  }

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
        <button disabled={buttonDisable} type="submit" className={buttonClass}>Book</button>
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
}

interface LinkDispatchToProps {
  // boundGetAllCuts: (user: User) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: RsProps
): LinkStateProps => ({
  // cuts: state.cut,
  user: state.user,
  fbUser: state.fbUser
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: RsProps
): LinkDispatchToProps => ({
  // boundGetAllCuts: bindActionCreators(boundGetAllCuts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);
