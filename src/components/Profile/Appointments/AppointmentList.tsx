import React, { useEffect, useState } from "react";
import "./AppointmentList.scss";

// selectors for getting the state
import { useSelector } from "react-redux";
import { getBooks } from "../../../store/selectors/index";

// dispatches
import { bookError, setAppointments } from "../../../store/slices/bookSlice";

// services for fetching data
import { getClientAppointmentsService, cancelBooksByIdsArr } from "../../../store/services/BookService";
import { useAppDispatch } from "../../../store";

// types
import { Book } from "../../../store/types/Book";
import { IError } from "../../../store/types/Error";
import { User } from "../../../store/types/Auth";
import { SelectedIds } from "../../../store/types/SelectedIds";

import { Appointment } from "./Appointment";

interface AppointmentListProps {
  currentUser?: User;
}

type Props = AppointmentListProps;

const AppointmentList: React.FC<Props> = ({
  currentUser,
}: // boundGetFacebookUserAppointments,
// boundGetUserAppointments,
// appts,
// user,
// fbUser,
// boundCancelAppointmentsByIdArr,
Props) => {
  let deleteDisabled: boolean = true;

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { appointments } = useSelector(getBooks);
  let appointmentsForSort = [...appointments];
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch();
  const _setAppointmentList = (payload: Book[]) =>
    dispatch(setAppointments(payload));
  const _bookError = (payload: IError) => dispatch(bookError(payload));

  useEffect(() => {
    if (currentUser)
      getClientAppointmentsService(currentUser)
        .then((res) => {
          console.log(res);
          _setAppointmentList(res);
        })
        .catch((err) => {
          console.log(err);
          _bookError(err);
        });
  }, []);

  // Setting currentUser
  // if (user !== undefined && user.length > 0) {
  //   currentUser = user[0];
  // } else if (fbUser !== undefined && fbUser.length > 0) {
  //   currentUser = fbUser[0];
  // }

  // useEffect(() => {
  //   if (user.length > 0 && user != null) {
  //     boundGetUserAppointments(user[0]);
  //   } else if (fbUser.length > 0 && fbUser != null) {
  //     boundGetFacebookUserAppointments(fbUser[0]);
  //   }
  // }, []);

  // state for selectedBooks
  const [selectedAppointments, setSelectedAppointments] = useState<SelectedIds>(
    { ids: [] }
  );


  console.log(selectedAppointments);

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
    cancelBooksByIdsArr(selectedAppointments).then((res) => {
      window.location.reload()
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    // boundCancelAppointmentsByIdArr(selectedAppointments, currentUser);
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
          {appointmentsForSort
            .sort(
              (a: any, b: any) =>
                +new Date(a.cut?.appointmentDate) -
                +new Date(b.cut?.appointmentDate)
            )
            .map(({ bookId, category, cut, client }) => (
              <Appointment
                {...appointmentListProps}
                key={bookId}
                bookId={bookId}
                category={category}
                cut={cut}
                client={client}
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

export default AppointmentList;
