import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetAllCuts } from "../../store/actions/CutActions";
import { Cut } from "../../store/types/Cut";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";

interface CutSelectProps {
  cuts?: Cut[];
}

interface CutSelectState {}

type Props = CutSelectProps & LinkDispatchToProps & LinkStateProps;

const CutSelect: React.FC<Props> = ({}: Props) => {
  useEffect(() => {});
  return <div></div>;
};

//specifies return value of mapStateToProps
interface LinkStateProps {
  cuts: Cut[];
}

//specifies return value of mapDispatchToProps
interface LinkDispatchToProps {
  boundGetAllCuts: () => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutSelectProps
): LinkStateProps => ({
  cuts: state.cut,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CutSelectProps
): LinkDispatchToProps => ({
  boundGetAllCuts: bindActionCreators(boundGetAllCuts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CutSelect);
