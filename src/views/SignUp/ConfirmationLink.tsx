import React, {useEffect} from "react";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "@store/index";
import { IError } from "@store/types/Error";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ActivationResponse } from "@store/types/UserSignUp";

interface ParamTypes {
  token: string;
}

interface ConfirmationLinkProps {}

interface ConfirmationLinkState {}

type Props =
  & ConfirmationLinkProps
  & ConfirmationLinkState;

const ConfirmationLink: React.FC<Props> = ({
  // activateUserResponse,
  // activateError,
  // boundActivateUser
}: Props) => {
  let { token } = useParams<ParamTypes>();
  let activateErrorMessage: string = "";
  let activateUserResponseMessagae: string = "";

  // useEffect(() => {
  //   if (token){
  //     console.log(token);
  //     boundActivateUser(token)
  //   }
  // },[]);

  // if (activateError.message){
  //   activateErrorMessage = activateError.message
  // }

  // if (activateUserResponse.message){
  //   activateUserResponseMessagae = activateUserResponse.message;
  // }

return <div style={{padding: "300px", color: "black"}}>{activateErrorMessage}{activateUserResponseMessagae}</div>;
};

// interface LinkStateProps {
//   activateUserResponse: ActivationResponse;
//   activateError: IError;
// }

// interface LinkDispatchToProps {
//   boundActivateUser: (token: string) => void;
// }

// const mapStateToProps = (
//   state: AppState,
//   ownProps: ConfirmationLinkProps
// ): LinkStateProps => ({
//   activateUserResponse: state.activateUserResponse,
//   activateError: state.activateError,
// });

// const mapDispatchToProps = (
//   dispatch: ThunkDispatch<any, any, AppActions>,
//   ownProps: ConfirmationLinkProps
// ): LinkDispatchToProps => ({
//   boundActivateUser: bindActionCreators(boundActivateUser, dispatch),
// });

export default (ConfirmationLink);
