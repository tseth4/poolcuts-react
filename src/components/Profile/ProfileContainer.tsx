import React, { useState } from "react";
import { User } from "@store/types/Auth";
import { useSelector } from "react-redux";
import { getAuth } from "@store/selectors";
import { ThunkDispatch } from "redux-thunk";
import CutList from "./Cuts/CutList";
import "./ProfileContainer.scss";
import BookingList from "./Books/BookingList";
import AppointmentList from "./Appointments/AppointmentList";
import { bindActionCreators } from "redux";
import CutEditFormModal from "./Cuts/CutFormModal";

interface ProfileContainerProps {}

interface ProfileContainerState {}

type Props = ProfileContainerProps & ProfileContainerState;

const ProfileContainer: React.FC<Props> = ({}: Props) => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { currentUser, isAuthenticated, error, loading } = useSelector(getAuth);

  let adminViews: any;
  let userNameView: string = "";
  let userType: string = "";
  // let modalClass = "cutform-modal";
  const [modalClass, setModalClass] = useState({ class: "cutform-modal" });

  const handleAddCutFormModal = (active: boolean) => {
    if (active == true) {
      setModalClass({ class: "cutform-modal active" });
    } else {
      setModalClass({ class: "cutform-modal" });
    }
  };

  if (currentUser?.roles == "ROLE_ADMIN") {
    adminViews = (
      <React.Fragment>
        <CutEditFormModal
          modalClass={modalClass}
          handleAddCutFormModal={handleAddCutFormModal}
        />
        <div className="profile-container__row">
          <div className="profile-container__item">
            <CutList
              handleAddCutFormModal={handleAddCutFormModal}
              currentUser={currentUser}
            />
          </div>
          <div className="profile-container__item">
            <BookingList currentUser={currentUser} />
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    adminViews = <React.Fragment></React.Fragment>;
  }

  return (
    <div className="profile-container">
      <div>
        <h4 style={{ color: "white" }}>Welcome {userNameView}</h4>
      </div>
      {adminViews}
      <div className="profile-container__row">
        <div className="profile-container__item">
          <AppointmentList
            currentUser={currentUser != null ? currentUser : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
