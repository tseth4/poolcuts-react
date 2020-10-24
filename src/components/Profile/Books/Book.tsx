import React from "react";
import { Cut } from "../../../store/types/Cut";
import { FBUserAuthResponse } from "../../../store/types/FBUser";
import { User, Client, fbClient } from "../../../store/types/User";
import "./Book.scss";

interface BookProps {
  bookId?: number;
  category?: string;
  cut?: Cut;
  client?: Client;
  fbClient?: fbClient;
  handleSetSelectedBooks: (id: number) => void;
  selectedBooksArr: number[];
}

type Props = BookProps;

export const BookComponent: React.FC<Props> = ({
  cut,
  category,
  bookId,
  client,
  fbClient,
  selectedBooksArr,
  handleSetSelectedBooks,
}: Props) => {
  let barberDetails: string = "";
  let appointmentDateDetails: Date;
  let dateObj = null;
  let date = null;
  let clientDetails: string = "";
  let location: string = "";
  let bookClass = "bookinglist-container";

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
    } else if (cut.fbBarberId != null) {
      barberDetails = cut.fbBarberId.firstName + " " + cut.fbBarberId.lastName;
    }
    if (cut.appointmentDate != null) {
      dateObj = new Date(cut.appointmentDate);
      date = dateObj.toDateString();
    }
    if (client != null) {
      clientDetails = client.firstName + " " + client.lastName;
    } else if (fbClient != null) {
      clientDetails = fbClient.firstName + " " + fbClient.lastName;
    }
    if (cut.location != null) {
      location = cut.location;
    }
  }

  const handleClick = () => {
    let tempId: number = 0;
    if (bookId != null) {
      tempId = bookId;
      handleSetSelectedBooks(tempId);
    }
  };

  if (bookId != null && selectedBooksArr.indexOf(bookId) != -1) {
    bookClass = "bookinglist-datarow selected";
  } else {
    bookClass = "bookinglist-datarow ";
  }

  return (
    <React.Fragment>
      <div onClick={handleClick} className={bookClass}>
        <div className="bookinglist-datarow__td">{category}</div>
        {/* <div className="bookinglist-datarow__td">{barberDetails}</div> */}
        <div className="bookinglist-datarow__td">{date}</div>
        <div className="bookinglist-datarow__td">{formatAMPM(dateObj != null ? dateObj : new Date(""))}</div>
        <div className="bookinglist-datarow__td">{clientDetails}</div>
        <div className="bookinglist-datarow__td">{location}</div>
      </div>
    </React.Fragment>
  );
};
