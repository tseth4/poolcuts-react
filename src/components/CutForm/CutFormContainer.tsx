import React, { useState } from "react";
import { NewCut } from "../../store/types/Cut";

const CutFormContainer = () => {
  
  const [form, setForm] = useState<NewCut>({
    barberId: undefined,
    appointmentDate: undefined,
    location: undefined,
  });

  return <div></div>;
};

export default CutFormContainer;
