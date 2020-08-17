import React, { useEffect } from "react";
import "./AppointmentList.scss";
import { connect } from "react-redux";
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../store/types";
import { AppointmentComponent } from "./Appointment";
import { Book } from "../../../store/types/Book";
import { User } from "../../../store/types/User";
import { FBUserAuthResponse } from "../../../store/types/FBUser";
import {
  boundGetFacebookUserAppointments,
  boundGetUserAppointments,
} from "../../../store/actions/BookActions";
import { bindActionCreators } from "redux";

interface AppointmentListProps {}

interface AppointmentListState {}

type Props = AppointmentListProps & LinkDispatchToProps & LinkStateProps;

const AppointmentList: React.FC<Props> = ({
  boundGetFacebookUserAppointments,
  boundGetUserAppointments,
  appts,
  user,
  fbUser,
}: Props) => {
  console.log(appts);

  useEffect(() => {
    if (user.length > 0 && user != null) {
      boundGetUserAppointments(user[0]);
    } else if (fbUser.length > 0 && fbUser != null) {
      boundGetFacebookUserAppointments(fbUser[0]);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="appointmentlist-container">
        <h1>Upcoming appointments</h1>
        <div className="appointmentlist-table-container">
          <table className="appointmentlist-table">
            <thead className="appointmentlist-table__head">
              <tr>
                <th>Category</th>
                <th>Barber</th>
                <th>Date</th>
                <th>Time</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody className="appointmentlist-table__body">
              {appts
                .sort(
                  (a: any, b: any) =>
                    +new Date(a.cut?.appointmentDate) -
                    +new Date(b.cut?.appointmentDate)
                )
                .map(({ bookId, category, cut, client, fbClient }) => (
                  <AppointmentComponent
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
