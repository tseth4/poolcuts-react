import { NewCut, UpdateCut } from "@store/types/Cut";
import React, { useState } from "react";
import "./AppointmentDate.scss";

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

const AppointmentDate: React.FC<Props> = ({ handleDateChange }: Props) => {
  let buttonDisabled = true;
  let buttonClass = "";

  const [val, setVal] = useState({
    time: "",
    date: "",
  });

  const handleChange = (input: string, value: string) => {
    setVal({ ...val, [input]: value });
  };

  // if the val is in correct format -> handleDateChange
  React.useEffect(() => {
    if (val.time.length > 0 && val.date.length > 0) {
      let dateISOString = new Date(val.date + "T" + val.time).toISOString();
      handleDateChange("appointmentDate", dateISOString);
    }
  }, [val]);

  if (val.date.length > 1) {
    if (val.time.length > 1) {
      buttonDisabled = false;
      buttonClass = "appointmentDate-container__button";
    } else {
      buttonDisabled = true;
      buttonClass = "appointmentDate-container__button aDdisabled";
    }
  } else {
    buttonDisabled = true;
    buttonClass = "appointmentDate-container__button aDdisabled";
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
      {/* <button
        className={buttonClass}
        disabled={buttonDisabled}
        onClick={handleClick()}
      >
        +
      </button> */}
    </div>
  );
};

export default AppointmentDate;
