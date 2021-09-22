import React from "react";
import { Cut } from "@store/types/Cut";
import "./Cut.scss";
import { NewBooking } from "@store/types/Book";
import { Barber, fbBarber } from "@store/types/Auth";
interface CutProps {
  cutId?: number;
  appointmentDate?: string;
  barberId?: Barber;
  location?: string;
  seatLeft?: number;
  bookForm: NewBooking;
  handleSetBookForm: (key: string, value: any) => void;
  handleSelectedCut: (cut: Cut) => void;
}

type Props = CutProps;
export const CutComponent: React.FC<Props> = ({
  cutId,
  appointmentDate,
  barberId,
  location,
  bookForm,
  handleSetBookForm,
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
    handleSetBookForm("cutId", cutId);
    handleSelectedCut({
      cutId: cutId,
      barberId: barberId,
      appointmentDate: appointmentDate,
      location: location,
    });
    // handleStep();
  };

  if (bookForm.cutId == cutId) {
    console.log("class changed");
    cutClass = "cutselect-datarow selected";
  } else {
    cutClass = "cutselect-datarow ";
  }

  if (typeof barberId != "number" && barberId != null) {
    barberDetails = barberId.firstName + " " + barberId.lastName;
  } 

  return (
    <React.Fragment>
      <div onClick={handleClick} className={cutClass}>
        <div className="cutselect-datarow__td">{date}</div>
        <div className="cutselect-datarow__td">{formatAMPM(dateObj)}</div>
        <div className="cutselect-datarow__td">{barberDetails}</div>
        <div className="cutselect-datarow__td">{location}</div>
      </div>
    </React.Fragment>
  );
};
