import React, { useEffect } from "react";
import { Cut } from "../../store/types/Cut";
import "./Cut.scss";
import { Book } from "../../store/types/Book";
import { Barber } from "../../store/types/User";
interface CutProps {
  cutId?: number;
  appointmentDate?: string;
  barberId?: number | Barber;
  location?: string;
  seatLeft?: number;
  handleSetForm: (key: string, value: any) => void;
  handleStep: () => void;
  form: Book;
  handleSelectedCut: (cut: Cut) => void;
}

type Props = CutProps;
export const CutComponent: React.FC<Props> = ({
  cutId,
  appointmentDate,
  barberId,
  location,
  handleSetForm,
  handleStep,
  form,
  handleSelectedCut,
}: Props) => {
  let barberDetails: string = "N/A";
  let dateObj = new Date();
  if (appointmentDate != null) {
    dateObj = new Date(appointmentDate);
  }
  let date = dateObj.toDateString();
  let cutClass = "cut-container";

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

  const handleClick = () => {
    console.log("handle click");
    handleSetForm("cut", cutId);
    handleSelectedCut({
      cutId: cutId,
      barberId: barberId,
      appointmentDate: appointmentDate,
      location: location,
    });
    // handleStep();
  };

  if (form.cut == cutId) {
    cutClass = "cut-input selected";
  } else {
    cutClass = "cut-input";
  }

  if (typeof barberId != "number" && barberId != null) {
    barberDetails = barberId.firstName + " " + barberId.lastName;
  }

  return (
    <React.Fragment>
      <tr>
        <td>Date</td>
        <td>{formatAMPM(dateObj)}</td>
        <td>{barberDetails}</td>
        <td>{location}</td>
      </tr>
    </React.Fragment>
    // <div onClick={() => handleClick()} className={cutClass}>
    //   {/* <div>cutid: {cutId}</div> */}
    //   <div>{date}</div>
    //   <p>{formatAMPM(dateObj)}</p>
    //   <p>{location}</p>
    // </div>
  );
};
