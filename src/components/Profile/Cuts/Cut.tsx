import React, { useEffect } from "react";
import "./Cut.scss";
import { Barber, fbBarber } from "../../../store/types/User";
import { Book } from "../../../store/types/Book";
import { Cut } from "../../../store/types/Cut";
import { FBUserAuthResponse } from "../../../store/types/FBUser";

interface CutProps {
  cutId?: number;
  appointmentDate?: string;
  barberId?: number | Barber;
  location?: string;
  seatLeft?: number;
  fbBarberId?: number | fbBarber;
  handleSetSelectedCuts: (id: number) => void;
  selectedCutsArr: number[];
  // handleSetForm: (key: string, value: any) => void;
  // handleStep: () => void;
  // form: Book;
  // handleSelectedCut: (cut: Cut) => void;
}

interface CutState {}

type Props = CutProps & CutState;
export const CutComponent: React.FC<Props> = ({
  cutId,
  appointmentDate,
  barberId,
  location,
  fbBarberId,
  handleSetSelectedCuts,
  selectedCutsArr
  // handleSetForm,
  // handleStep,
  // form,
  // handleSelectedCut,
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
    let tempId: number = 0;
    if (cutId != null){
      tempId = cutId;
      handleSetSelectedCuts(tempId);
    }
    // handleSetForm("cutId", cutId);
    // handleSelectedCut({
    //   cutId: cutId,
    //   barberId: barberId,
    //   appointmentDate: appointmentDate,
    //   location: location,
    // });
    // console.log("handle click", form.cutId);
    // handleStep();
  };

  if (cutId != null && selectedCutsArr.indexOf(cutId) != -1) {
    console.log("class changed");
    cutClass = "cutlist-datarow selected";
  } else {
    cutClass = "cutlist-datarow ";
  }

  if (typeof barberId != "number" && barberId != null) {
    barberDetails = barberId.firstName + " " + barberId.lastName;
  } else if (typeof fbBarberId != "number" && fbBarberId != null){
    barberDetails = fbBarberId.firstName + " " + fbBarberId.lastName;
  }

  return (
    <React.Fragment>
      <div onClick={handleClick} className={cutClass}>
        <div className="cutlist-datarow__td">{date}</div>
        <div className="cutlist-datarow__td">{formatAMPM(dateObj)}</div>
        <div className="cutlist-datarow__td">{barberDetails}</div>
        <div className="cutlist-datarow__td">{location}</div>
      </div>
    </React.Fragment>
    // <div onClick={() => handleClick()} className={cutClass}>
    //   {/* <div>cutid: {cutId}</div> */}
    //   <div>{date}</div>
    //   <p>{formatAMPM(dateObj)}</p>
    //   <p>{location}</p>
    // </div>
  );
};
