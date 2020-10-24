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
import "./ReviewSubmit.scss";

interface ReviewSubmitProps {
  form: NewCut;
  currentUser: User | FBUser;
}

interface ReviewSubmitState {}

type Props = ReviewSubmitProps &
  ReviewSubmitState &
  LinkDispatchToProps &
  LinkStateProps;

const ReviewSubmit: React.FC<Props> = ({ form, currentUser }: Props) => {
  // handle date and time
  let dateObj = new Date();

  if (form.appointmentDate != null) {
    dateObj = new Date(form.appointmentDate);
  }

  let date = dateObj.toDateString();

  // helpter function to format time
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
  // handle button disabled if form is unfilled

  return (
    <div className="rsc-container">
      <div className="rsc-container__item">
        <span className="rsc-container__property"> Barber: </span>
        {currentUser.firstName + " " + currentUser.lastName}
      </div>
      <div className="rsc-container__item">
        <span className="rsc-container__property">Appointment Date: </span>
        {date}
      </div>
      <div className="rsc-container__item">
        <span className="rsc-container__property">Appointment Time: </span>
        {formatAMPM(dateObj)}
      </div>
      <div className="rsc-container__item">
        <span className="rsc-container__property">Location: </span>
        {form.location}
      </div>
      <div className="rsc-container__button-container"></div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  addCutSuccess: Cut[];
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
