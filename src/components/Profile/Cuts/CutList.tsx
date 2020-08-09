import React, { useEffect } from 'react';
import { connect } from "react-redux";
import "./CutList.scss";
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../store/types';
import { Cut } from '../../../store/types/Cut';
import { User } from '../../../store/types/User';
import { FBUser, FBUserAuthResponse } from '../../../store/types/FBUser';
import { boundGetOpenFacebookBarberCuts, boundGetOpenBarberCuts } from '../../../store/actions/CutActions';
import { AppState } from '../../../store';
import { CutComponent } from "./Cut"

interface CutListProps {
  // cuts?: Cut[];
}

interface CutListState {}

type Props = CutListProps & LinkDispatchToProps & LinkStateProps & CutListProps;

const CutList: React.FC<Props> = ({
  cuts,
  boundGetOpenFacebookBarberCuts,
  boundGetOpenBarberCuts,
  fbUser,
  user
}: Props) => {

  useEffect(() => {
    if (fbUser.length > 0 && fbUser != null){
      boundGetOpenFacebookBarberCuts(fbUser[0]);
    } else if (user.length > 0 && user != null){
      boundGetOpenBarberCuts(user[0]);
    }
  }, []);
  console.log(cuts);

  console.log(cuts);
  return (
    <React.Fragment>
      <div className="cutselect-container">
        <h1>Your open appointments</h1>
        <table className="cutselect-table">
          <thead className="cutselect-table__head">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Barber</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody className="cutselect-table__body">
            {cuts.map(({ cutId, appointmentDate, barberId, location, fbBarberId }) => (
              <CutComponent
                // form={form}
                // handleStep={handleStep}
                // handleSetForm={handleSetForm}
                key={cutId}
                cutId={cutId}
                appointmentDate={appointmentDate}
                barberId={barberId}
                fbBarberId={fbBarberId}
                location={location}
                // handleSelectedCut={handleSelectedCut}
              />
            ))}
          </tbody>
        </table>
        <button>create new open cut</button>
      </div>
    </React.Fragment>
  );
}

interface LinkStateProps {
  cuts: Cut[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundGetOpenFacebookBarberCuts: (fbUser: FBUserAuthResponse) => void;
  boundGetOpenBarberCuts: (user: User) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutListProps
): LinkStateProps => ({
  cuts: state.cut,
  user: state.user,
  fbUser: state.fbUser
})

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CutListProps
): LinkDispatchToProps => ({
  boundGetOpenFacebookBarberCuts: bindActionCreators(boundGetOpenFacebookBarberCuts, dispatch),
  boundGetOpenBarberCuts: bindActionCreators(boundGetOpenBarberCuts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CutList);
