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
import { NewCut, UpdateCut } from "../../store/types/Cut";

const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, grey 30%, #a1a9a8 90%)",
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: "0 30px",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
  input: {
    color: "white",
  },
});

interface AppointmentDateProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
  handleSetEditForm: (input: any, value: any) => void;
  editForm: UpdateCut;
  modalClass: any;
}

interface AppointmentDateState {}

type Props = AppointmentDateProps & AppointmentDateState;

const AppointmentDate: React.FC<Props> = ({
  handleSetForm,
  form,
  handleSetEditForm,
  editForm,
  modalClass,
}: Props) => {
  const classes = useStyles();
  let timeView: any;
  const [selectedDate, setSelectedDate] = React.useState({
    date_str: new Date(),
    time_str: new Date(),
  });

  const handleDateChange = (input: any) => (e: any) => {
    if (input == "date") {
      setSelectedDate({
        ...selectedDate,
        date_str: new Date(e),
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
    if (
      selectedDate.date_str.toISOString().match(date_regex) &&
      selectedDate.time_str.toISOString().match(time_regex)
    ) {
      handleSetForm(
        "appointmentDate",
        selectedDate.date_str.toISOString().match(date_regex)![0] +
          selectedDate.time_str.toISOString().match(time_regex)![0]
      );
    }
  }, [selectedDate]);

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.root}
          margin="normal"
          id="date-picker-dialog"
          value={form.appointmentDate}
          onChange={handleDateChange("date")}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          InputProps={{ className: classes.input }}
          disablePast={true}
        />
        <React.Fragment>
          <KeyboardTimePicker
            className={classes.root}
            margin="normal"
            id="time-picker"
            value={form.appointmentDate}
            onChange={handleDateChange("time")}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
            InputProps={{ className: classes.input }}
          />
        </React.Fragment>{" "}
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default AppointmentDate;
