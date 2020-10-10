import React, { useState, useEffect } from "react";
import { NewCut, Cut, UpdateCut } from "../../store/types/Cut";
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
import { Redirect } from "react-router";
import { Modal } from "@material-ui/core";

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

  // helper function - checking if object is empty
  function isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

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
    appointmentDate: "2015-03-25",
    location: "Shop",
  });

  const handleNewCutSubmit = (event: any) => {
    event.preventDefault();
    boundNewOpenCut(form, currentUser);
  };

  useEffect(() => {
    console.log("rerender CutFormContainer");
    // boundUnsetSuccessMessage();
    return function cleanup() {
      boundUnsetCutSuccess();
    };
  }, []);

  useEffect(() => {
    console.log("update form");
    console.log(form);
  }, [form]);

  const handleSetForm = (input: any, value: any) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  // appointment logic

  const [selectedDate, setSelectedDate] = React.useState<SelectedDate>({
    date_str: undefined,
    time_str: undefined,
  });

  const handleDateChange = (input: any) => (e: any) => {
    if (input == "date") {
      setSelectedDate({
        ...selectedDate,
        date_str: new Date(e),
      });
    }
    if (input == "time") {
      setSelectedDate({
        ...selectedDate,
        time_str: new Date(e),
        // time_str: e.toISOString().match(time_regex)[0],
      });
    }
  };

  useEffect(() => {
    const time_regex = /\T(.*)/;
    const date_regex = /.+?(?=T)/;
    if (
      selectedDate.date_str != undefined &&
      selectedDate.time_str != undefined
    ) {
      if (
        selectedDate.date_str.toISOString().match(date_regex) &&
        selectedDate.time_str.toISOString().match(time_regex)
      ) {
        console.log(
          "final ISO String:    " +
            selectedDate.date_str.toISOString().match(date_regex)![0] +
            selectedDate.time_str.toISOString().match(time_regex)![0]
        );

        handleSetForm(
          "appointmentDate",
          selectedDate.date_str.toISOString().match(date_regex)![0] +
            selectedDate.time_str.toISOString().match(time_regex)![0]
        );
      }
    }
  }, [selectedDate]);

  // handle props
  let formProps: any;
  formProps = {
    handleSetForm: handleSetForm,
    form: form,
  };

  // Handle steps and form rendering

  if (form.appointmentDate != undefined) {
    locationSelect = (
      <React.Fragment>
        <LocationSelect {...formProps} />
      </React.Fragment>
    );
  }

  let stepClass1 = "cutform-container__dot";
  let stepClass2 = "cutform-container__dot";
  const [step, setStep] = useState(0);
  if (step == 0) {
    formContent = (
      <React.Fragment>
        <AppointmentDate
          {...formProps}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
        {locationSelect}
      </React.Fragment>
    );
  } else if (step == 1) {
    formContent = (
      <React.Fragment>
        <ReviewSubmit form={form} currentUser={currentUser} />
      </React.Fragment>
    );
  }

  if (form.appointmentDate != null && form.location != null) {
    stepClass1 = "cutform-container__dot filled";
  } else {
    stepClass1 = "cutform-container__dot";
  }

  // handle successfull creation
  useEffect(() => {
    if (!isEmpty(addCutSuccess)) {
      handleCloseModal();
    }
  }, [addCutSuccess]);

  return (
    <div className="cutform-container">
      <form onSubmit={handleNewCutSubmit} className="cutform-container__form">
        {formContent}
      </form>
      <div className="cutform-container__pselect">
        <div>hello</div>
        <span className={stepClass1} onClick={() => setStep(0)}></span>
        <span className={stepClass2} onClick={() => setStep(1)}></span>
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  addCutSuccess: Cut;
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
