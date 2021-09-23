import { User } from "@store/types/Auth";
import { NewCut } from "@store/types/Cut";
import React from "react";
import "./ReviewSubmit.scss";


interface ReviewSubmitProps {
  form: NewCut;
  currentUser?: User;
}

interface ReviewSubmitState {}

type Props = ReviewSubmitProps &
  ReviewSubmitState;

const ReviewSubmit: React.FC<Props> = ({ currentUser, form }: Props) => {
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
        {currentUser != null ? currentUser.firstName + " " + currentUser.lastName: "n/a"}
      </div>
      <div className="rsc-container__item">
        <span className="rsc-container__property">Date: </span>
        {date}
      </div>
      <div className="rsc-container__item">
        <span className="rsc-container__property">Time: </span>
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


export default ReviewSubmit;
