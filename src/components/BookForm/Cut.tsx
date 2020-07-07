import React, { useEffect } from 'react';
import { Cut } from '../../store/types/Cut';
import './Cut.scss';
import { Book } from '../../store/types/Book';
interface CutProps{
  cutId: number
  appointmentDate: string,
  barberId: number,
  location: string,
  seatLeft: number,
  handleSetForm: (key: string, value: any) => void,
  handleStep: () => void,
  form: Book
}

type Props = CutProps;
export const CutComponent: React.FC<Props> = ({
  cutId,
  appointmentDate,
  barberId,
  location,
  seatLeft,
  handleSetForm,
  handleStep,
  form

}: Props) => {

  let dateObj = new Date(appointmentDate);
  let date = dateObj.toDateString();
  let cutClass = "cut-container";



 function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes: any = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

const handleClick = () => {
  handleSetForm("cut", cutId);
  // handleStep();
}

if (form.cut == cutId){
  cutClass = "cut-container selected";
} else {
  cutClass = "cut-container";
}

  return (
    <div 
    onClick={() => handleClick()} 
    className={cutClass}>
      {/* <div>cutid: {cutId}</div> */}
      <div>{date}</div>
      <p>{formatAMPM(dateObj)}</p>
      <p>{location}</p>
    </div>
  );
}

