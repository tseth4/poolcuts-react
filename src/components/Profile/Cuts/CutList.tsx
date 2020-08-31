import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./CutList.scss";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../store/types";
import { Cut } from "../../../store/types/Cut";
import { User } from "../../../store/types/User";
import { FBUser, FBUserAuthResponse } from "../../../store/types/FBUser";
import {
  boundGetOpenFacebookBarberCuts,
  boundGetOpenBarberCuts,
  boundCancelCutsByIdArr,
} from "../../../store/actions/CutActions";
import { AppState } from "../../../store";
import { CutComponent } from "./Cut";
import { SelectedIds } from "../../../store/types/SelectedIds";

import { Link } from "react-router-dom";

interface CutListProps {
  handleAddCutFormModal: () => void;
}

interface CutListState {}

type Props = CutListProps & LinkDispatchToProps & LinkStateProps & CutListProps;

const CutList: React.FC<Props> = ({
  cuts,
  boundGetOpenFacebookBarberCuts,
  boundGetOpenBarberCuts,
  fbUser,
  user,
  boundCancelCutsByIdArr,
  handleAddCutFormModal,
}: Props) => {
  let deleteDisabled: boolean = true;
  let currentUser: any = undefined;

  if (user !== undefined && user.length > 0) {
    currentUser = user[0];
  } else if (fbUser !== undefined && fbUser.length > 0) {
    currentUser = fbUser[0];
  }

  useEffect(() => {
    if (fbUser.length > 0 && fbUser != null) {
      boundGetOpenFacebookBarberCuts(fbUser[0]);
    } else if (user.length > 0 && user != null) {
      boundGetOpenBarberCuts(user[0]);
    }
  }, []);

  const [selectedCuts, setSelectedCuts] = useState<SelectedIds>({ ids: [] });
  const [localCuts, setLocalCuts] = useState<Cut[]>([]);

  useEffect(() => {
    setLocalCuts(cuts);
  }, [cuts]);

  const handleSetSelectedCuts = (id: number): void => {
    if (selectedCuts.ids.indexOf(id) == -1) {
      setSelectedCuts({ ids: [...selectedCuts.ids, id] });
    } else {
      setSelectedCuts({ ids: [...selectedCuts.ids.filter((i) => i != id)] });
    }
  };

  const cutListProps = {
    handleSetSelectedCuts: handleSetSelectedCuts,
    selectedCutsArr: selectedCuts.ids,
  };

  if (selectedCuts.ids.length > 0) {
    deleteDisabled = false;
  } else {
    deleteDisabled = true;
  }

  const handleClick = () => {
    boundCancelCutsByIdArr(selectedCuts, currentUser);
  };

  return (
    <React.Fragment>
      <div className="cutlist-container">
        <h1>Select open appointment</h1>
        <div className="cutlist-table">
          <div className="cutlist-table__row">
            <div className="cutlist-table__head">Date</div>
            <div className="cutlist-table__head">Time</div>
            <div className="cutlist-table__head">Barber</div>
            <div className="cutlist-table__head">Location</div>
          </div>
          {cuts
            .sort(
              (a: any, b: any) =>
                +new Date(a.appointmentDate) - +new Date(b.appointmentDate)
            )
            .map(
              ({ cutId, appointmentDate, barberId, location, fbBarberId }) => (
                <CutComponent
                  {...cutListProps}
                  key={cutId}
                  cutId={cutId}
                  appointmentDate={appointmentDate}
                  barberId={barberId}
                  fbBarberId={fbBarberId}
                  location={location}
                  // handleSelectedCut={handleSelectedCut}
                />
              )
            )}
        </div>
      </div>
      <div className="profile-container__item">
        <div className="cutlist-table-container__buttoncontainer">
          <button
            disabled={deleteDisabled}
            onClick={handleClick}
            type="submit"
            className="cutlist-button"
          >
            Delete
          </button>
          <button
            disabled={false}
            onClick={() => handleAddCutFormModal()}
            type="submit"
            className="cutlist-button"
          >
            Add
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

interface LinkStateProps {
  cuts: Cut[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

interface LinkDispatchToProps {
  boundGetOpenFacebookBarberCuts: (fbUser: FBUserAuthResponse) => void;
  boundGetOpenBarberCuts: (user: User) => void;
  boundCancelCutsByIdArr: (ids: SelectedIds, user: any) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutListProps
): LinkStateProps => ({
  cuts: state.openBarberCuts,
  user: state.user,
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CutListProps
): LinkDispatchToProps => ({
  boundGetOpenFacebookBarberCuts: bindActionCreators(
    boundGetOpenFacebookBarberCuts,
    dispatch
  ),
  boundGetOpenBarberCuts: bindActionCreators(boundGetOpenBarberCuts, dispatch),
  boundCancelCutsByIdArr: bindActionCreators(boundCancelCutsByIdArr, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CutList);
