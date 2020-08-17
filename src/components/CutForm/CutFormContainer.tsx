import React, { useState } from "react";
import { NewCut } from "../../store/types/Cut";
import AppointmentDate from "./AppointmentDate";
import LocationSelect from "./LocationSelect";

const CutFormContainer = () => {
  
  const [form, setForm] = useState<NewCut>({
    barberId: undefined,
    appointmentDate: undefined,
    location: undefined,
  });

  return (
    <div>
      <AppointmentDate/>
      <LocationSelect/>
    </div>
  )

};

export default CutFormContainer;
