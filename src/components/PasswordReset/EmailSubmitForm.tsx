import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { isEmpty, validateEmail } from "../../utils/Functions";
import { connect } from "react-redux";
import { boundSendPasswordResetRequest } from "../../store/actions/UserActions";
import "./EmailSubmitForm.scss";
import { bindActionCreators } from "redux";
import { PasswordRequestResponse } from "../../store/types/User";
import { IError } from "../../store/types/Error";

interface EmailSubmitFormProps {}

interface EmailSubmitFormState {}

type Props = EmailSubmitFormProps &
  EmailSubmitFormState &
  LinkDispatchToProps &
  LinkStateProps;
const EmailSubmitForm: React.FC<Props> = ({
  passwordRequestResponse,
  passwordRequestError,
  boundSendPasswordResetRequest,
}: Props) => {
  const [emailForm, setEmailForm] = useState({
    email: "",
  });

  const handleInputChange = (input: string) => (event: any) => {
    setEmailForm({ ...emailForm, [input]: event.target.value });
    console.log(emailForm);
  };

  let buttonDisabled: boolean = true;
  let buttonClass: string = "emailsubmitform-container__sbtn";
  let successMessage: string = "";
  let errorMessage: string = "";

  if (validateEmail(emailForm.email)) {
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // boundSendReq
    boundSendPasswordResetRequest(emailForm.email);
  };

  if (passwordRequestError.message) {
    console.log(passwordRequestError);
    errorMessage = passwordRequestError.message
  } else {
    errorMessage = ""
  }

  if (passwordRequestResponse.message) {
    successMessage = passwordRequestResponse.message
  } else {
    successMessage = ""
  }

  return (
    <div className="emailsubmitform-container">
      <form onSubmit={handleSubmit} className="emailsubmitformform-container">
        <div className="emailsubmitform-container__textbox">
          <input
            type="text"
            placeholder="email"
            className="emailsubmitform-container__inpt"
            onChange={handleInputChange("email")}
          />
        </div>
        <button disabled={buttonDisabled} type="submit" className={buttonClass}>
          Send password reset link
        </button>
        <div>{successMessage}</div>
  <div>{errorMessage}</div>
      </form>
    </div>
  );
};

interface LinkStateProps {
  passwordRequestResponse: PasswordRequestResponse;
  passwordRequestError: IError;
}

interface LinkDispatchToProps {
  boundSendPasswordResetRequest: (email: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: EmailSubmitFormProps
): LinkStateProps => ({
  passwordRequestResponse: state.passwordRequestResponse,
  passwordRequestError: state.passwordRequestError,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: EmailSubmitFormProps
): LinkDispatchToProps => ({
  boundSendPasswordResetRequest: bindActionCreators(
    boundSendPasswordResetRequest,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailSubmitForm);
