import React, { useState, useEffect } from "react";
import { NewCut, Cut } from "../../store/types/Cut";
import AppointmentDate from "./AppointmentDate";
import LocationSelect from "./LocationSelect";
import { connect } from "react-redux";
import ReviewSubmit from "./ReviewSubmit";
import "./CutFormContainer.scss";
import { User } from "../../store/types/User";
import { FBUser, FBUserAuthResponse } from "../../store/types/FBUser";
import { AppState } from "../../store";
import { bindActionCreators } from "redux";
import {
  boundNewOpenCut,
  boundUnsetCutSuccess,
  boundUpdateCut,
} from "../../store/actions/CutActions";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";

export interface SelectedDate {
  date_str?: Date;
  time_str?: Date;
}

interface CutFormContainerProps {
  // modalClass: any;
  handleCloseModal: () => void;
}

interface CutFormContainerState {}

type Props = CutFormContainerProps &
  CutFormContainerState &
  LinkDispatchToProps &
  LinkStateProps;

const CutFormContainer: React.FC<Props> = ({
  user,
  fbUser,
  addCutSuccess,
  boundUnsetCutSuccess,
  boundNewOpenCut,
  handleCloseModal,
}: Props) => {
  let locationSelect: any;
  let formContent;
  let currentUser: any = undefined;
  let buttonDisabled = true;
  let laterDateMessage: string = "";
  let buttonClass: string = "";

  // handle setting user
  if (user !== undefined && user.length > 0) {
    currentUser = user[0];
  } else if (fbUser !== undefined && fbUser.length > 0) {
    currentUser = fbUser[0];
  }

  // handle form setting and submission
  const [form, setForm] = useState<NewCut>({
    barberId: user.length > 0 ? user[0].id : undefined,
    fbBarberId: fbUser.length > 0 ? fbUser[0].id : undefined,
    appointmentDate: undefined,
    location: undefined,
  });

  const handleNewCutSubmit = (event: any) => {
    event.preventDefault();
    boundNewOpenCut(form, currentUser);
  };

  useEffect(() => {
    return function cleanup() {
      boundUnsetCutSuccess();
    };
  }, []);

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

  console.log(form);

  // handle props
  let formProps: any;
  formProps = {
    handleSetForm: handleSetForm,
    form: form,
  };

  // handle successfull creation
  useEffect(() => {
    if (addCutSuccess.length > 1) {
      // handleCloseModal();
    }
  }, [addCutSuccess]);

  // handle button disbaled, and style

  let currentDate: Date = new Date();

  const formFieldUndefined: boolean =
    form.appointmentDate == undefined ||
    form.location == undefined ||
    (form.barberId == undefined && form.fbBarberId == undefined);

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
          Add
        </button>
      </form>
      <div className="cutform-container__pselect"></div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  addCutSuccess: Cut[];
}

interface LinkDispatchToProps {
  boundNewOpenCut: (newCut: NewCut, user: FBUserAuthResponse | User) => void;
  boundUnsetCutSuccess: () => void;
  boundUpdateCut: (newCut: NewCut, user: FBUserAuthResponse | User) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutFormContainerProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
  addCutSuccess: state.addCutSuccess,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CutFormContainerProps
): LinkDispatchToProps => ({
  boundNewOpenCut: bindActionCreators(boundNewOpenCut, dispatch),
  boundUnsetCutSuccess: bindActionCreators(boundUnsetCutSuccess, dispatch),
  boundUpdateCut: bindActionCreators(boundUpdateCut, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CutFormContainer);
