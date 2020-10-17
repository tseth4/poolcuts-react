import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { boundSubmitNewPassword } from "../../store/actions/UserActions"
import { PasswordRequest, PasswordResetResponse } from "../../store/types/User";
import { connect } from "react-redux";
import "./NewPasswordForm.scss";
import { IError } from "../../store/types/Error";
import { bindActionCreators } from "redux";import { useParams } from "react-router-dom";
import { isEmpty} from "../../utils/Functions";
import { Redirect } from "react-router";

interface ParamTypes {
  token: string;
}
interface NewPasswordFormProps {}

interface NewPasswordFormState {}

type Props = NewPasswordFormProps & NewPasswordFormState & LinkDispatchToProps & LinkStateProps;
const NewPasswordForm: React.FC<Props> = ({  passwordResetResponse ,passwordResetError ,boundSubmitNewPassword }: Props) => {
  let { token } = useParams<ParamTypes>();
  let successMessage: string = "";
  let errorMessage: string = "";

  const [confirmPassword, setConfirmPassword] = useState({
    password: ""
  });

  const [newPasswordForm, setNewPasswordForm] = useState<PasswordRequest>({
    password: "",
    token: ""
  });

  const handleChange = (input: string) => (event: any) => {
    setNewPasswordForm({...newPasswordForm, [input]: event.target.value});
  }

  const handleConfirmPassword = (input: string) => (event: any) => {
    setConfirmPassword({...confirmPassword, [input]: event.target.value})
  }

  React.useEffect(() => {
    if (token){
      setNewPasswordForm({...newPasswordForm, token: token})
    }

  }, []);

  if (newPasswordForm) console.log(newPasswordForm)

  let buttonDisabled: boolean = true;
  let buttonClass: string = "newpasswordform-container__sbtn";

  const handleSubmit = (event: any) => {
    event.preventDefault();
    boundSubmitNewPassword(newPasswordForm);
  }

  if (confirmPassword.password == newPasswordForm.password){
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  if (passwordResetError.message){
    errorMessage = passwordResetError.message
  }

  if (passwordResetResponse.message){
    successMessage = passwordResetResponse.message
  }

  // if (!isEmpty(passwordResetResponse)) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="newpasswordform-container">
      <form onSubmit={handleSubmit} className="newpasswordformform-container">
        <div className="newpasswordform-container__textbox">
          <input
            type="text"
            placeholder="New password"
            className="newpasswordform-container__inpt"
            onChange={handleChange("password")}
          />
        </div>
        <div className="newpasswordform-container__textbox">
          <input
            type="text"
            placeholder="Confirm new password"
            className="newpasswordform-container__inpt"
            onChange={handleConfirmPassword("password")}
          />
        </div>
        <button
          disabled={buttonDisabled}
          type="submit"
          className={buttonClass}
        >
          Update password
        </button>
        <div>{errorMessage}</div>
        <div>{successMessage}</div>
      </form>
    </div>
  );
};

interface LinkStateProps {
  passwordResetResponse: PasswordResetResponse,
  passwordResetError: IError
}

interface LinkDispatchToProps {
  boundSubmitNewPassword: (request: PasswordRequest) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: NewPasswordFormProps
):LinkStateProps => ({
  passwordResetResponse: state.passwordResetResponse,
  passwordResetError: state.passwordResetError
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: NewPasswordFormProps
): LinkDispatchToProps => ({
  boundSubmitNewPassword: bindActionCreators(boundSubmitNewPassword, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPasswordForm);
