import React, { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { AppActions } from "../../store/types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { IError } from "../../store/types/Error";
import {
  UserIdInfoWithTokenRequestResponse,
  UserIdInfoWithTokenRequest,
} from "../../store/types/UserIdInfo";
import { bindActionCreators } from "redux";
import { boundGetUserIdInfo } from "../../store/actions/UserIdInfoActions";
import "./UserIdInfo.scss"

interface ParamTypes {
  email: string;
  token: string;
}

interface UserIdInfoProps {}

interface UserIdInfoState {}

type Props = UserIdInfoProps &
  UserIdInfoState &
  LinkDispatchToProps &
  LinkStateProps;

const UserIdInfo: React.FC<Props> = ({
  boundGetUserIdInfo,
  userIdInfoRequestWithTokenResponse,
  userIdInfoRequestWithTokenError,
}: Props) => {
  let { token, email } = useParams<ParamTypes>();
  let userId: string = "";

  useEffect(() => {
    if (token != null && email != null) {
      boundGetUserIdInfo({
        email: email,
        token: token,
      });
    }
  }, []);

  if (userIdInfoRequestWithTokenResponse.username != undefined) {
    userId = userIdInfoRequestWithTokenResponse.username;
  }
  return (
    <div className="useridinfo-container">
      <div className="useridinfo-container__text">You userId: </div>
      <p className="useridinfo-container__text">{userId}</p>
    </div>
  );
};

interface LinkStateProps {
  userIdInfoRequestWithTokenResponse: UserIdInfoWithTokenRequestResponse;
  userIdInfoRequestWithTokenError: IError;
}

interface LinkDispatchToProps {
  boundGetUserIdInfo: (data: UserIdInfoWithTokenRequest) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: UserIdInfoProps
): LinkStateProps => ({
  userIdInfoRequestWithTokenResponse: state.userIdInfoRequestWithTokenResponse,
  userIdInfoRequestWithTokenError: state.userIdInfoRequestWithTokenError,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: UserIdInfoProps
): LinkDispatchToProps => ({
  boundGetUserIdInfo: bindActionCreators(boundGetUserIdInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIdInfo);
