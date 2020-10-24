import React, { useEffect, useState, MouseEvent } from "react";
import "./AppointmentDate.scss";
import { makeStyles } from "@material-ui/core/styles";
import { NewCut, UpdateCut } from "../../store/types/Cut";

interface AppointmentDateProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
  handleSetEditForm: (input: any, value: any) => void;
  editForm: UpdateCut;
  modalClass: any;
  handleDateChange: (input: string, value: string) => void;
}

interface AppointmentDateState {}

type Props = AppointmentDateProps & AppointmentDateState;

const AppointmentDate: React.FC<Props> = ({
  handleDateChange,
  handleSetForm,
  form,
  handleSetEditForm,
  editForm,
  modalClass,
}: Props) => {
  let buttonDisabled = true;
  let buttonClass = ""

  const [val, setVal] = useState({
    time: "",
    date: "",
  });

  const handleChange = (input: string, value: string) => {
    setVal({ ...val, [input]: value });
  };

  const handleClick = () => (event: MouseEvent) => {
    event.preventDefault();
    let dateISOString = new Date(val.date + "T" + val.time).toISOString();
    handleDateChange("appointmentDate", dateISOString);
  };

  if (val.date.length > 1) {
    if (val.time.length > 1) {
      buttonDisabled = false;
      buttonClass = "appointmentDate-container__button"
    } else {
      buttonDisabled = true;
      buttonClass = "appointmentDate-container__button disabled"

    }
  } else {
    buttonDisabled = true;
    buttonClass = "appointmentDate-container__button disabled"

  }

  return (
    <div className="appointmentDate-container">
      <input
        type="date"
        name="trip-start"
        value={val.date}
        onChange={(ev) => handleChange("date", ev.target.value)}
        required
      />
      <input
        type="time"
        name="appt"
        value={val.time}
        onChange={(ev) => handleChange("time", ev.target.value)}
        required
      />
      <button disabled={buttonDisabled} onClick={handleClick()}>+</button>
    </div>
  );
};

export default AppointmentDate;
