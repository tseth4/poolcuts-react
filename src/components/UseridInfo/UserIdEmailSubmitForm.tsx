import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "@store/index";
// import { AppActions } from "@store/types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { boundSendUserInfoRequest } from "@store/actions/UserIdInfoActions"
import { UserIdInfoRequestResponse } from "@store/types/UserIdInfo";
import { IError } from "@store/types/Error";
import { validateEmail } from "../../utils/Functions";
import "./UserIdEmailSubmit.scss"

interface UserIdEmailSubmitFormProps {}

interface UserIdEmailSubmitFormState {}

type Props = UserIdEmailSubmitFormProps &
  UserIdEmailSubmitFormState;

const UserIdEmailSubmitForm: React.FC<Props> = ({
  // userIdInfoRequestError,
  // userIdInfoRequestResponse,
  // boundSendUserInfoRequest
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
    buttonClass = "useridemailsubmitformform-container__sbtn"
  } else {
    buttonDisabled = true;
    buttonClass = "useridemailsubmitformform-container__sbtn-disabled"
    console.log("disbaled")
  }


  const handleInputChange = (input: string) => (event: any) => {
    setEmailForm({ ...emailForm, [input]: event.target.value });
    console.log(emailForm);
  };

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   // boundSendReq
  //   boundSendUserInfoRequest(emailForm.email);
  // };

  // if (userIdInfoRequestError.message) {
  //   console.log(userIdInfoRequestError);
  //   errorMessage = userIdInfoRequestError.message;
  // } else {
  //   errorMessage = "";
  // }

  // if (userIdInfoRequestResponse.message) {
  //   successMessage = userIdInfoRequestResponse.message;
  // } else {
  //   successMessage = "";
  // }

  return (
    <div className="useridemailsubmitform-container"> 
          <h2 style={{"color": "white"}}>User lookup</h2>

      <form 
      // onSubmit={handleSubmit} 
      className="useridemailsubmitformform-container">
        <div className="useridemailsubmitformform-container__textbox">
          <input
            type="text"
            placeholder="email"
            className="useridemailsubmitformform-container__inpt"
            onChange={handleInputChange("email")}
          />
        </div>
        <button disabled={buttonDisabled} className={buttonClass}>Send</button>
        <div className="useridemailsubmitformform-container__message">{successMessage}</div>
        <div className="useridemailsubmitformform-container__message">{errorMessage}</div>
      </form>
    </div>
  );
};

// interface LinkStateProps {
//   userIdInfoRequestResponse: UserIdInfoRequestResponse,
//   userIdInfoRequestError: IError
// }

// interface LinkDispatchToProps {
//   boundSendUserInfoRequest: (email: string) => void;
// }

// const mapStateToProps = (
//   state: AppState,
//   ownProps: UserIdEmailSubmitFormProps
// ): LinkStateProps => ({
//   userIdInfoRequestResponse: state.userIdInfoRequestResponse,
//   userIdInfoRequestError: state.userIdInfoRequestError
// })

// const mapDispatchToProps = (
//   dispatch: ThunkDispatch<any, any, AppActions>,
//   ownProps: UserIdEmailSubmitFormProps
// ): LinkDispatchToProps => ({
//   boundSendUserInfoRequest: bindActionCreators(
//     boundSendUserInfoRequest, dispatch
//   )
// })

export default UserIdEmailSubmitForm;
