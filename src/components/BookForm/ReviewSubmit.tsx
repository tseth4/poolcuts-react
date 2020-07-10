import React from 'react'
import { Book } from '../../store/types/Book';
import { Cut } from '../../store/types/Cut';
import { format } from 'path';
import { AppState } from '../../store';
import { User } from '../../store/types/User';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../store/types';
import { connect } from "react-redux";

interface RsProps {
  cuts?: Cut[];
  handleSetForm: (key: string, value: string) => void;
  handleStep: () => void;
  form: Book;
  selectedCut: Cut
}

interface RsState {}

type Props = RsProps & LinkDispatchToProps &
LinkStateProps &
RsState;

const ReviewSubmit: React.FC<Props> = ({form, selectedCut, user}: Props) => {
  if (user){ 
    console.log(user);
  }
  return (
    <div className="rs-container">
      <div>type: {form.category}</div>
      <div>Location: {selectedCut.location}</div>
      <div>Date: {selectedCut.appointmentDate}</div>
      {/* <div>Barber: {selectedCut.barberId}</div> */}
  <div>Client: {user[0].firstName + " " + user[0].lastName}</div>
    </div>
  )
}

interface LinkStateProps {
  user: User[];
}

interface LinkDispatchToProps {
  // boundGetAllCuts: (user: User) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: RsProps
): LinkStateProps => ({
  // cuts: state.cut,
  user: state.user
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: RsProps
): LinkDispatchToProps => ({
  // boundGetAllCuts: bindActionCreators(boundGetAllCuts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSubmit);