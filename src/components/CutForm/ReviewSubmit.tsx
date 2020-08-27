import React from "react";
import { NewCut, Cut } from "../../store/types/Cut";
import { User } from "../../store/types/User";
import { FBUser, FBUserAuthResponse } from "../../store/types/FBUser";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";
import {
  boundNewOpenCut,
  boundUnsetCutSuccess,
} from "../../store/actions/CutActions";
import { connect } from "react-redux";
import { format } from "date-fns";

interface ReviewSubmitProps {
  form: NewCut;
  currentUser: User | FBUser;
  modalClass: any;
}

interface ReviewSubmitState {}

type Props = ReviewSubmitProps &
  ReviewSubmitState &
  LinkDispatchToProps &
  LinkStateProps;

const ReviewSubmit: React.FC<Props> = ({
  form,
  currentUser,
  modalClass,
}: Props) => {
  console.log(form);
  let buttonDisable = true;
  let buttonClass: string;
  let buttonLabel: string = "";

  if (modalClass.type == "add") {
    buttonLabel = "Add";
  } else if (modalClass.type == "edit") {
    buttonLabel = "Update";
  }

  // handle date and time
  let dateObj = new Date();

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

  if (form.appointmentDate != null) {
    dateObj = new Date(form.appointmentDate);
  }

  let date = dateObj.toDateString();

  if (
    form.appointmentDate == undefined ||
    form.location == undefined ||
    (form.barberId == undefined && form.fbBarberId == undefined)
  ) {
    buttonDisable = true;
    buttonClass = "rs-container__button disabled";
  } else {
    buttonDisable = false;
    buttonClass = "rs-container__button";
  }
  return (
    <div className="rs-container">
      <div className="rs-container__item">
        <span className="rs-container__property"> Barber: </span>
        {currentUser.firstName + " " + currentUser.lastName}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Appointment Date: </span>
        {date}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Appointment Time: </span>
        {formatAMPM(dateObj)}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Location: </span>
        {form.location}
      </div>
      <div className="rs-container__button-container">
        <button disabled={buttonDisable} type="submit" className={buttonClass}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  addCutSuccess: Cut;
}

interface LinkDispatchToProps {
  boundNewOpenCut: (newCut: NewCut, user: FBUserAuthResponse | User) => void;
  boundUnsetCutSuccess: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ReviewSubmitProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
  addCutSuccess: state.addCutSuccess,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: ReviewSubmitProps
): LinkDispatchToProps => ({
  boundNewOpenCut: bindActionCreators(boundNewOpenCut, dispatch),
  boundUnsetCutSuccess: bindActionCreators(boundUnsetCutSuccess, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);
