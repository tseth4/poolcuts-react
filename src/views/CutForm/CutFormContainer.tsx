import { newCutService } from "@store/mockServices/CutService/Cut.service";
import { getAuth } from "@store/selectors";
import { NewCut } from "@store/types/Cut";
import React, { useState } from "react";
// selectors for getting state
import { useSelector } from "react-redux";
import AppointmentDate from "./AppointmentDate";
import "./CutFormContainer.scss";
import LocationSelect from "./LocationSelect";
import ReviewSubmit from "./ReviewSubmit";



export interface SelectedDate {
  date_str?: Date;
  time_str?: Date;
}

interface CutFormContainerProps {
  handleAddCutFormModal: (active: boolean) => void;
}

interface CutFormContainerState {}

type Props = CutFormContainerProps & CutFormContainerState;

const CutFormContainer: React.FC<Props> = ({
  handleAddCutFormModal,
}: Props) => {
  let locationSelect: any;
  let formContent;
  let buttonDisabled = true;
  let laterDateMessage: string = "";
  let buttonClass: string = "";

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { currentUser } = useSelector(getAuth);

  // handle form setting and submission
  const [form, setForm] = useState<NewCut>({
    barberId: currentUser != null ? currentUser.id : undefined,
    appointmentDate: undefined,
    location: undefined,
  });

  const handleNewCutSubmit = (event: any) => {
    event.preventDefault();
    if (currentUser) {
      newCutService(form, currentUser)
        .then((res) => {
          handleAddCutFormModal(false);
          window.location.reload()
        })
        .catch((err) => {
        });
    }
  };

  const handleSetForm = (input: any, value: any) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  // handle Appointment Date

  const handleDateChange = (input: string, value: string) => {
    handleSetForm(input, value);
  };

  // handle props
  let formProps: any;
  formProps = {
    handleSetForm: handleSetForm,
    form: form,
  };


  // handle button disbaled, and style

  let currentDate: Date = new Date();

  const formFieldUndefined: boolean =
    form.appointmentDate == undefined ||
    form.location == undefined ||
    form.barberId == undefined;

  const appointmentDateWithinTheNextHour: boolean =
    new Date(form.appointmentDate != undefined ? form.appointmentDate : "") <
    currentDate;

  if (formFieldUndefined || appointmentDateWithinTheNextHour) {
    buttonDisabled = true;
    buttonClass = "cutform-container__button cFdisabled";
  } else {
    buttonDisabled = false;
    buttonClass = "cutform-container__button";
  }

  // handle date error message
  if (appointmentDateWithinTheNextHour) {
    laterDateMessage = "please select a later date";
  }

  return (
    <div className="cutform-container">
      <form onSubmit={handleNewCutSubmit} className="cutform-container__form">
        <div className="cutform-container__form-group">
          <div className="cutform-container__form-group-item">
            <AppointmentDate
              {...formProps}
              handleDateChange={handleDateChange}
            />
            <LocationSelect {...formProps} />
          </div>
          <ReviewSubmit form={form} currentUser={currentUser} />
        </div>

        <p style={{ color: "red", textAlign: "center" }}>{laterDateMessage}</p>
        <button disabled={buttonDisabled} type="submit" className={buttonClass}>
          Add open cut
        </button>
      </form>
      <div className="cutform-container__pselect"></div>
    </div>
  );
};

export default CutFormContainer;
