import React, { useState } from "react";
import { ServiceSelect } from "./ServiceSelect";
import CutSelect from "./CutSelect";
import ReviewSubmit from "./ReviewSubmit";
// import { Book } from '.'

import "./BookForm.scss";
import { Book } from "../../store/types/Book";
import { Cut } from "../../store/types/Cut";

const BookFormContainer = () => {
  // Book b = new Book();

  let formContent;
  let stepClass1 = "bookform-container__dot";
  let stepClass2 = "bookform-container__dot";
  let stepClass3 = "bookform-container__dot";

  const [form, setForm] = useState<Book>({
    category: undefined,
    cut: undefined,
    client: undefined,
  });

  const [selectedCut, setSelectedCut] = useState<Cut>({
    cutId: undefined,
    barberId: undefined,
    appointmentDate: undefined,
    location: undefined
  });

  const [step, setStep] = useState(0);

  const handleStep = () => {
    setStep(step + 1);
  };

  if (step) {
    console.log(form);
  }

  const handleSetForm = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSelectedCut = (cut: Cut) => {
    setSelectedCut(cut);
  }

  let formProps = {
    handleSetForm: handleSetForm,
    handleStep: handleStep,
    form: form,
  };

  if (step == 0) {
    formContent = (
      <React.Fragment>
        <ServiceSelect {...formProps} />
        {/* <CutSelect {...formProps} /> */}
      </React.Fragment>
    );
  } 
  else if (step == 1) {
    formContent = (
      <React.Fragment>
        <CutSelect {...formProps} handleSelectedCut={handleSelectedCut}/>
      </React.Fragment>
    );
  } else if (step == 2){
    formContent = (
    <React.Fragment>
      <ReviewSubmit {...formProps} selectedCut={selectedCut}/>
    </React.Fragment>
    );
  }

  if (form.category != null) {
    stepClass1 = "bookform-container__dot filled";
  } else {
    stepClass1 = "bookform-container__dot";
  }

  if (form.cut != null) {
    console.log("form.cuttt");
    stepClass2 = "bookform-container__dot filled";
  } else {
    stepClass2 = "bookform-container__dot";
  }

  return (
    <div className="bookform-container">
      <form className="bookform-container__form">{formContent}</form>
      <div className="bookform-container__pselect">
        <span className={stepClass1} onClick={() => setStep(0)}></span>
        <span className={stepClass2} onClick={() => setStep(1)}></span>
        <span className={stepClass3} onClick={() => setStep(2)}></span>
      </div>
    </div>
  );
};

export default BookFormContainer;
