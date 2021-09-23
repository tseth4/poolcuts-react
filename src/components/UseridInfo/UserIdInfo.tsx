import React from "react";
import "./UserIdInfo.scss";

interface ParamTypes {
  email: string;
  token: string;
}

interface UserIdInfoProps {}

interface UserIdInfoState {}

type Props = UserIdInfoProps & UserIdInfoState;

const UserIdInfo: React.FC<Props> = ({}: Props) => {
  return (
    <div className="useridinfo-container">
      <div className="useridinfo-container__text">You userId: </div>
    </div>
  );
};

export default UserIdInfo;
