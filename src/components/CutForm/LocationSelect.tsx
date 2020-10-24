import React, { useState, MouseEvent } from "react";
import { NewCut, UpdateCut } from "../../store/types/Cut";
import "./LocationSelect.scss";

interface LocationSelectProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
}

interface LocationSelectState {}

type Props = LocationSelectProps & LocationSelectState;

const LocationSelect: React.FC<Props> = ({ handleSetForm, form }: Props) => {
  let buttonView;
  let buttonDisabled = true;

  const [val, setVal] = useState({ location: "" });

  const handleOnChange = (value: any) => {
    setVal({ ...val, location: value });
  };

  const handleClick = () => (event: MouseEvent) => {
    event.preventDefault();
    handleSetForm("location", val.location);
  };

  if (val.location.length > 1) {
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  return (
    <div className="locationSelect-container ">
      <input
        type="text"
        name="location"
        placeholder="location"
        value={val.location}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <button disabled={buttonDisabled} onClick={handleClick()}>
        +
      </button>
    </div>
  );
};

export default LocationSelect;
