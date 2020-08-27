import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { NewCut } from "../../store/types/Cut";
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
    background: "linear-gradient(45deg, #3cc8c8 30%, #a1a9a8 90%)",
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  inputLabel: {
    color: "white"
  }
}));

interface LocationSelectProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
}

interface LocationSelectState {}

type Props = LocationSelectProps & LocationSelectState;

const LocationSelect: React.FC<Props> = ({handleSetForm, form}: Props )=> {
  const classes = useStyles();

  const [val, setVal] = useState();

  const handleSelectChange = (event: any) => {
    setVal(event.target.value);
    handleSetForm("location", event.target.value);
  };

  if (val) console.log(val);

  return (
    <div>
      <div>
        <InputLabel className={classes.inputLabel} id="demo-simple-select-label">Location</InputLabel>
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
}

export default LocationSelect;