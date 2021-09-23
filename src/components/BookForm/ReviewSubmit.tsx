import { getAuth } from "@store/selectors/index";
import { NewBooking } from "@store/types/Book";
import { Cut } from "@store/types/Cut";
import React from "react";
import { useSelector } from "react-redux";
import "./ReviewSubmit.scss";

interface RsProps {
  cuts?: Cut[];
  handleSetBookForm: (key: string, value: any) => void;
  bookForm: NewBooking;
  selectedCut: Cut;
}

interface RsState {}

type Props = RsProps & RsState;

const ReviewSubmit: React.FC<Props> = ({ bookForm, selectedCut }: Props) => {
  let buttonDisable: boolean = true;
  let buttonClass: string;
  let successMessage: any;
  let price: number = 0.0;

  const { currentUser } = useSelector(getAuth);

  function isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  if (bookForm.category == "haircut") {
    price = 27.0;
  } else if (bookForm.category == "kidscut") {
    price = 21.0;
  } else if (bookForm.category == "edgeup") {
    price = 16.0;
  }

  // handle time and date
  // time helper function
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

  let dateObj = new Date();

  if (selectedCut.appointmentDate != null) {
    dateObj = new Date(selectedCut.appointmentDate);
  }

  let date = dateObj.toDateString();

  return (
    <div className="rs-container">
      <h3>Review and book</h3>
      <div className="rs-container__item">
        <span className="rs-container__property"> Client: </span>
        {currentUser != undefined
          ? currentUser.firstName + " " + currentUser.lastName
          : ""}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Type: </span>
        {bookForm.category}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Location: </span>
        {selectedCut.location}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Date: </span>
        {date}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Time: </span>
        {formatAMPM(dateObj)}
      </div>
      <div className="rs-container__item">
        <span className="rs-container__property">Price: </span>
        {price}
      </div>
      <div>{successMessage}</div>
    </div>
  );
};

export default ReviewSubmit;
