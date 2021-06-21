import React, { useState, MouseEvent } from "react";
import { NewCut } from "../../store/types/Cut";
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
  let buttonClass = "";

  const [val, setVal] = useState({ location: "" });

  const handleOnChange = (value: any) => {
    setVal({ ...val, location: value });
  };

  // const handleClick = () => (event: MouseEvent) => {
  //   event.preventDefault();
  //   handleSetForm("location", val.location);
  // };

  React.useEffect(() => {
    handleSetForm("location", val.location)
  }, [val]);

  if (val.location.length > 1) {
    buttonDisabled = false;
    buttonClass = "locationSelect-container__button";
  } else {
    buttonDisabled = true;
    buttonClass = "locationSelect-container__button lDisabled";
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

export default LocationSelect;
