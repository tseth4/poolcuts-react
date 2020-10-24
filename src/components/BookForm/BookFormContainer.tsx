import React, { useState, useEffect } from "react";
import { ServiceSelect } from "./ServiceSelect";
import CutSelect from "./CutSelect";
import ReviewSubmit from "./ReviewSubmit";
import { connect } from "react-redux";
import {
  boundBookAppointment,
  boundUnsetSuccessMessage,
} from "../../store/actions/BookActions";

import "./BookForm.scss";
import { Book, NewBooking } from "../../store/types/Book";
import { Cut } from "../../store/types/Cut";
import { User } from "../../store/types/User";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";
import { FBUser } from "../../store/types/FBUser";
import { Redirect } from "react-router";
import { isEmpty } from "../../utils/Functions"

interface BookFormContainerProps {}

interface BookFormContainerState {}

type Props = BookFormContainerProps &
  BookFormContainerState &
  LinkDispatchToProps &
  LinkStateProps;

const BookFormContainer: React.FC<Props> = ({
  user,
  fbUser,
  boundBookAppointment,
  bookSuccess,
}: Props) => {
  // Book b = new Book();

  let currentUser: any = undefined;

  let formContent;
  let stepClass1 = "bookform-container__dot";
  let stepClass2 = "bookform-container__dot";
  let stepClass3 = "bookform-container__dot";

  const [form, setForm] = useState<NewBooking>({
    category: undefined,
    cutId: undefined,
    clientId: user.length > 0 ? user[0].id : undefined,
    fbClientId: fbUser.length > 0 ? fbUser[0].id : undefined,
  });

  if (user !== undefined && user.length > 0) {
    currentUser = user[0];
  } else if (fbUser !== undefined && fbUser.length > 0) {
    currentUser = fbUser[0];
  }

  const [selectedCut, setSelectedCut] = useState<Cut>({
    cutId: undefined,
    barberId: undefined,
    appointmentDate: undefined,
    location: undefined,
  });

  const [step, setStep] = useState(0);

  const handleStep = () => {
    setStep(step + 1);
  };

  const handleSetForm = (key: string, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSelectedCut = (cut: Cut) => {
    setSelectedCut(cut);
  };

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
  } else if (step == 1) {
    formContent = (
      <React.Fragment>
        <CutSelect {...formProps} handleSelectedCut={handleSelectedCut} />
      </React.Fragment>
    );
  } else if (step == 2) {
    formContent = (
      <React.Fragment>
        <ReviewSubmit
          {...formProps}
          selectedCut={selectedCut}
          currentUser={currentUser}
        />
      </React.Fragment>
    );
  }

  if (form.category != null) {
    stepClass1 = "bookform-container__dot filled";
  } else {
    stepClass1 = "bookform-container__dot";
  }

  if (form.cutId != null) {
    console.log("form.cuttt");
    stepClass2 = "bookform-container__dot filled";
  } else {
    stepClass2 = "bookform-container__dot";
  }

  const handleBookAppointment = (event: any) => {
    event.preventDefault();
    boundBookAppointment(form, currentUser);
  };

  if (form) {
    console.log(form);
  }

  useEffect(() => {
    // boundUnsetSuccessMessage();
    return function cleanup() {
      boundUnsetSuccessMessage();
    };
  }, []);

  if (!isEmpty(bookSuccess)) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="bookform-container">
      <form
        onSubmit={handleBookAppointment}
        className="bookform-container__form"
      >
        {formContent}
      </form>
      <div className="bookform-container__pselect">
        <span className={stepClass1} onClick={() => setStep(0)}></span>
        <span className={stepClass2} onClick={() => setStep(1)}></span>
        <span className={stepClass3} onClick={() => setStep(2)}></span>
      </div>
    </div>
  );
};

interface LinkStateProps {
  user: User[];
  fbUser: FBUser[];
  bookSuccess: Book;
}

interface LinkDispatchToProps {
  boundBookAppointment: (book: Book, user: User) => void;
  boundUnsetSuccessMessage: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BookFormContainerProps
): LinkStateProps => ({
  user: state.user,
  fbUser: state.fbUser,
  bookSuccess: state.bookSuccess,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: BookFormContainerProps
): LinkDispatchToProps => ({
  boundBookAppointment: bindActionCreators(boundBookAppointment, dispatch),
  boundUnsetSuccessMessage: bindActionCreators(
    boundUnsetSuccessMessage,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookFormContainer);
