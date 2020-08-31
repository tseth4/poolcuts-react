import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { NewCut, UpdateCut } from "../../store/types/Cut";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: "white",
    borderRadius: 3,
    // border: 0,
    borderColor: "white",
    height: 48,
    padding: "0 30px",
  },
  inputLabel: {
    color: "white",
  },
}));

interface LocationSelectProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
  // handleSetEditForm: (input: any, value: any) => void;
  // editForm: UpdateCut;
  // modalClass: any;
}

interface LocationSelectState {}

type Props = LocationSelectProps & LocationSelectState;

const LocationSelect: React.FC<Props> = ({
  handleSetForm,
  form,
}: // handleSetEditForm,
// editForm,
// modalClass,
Props) => {
  const classes = useStyles();

  const handleSelectChange = (event: any) => {
    handleSetForm("location", event.target.value);
  };

  return (
    <div>
      <div>
        <InputLabel
          className={classes.inputLabel}
          id="demo-simple-select-label"
        >
          <a style={{ fontSize: "11pt"}}>Location:</a>
        </InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={form.location}
          onChange={handleSelectChange}
        >
          <MenuItem value={"Studio"}>Studio</MenuItem>
          <MenuItem value={"Shop"}>Shop</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default LocationSelect;
