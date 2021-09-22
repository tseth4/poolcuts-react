import { NewCut } from "@store/types/Cut";
import React, { useEffect, useState } from "react";
import "./LocationSelect.scss";

interface LocationSelectProps {
  handleSetForm: (input: any, value: any) => void;
  form: NewCut;
}

interface LocationSelectState {}

type Props = LocationSelectProps & LocationSelectState;

const LocationSelect: React.FC<Props> = ({ handleSetForm, form }: Props) => {
  const [val, setVal] = useState({ location: "" });

  const handleOnChange = (value: any) => {
    setVal({ ...val, location: value });
  };

  useEffect(() => {
    handleSetForm("location", val.location);
  }, [val]);

  return (
    <div className="locationSelect-container ">
      <input
        type="text"
        name="location"
        placeholder="location"
        value={val.location}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
};

export default LocationSelect;
