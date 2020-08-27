import React, { useState } from "react";
import { User } from "../../store/types/User";
import { FBUser, FBUserAuthResponse } from "../../store/types/FBUser";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { ThunkDispatch } from "redux-thunk";
import CutList from "./Cuts/CutList";
import "./ProfileContainer.scss";
import BookContainer from "./Books/BookingList";
import AppointmentList from "./Appointments/AppointmentList";
import { boundCancelBooking } from "../../store/actions/BookActions";
import { bindActionCreators } from "redux";
import { SelectedIds } from "../../store/types/SelectedIds";
import CutEditFormModal from "./Cuts/CutFormModal";

interface ProfileContainerProps {
  user?: User[];
  fbUser?: FBUserAuthResponse[];
}

interface ProfileContainerState {}

type Props = ProfileContainerProps &
  ProfileContainerState &
  LinkDispatchToProps &
  LinkStateProps;

const ProfileContainer: React.FC<Props> = ({ user, fbUser }: Props) => {
  let adminViews: any;
  let userNameView: string = "";
  let userType: string = "";
  // let modalClass = "cutform-modal";
  const [modalClass, setModalClass] = useState({class: "cutform-modal", type: ""});

  //If user role == admin == admin
  // show open cuts and upcoming bookings

  // if user roles == user
  // show appointments

  const handleEditCutFormModal = (type: string) => {
    setModalClass({class: "cutform-modal active", type: type});
  }

  if (fbUser.length > 0) {
    userType = fbUser[0].roles;
    userNameView = fbUser[0].firstName;
  } else if (user.length > 0) {
    userType = user[0].roles;
    userNameView = user[0].firstName;
  }

  if (userType == "ROLE_ADMIN") {
    adminViews = (
      <React.Fragment>
        <CutEditFormModal modalClass={modalClass} setModalClass={setModalClass}/>
        <div className="profile-container__row">
          <div className="profile-container__item">
            <CutList handleEditCutFormModal={handleEditCutFormModal}/>
          </div>
          <div className="profile-container__item">
            <BookContainer />
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    adminViews = <React.Fragment></React.Fragment>;
  }

  return (
    <div className="profile-container">
      <h1 style={{ color: "white" }}>Welcome {userNameView}</h1>
      {adminViews}
      <div className="profile-container__row">
        <div className="profile-container__item">
          <AppointmentList />
        </div>
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundCancelBooking: (id: number, user: any) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: ProfileContainerProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: ProfileContainerProps
): LinkDispatchToProps => ({
  boundCancelBooking: bindActionCreators(boundCancelBooking, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
