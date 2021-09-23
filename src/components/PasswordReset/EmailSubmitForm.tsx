import React, { useState } from "react";
import { validateEmail } from "../../utils/Functions";
import "./EmailSubmitForm.scss";

interface EmailSubmitFormProps {}

interface EmailSubmitFormState {}

type Props = EmailSubmitFormProps & EmailSubmitFormState;
const EmailSubmitForm: React.FC<Props> = ({}: Props) => {
  let buttonDisabled: boolean = true;
  let buttonClass: string = "";
  let successMessage: string = "";
  let errorMessage: string = "";

  const [emailForm, setEmailForm] = useState({
    email: "",
  });

  if (validateEmail(emailForm.email)) {
    buttonDisabled = false;
    buttonClass = "emailsubmitformform-container__sbtn";
  } else {
    buttonDisabled = true;
    buttonClass = "emailsubmitformform-container__sbtn-disabled";
  }

  const handleInputChange = (input: string) => (event: any) => {
    setEmailForm({ ...emailForm, [input]: event.target.value });
  };

  if (validateEmail(emailForm.email)) {
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="emailsubmitform-container">
      <h2 style={{ color: "white" }}>Password reset</h2>
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
        <div className="emailsubmitformform-container__message">
          {successMessage}
        </div>
        <div className="uemailsubmitformform-container__message">
          {errorMessage}
        </div>
      </form>
    </div>
  );
};

// interface LinkStateProps {
//   passwordRequestResponse: PasswordRequestResponse;
//   passwordRequestError: IError;
// }

// interface LinkDispatchToProps {
//   boundSendPasswordResetRequest: (email: string) => void;
// }

// const mapStateToProps = (
//   state: AppState,
//   ownProps: EmailSubmitFormProps
// ): LinkStateProps => ({
//   passwordRequestResponse: state.passwordRequestResponse,
//   passwordRequestError: state.passwordRequestError,
// });

// const mapDispatchToProps = (
//   dispatch: ThunkDispatch<any, any, AppActions>,
//   ownProps: EmailSubmitFormProps
// ): LinkDispatchToProps => ({
//   boundSendPasswordResetRequest: bindActionCreators(
//     boundSendPasswordResetRequest,
//     dispatch
//   ),
// });

export default EmailSubmitForm;
