import React from "react";
import { Cut } from "../../../store/types/Cut";
import "./Appointment.scss";
import { Client } from "../../../store/types/Auth";

interface AppointmentProps {
  bookId?: number;
  category?: string;
  cut?: Cut;
  client?: Client;
  handleSetSelectedAppointments: (id: number) => void;
  selectedAppointmentsArr: number[];
}

interface AppointmentState {}

type Props = AppointmentProps & AppointmentState;

export const Appointment: React.FC<Props> = ({
  bookId,
  category,
  cut,
  client,
  handleSetSelectedAppointments,
  selectedAppointmentsArr,
}: Props) => {
  let barberDetails: string = "";
  let appointmentDateDetails: Date;
  let dateObj = null;
  let date = null;
  
  let clientDetails: string = "";
  let location: string = "";
  let appointmentClass = "appointmentlist-container";

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

  if (cut) {
    if (cut.barberId != null) {
      barberDetails = cut.barberId.firstName + " " + cut.barberId.lastName;
    } 
    if (cut.appointmentDate != null) {
      dateObj = new Date(cut.appointmentDate);
      date = dateObj.toDateString();

    }
    if (client != null) {
      clientDetails = client.firstName + " " + client.lastName;
    } 
    if (cut.location != null) {
      location = cut.location;
    }
  }

  const handleClick = () => {
    let tempId: number = 0;
    if (bookId != null) {
      tempId = bookId;
      handleSetSelectedAppointments(tempId);
    }
  };

  if (bookId != null && selectedAppointmentsArr.indexOf(bookId) != -1) {
    appointmentClass = "appointmentlist-datarow selected";
    console.log(appointmentClass);
  } else {
    appointmentClass = "appointmentlist-datarow";
  }

  return (
    <React.Fragment>
      <div onClick={handleClick} className={appointmentClass}>
        <div className="appointmentlist-datarow__td">{category}</div>
        <div className="appointmentlist-datarow__td">{barberDetails}</div>
        <div className="appointmentlist-datarow__td">{date}</div>
        <div className="appointmentlist-datarow__td">{formatAMPM(dateObj != null ? dateObj : new Date(""))}</div>
        {/* <div className="appointmentlist-datarow__td">{clientDetails}</div> */}
        <div className="appointmentlist-datarow__td">{location}</div>
      </div>
    </React.Fragment>
  );
};
