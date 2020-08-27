import React, { useEffect } from "react";
import "./AppointmentDate.scss";
import { makeStyles } from "@material-ui/core/styles";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { NewCut } from "../../store/types/Cut";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #3cc8c8 30%, #a1a9a8 90%)",
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
});

interface AppointmentDateProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
}

interface AppointmentDateState {}

type Props = AppointmentDateProps & AppointmentDateState;

const AppointmentDate: React.FC<Props> = ({ handleSetForm, form }: Props) => {
  const classes = useStyles();
  let timeView: any;
  const [selectedDate, setSelectedDate] = React.useState({
    date_str: new Date(),
    time_str: new Date(),
  });

  const handleDateChange = (input: any) => (e: any) => {
    const time_regex = /\T(.*)/;
    const date_regex = /.+?(?=T)/;
    if (input == "date") {
      setSelectedDate({
        ...selectedDate,
        date_str: new Date(e),
        // date_str: e.toISOString().match(date_regex)[0],
      });
    }
    if (input == "time") {
      setSelectedDate({
        ...selectedDate,
        time_str: new Date(e),
        // time_str: e.toISOString().match(time_regex)[0],
      });
    }
  };

  useEffect(() => {
    console.log(selectedDate);
    const time_regex = /\T(.*)/;
    const date_regex = /.+?(?=T)/;
    console.log(selectedDate.date_str.toISOString().match(date_regex))
    console.log(selectedDate.time_str.toISOString().match(time_regex))
    if (
      (selectedDate.date_str.toISOString().match(date_regex)) &&
      (selectedDate.time_str.toISOString().match(time_regex))
    ){
      handleSetForm(
        "appointmentDate",
        selectedDate.date_str.toISOString().match(date_regex)![0] + selectedDate.time_str.toISOString().match(time_regex)![0]
      );
    }

  }, [selectedDate]);

  // setTimeout(() => {
  //   console.log(selectedDate);
  // }, 5000);

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.root}
          margin="normal"
          id="date-picker-dialog"
          // label="Date picker dialog"
          // format="MM/dd/yyyy"
          value={selectedDate.date_str}
          onChange={handleDateChange("date")}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <React.Fragment>
          <KeyboardTimePicker
            className={classes.root}
            margin="normal"
            id="time-picker"
            value={selectedDate.time_str}
            onChange={handleDateChange("time")}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          />
        </React.Fragment>{" "}
      </MuiPickersUtilsProvider>
      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
    </React.Fragment>
  );
};

export default AppointmentDate;
