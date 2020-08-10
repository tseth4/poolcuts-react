import React from 'react';
import { Cut } from '../../../store/types/Cut';
import { FBUserAuthResponse } from '../../../store/types/FBUser';
import { User, Client, fbClient } from '../../../store/types/User';
import "./Book.scss";

interface BookProps {
  bookId?: number;
  category?: string;
  cut?: Cut;
  client?: Client;
  fbClient?: fbClient;
}

type Props = BookProps;

export const BookComponent: React.FC<Props> = ({
  cut,
  category,
  bookId,
  client,
  fbClient
}: Props) => {

  let barberDetails: string = "";
  let appointmentDateDetails: Date;
  let dateObj = new Date();
  let date = dateObj.toDateString();
  let clientDetails: string = "";


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

  if (cut){
    if (cut.barberId != null){
      barberDetails = cut.barberId.firstName + " " + cut.barberId.lastName;
    } else if (cut.fbBarberId != null){
      barberDetails = cut.fbBarberId.firstName + " " + cut.fbBarberId.lastName;
    }
    if (cut.appointmentDate != null) {
      dateObj = new Date(cut.appointmentDate);
    }
    if (client != null) {
      clientDetails = client.firstName + " " + client.lastName;
    } else if (fbClient != null){
      clientDetails = fbClient.firstName + " " + fbClient.lastName;
    }
  }

  

  return (
    <React.Fragment>
      <tr className="bookinglist-datarow">
        <td className="bookinglist-datarow__td">{category}</td>
        <td className="bookinglist-datarow__td">{barberDetails}</td>
        <td className="bookinglist-datarow__td">{date}</td>
        <td className="bookinglist-datarow__td">{formatAMPM(dateObj)}</td>
        <td className="bookinglist-datarow__td">{clientDetails}</td>
      </tr>
    </React.Fragment>
  )
}
