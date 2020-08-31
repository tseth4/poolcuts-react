import React, { useEffect, useState } from "react";
import "./AppointmentList.scss";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../store/types";
import { Appointment } from "./Appointment";
import { Book } from "../../../store/types/Book";
import { User } from "../../../store/types/User";
import { FBUserAuthResponse } from "../../../store/types/FBUser";
import {
  boundGetFacebookUserAppointments,
  boundGetUserAppointments,
  boundCancelBooksByIdArr,
} from "../../../store/actions/BookActions";
import { bindActionCreators } from "redux";
import { SelectedIds } from "../../../store/types/SelectedIds";

interface AppointmentListProps {}

interface AppointmentListState {}

type Props = AppointmentListProps & LinkDispatchToProps & LinkStateProps;

const AppointmentList: React.FC<Props> = ({
  boundGetFacebookUserAppointments,
  boundGetUserAppointments,
  appts,
  user,
  fbUser,
  boundCancelBooksByIdArr,
}: Props) => {
  let deleteDisabled: boolean = true;
  let currentUser: any = undefined;

  // Setting currentUser
  if (user !== undefined && user.length > 0) {
    currentUser = user[0];
  } else if (fbUser !== undefined && fbUser.length > 0) {
    currentUser = fbUser[0];
  }

  useEffect(() => {
    if (user.length > 0 && user != null) {
      boundGetUserAppointments(user[0]);
    } else if (fbUser.length > 0 && fbUser != null) {
      boundGetFacebookUserAppointments(fbUser[0]);
    }
  }, []);

  // state for selectedBooks
  const [selectedAppointments, setSelectedAppointments] = useState<SelectedIds>(
    { ids: [] }
  );

  const handleSetSelectedAppointments = (id: number): void => {
    if (selectedAppointments.ids.indexOf(id) == -1) {
      setSelectedAppointments({ ids: [...selectedAppointments.ids, id] });
    } else {
      setSelectedAppointments({
        ids: [...selectedAppointments.ids.filter((i) => i != id)],
      });
    }
  };

  // Props
  const appointmentListProps = {
    handleSetSelectedAppointments: handleSetSelectedAppointments,
    selectedAppointmentsArr: selectedAppointments.ids,
  };

  // Handle button enablement
  if (selectedAppointments.ids.length > 0) {
    deleteDisabled = false;
  } else {
    deleteDisabled = true;
  }

  // handle delete button / click of button
  const handleClick = () => {
    console.log("canceling");
    boundCancelBooksByIdArr(selectedAppointments, currentUser);
  };
  return (
    <React.Fragment>
      <div className="appointmentlist-container">
        <h1>Upcoming appointments</h1>
        <div className="appointmentlist-table">
          <div className="appointmentlist-table__row">
            <div className="appointmentlist-table__head">Type</div>
            <div className="appointmentlist-table__head">Barber</div>
            <div className="appointmentlist-table__head">Date</div>
            <div className="appointmentlist-table__head">Time</div>
            {/* <div className="appointmentlist-table__head">Client</div> */}
            <div className="appointmentlist-table__head">Location</div>
          </div>
          {appts
            .sort(
              (a: any, b: any) =>
                +new Date(a.cut?.appointmentDate) -
                +new Date(b.cut?.appointmentDate)
            )
            .map(({ bookId, category, cut, fbClient, client }) => (
              <Appointment
                {...appointmentListProps}
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
  appts: Book[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundGetFacebookUserAppointments: (user: FBUserAuthResponse) => void;
  boundGetUserAppointments: (user: User) => void;
  boundCancelBooksByIdArr: (ids: SelectedIds, user: any) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AppointmentListProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
  appts: state.appt,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AppointmentListProps
): LinkDispatchToProps => ({
  boundGetFacebookUserAppointments: bindActionCreators(
    boundGetFacebookUserAppointments,
    dispatch
  ),
  boundGetUserAppointments: bindActionCreators(
    boundGetUserAppointments,
    dispatch
  ),
  boundCancelBooksByIdArr: bindActionCreators(
    boundCancelBooksByIdArr,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
