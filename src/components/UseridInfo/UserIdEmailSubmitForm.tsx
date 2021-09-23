import React, { useState } from "react";
import { validateEmail } from "../../utils/Functions";
import "./UserIdEmailSubmit.scss";

interface UserIdEmailSubmitFormProps {}

interface UserIdEmailSubmitFormState {}

type Props = UserIdEmailSubmitFormProps & UserIdEmailSubmitFormState;

const UserIdEmailSubmitForm: React.FC<Props> = ({}: Props) => {
  let buttonDisabled: boolean = true;
  let buttonClass: string = "";
  let successMessage: string = "";
  let errorMessage: string = "";

  const [emailForm, setEmailForm] = useState({
    email: "",
  });

  if (validateEmail(emailForm.email)) {
    buttonDisabled = false;
    buttonClass = "useridemailsubmitformform-container__sbtn";
  } else {
    buttonDisabled = true;
    buttonClass = "useridemailsubmitformform-container__sbtn-disabled";
  }

  const handleInputChange = (input: string) => (event: any) => {
    setEmailForm({ ...emailForm, [input]: event.target.value });
  };

  return (
    <div className="useridemailsubmitform-container">
      <h2 style={{ color: "white" }}>User lookup</h2>

      <form className="useridemailsubmitformform-container">
        <div className="useridemailsubmitformform-container__textbox">
          <input
            type="text"
            placeholder="email"
            className="useridemailsubmitformform-container__inpt"
            onChange={handleInputChange("email")}
          />
        </div>
        <button disabled={buttonDisabled} className={buttonClass}>
          Send
        </button>
        <div className="useridemailsubmitformform-container__message">
          {successMessage}
        </div>
        <div className="useridemailsubmitformform-container__message">
          {errorMessage}
        </div>
      </form>
    </div>
  );
};

export default UserIdEmailSubmitForm;
