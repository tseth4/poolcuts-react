import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { validateEmail } from "../../utils/Functions";
import { connect } from "react-redux";
import { boundSendPasswordResetRequest } from "../../store/actions/UserActions";
import "./EmailSubmitForm.scss";
import { bindActionCreators } from "redux";
// import { PasswordRequestResponse } from "../../store/types/User";
import { IError } from "../../store/types/Error";
import { PasswordRequestResponse } from "../../store/types/UserPasswordReset";

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
  let buttonDisabled: boolean = true;
  let buttonClass: string = "";
  let successMessage: string = "";
  let errorMessage: string = "";

  
  
  const [emailForm, setEmailForm] = useState({
    email: "",
  });

  if (validateEmail(emailForm.email)) {
    buttonDisabled = false;
    buttonClass = "emailsubmitformform-container__sbtn"
  } else {
    buttonDisabled = true;
    buttonClass = "emailsubmitformform-container__sbtn-disabled"
    console.log("disbaled")
  }

  const handleInputChange = (input: string) => (event: any) => {
    setEmailForm({ ...emailForm, [input]: event.target.value });
    console.log(emailForm);
  };



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
    errorMessage = passwordRequestError.message;
  } else {
    errorMessage = "";
  }

  if (passwordRequestResponse.message) {
    successMessage = passwordRequestResponse.message;
  } else {
    successMessage = "";
  }

  return (
    <div className="emailsubmitform-container">
      <h2 style={{"color": "white"}}>Password reset</h2>
      <form onSubmit={handleSubmit} className="emailsubmitformform-container">
        <div className="emailsubmitformform-container__textbox">
          <input
            type="text"
            placeholder="email"
            className="emailsubmitformform-container__inpt"
            onChange={handleInputChange("email")}
          />
        </div>
        <button disabled={buttonDisabled} type="submit" className={buttonClass}>
          Send
        </button>
        <div className="emailsubmitformform-container__message">{successMessage}</div>
        <div className="uemailsubmitformform-container__message">{errorMessage}</div>
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
