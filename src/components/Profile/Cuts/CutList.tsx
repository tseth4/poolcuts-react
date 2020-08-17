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
  user,
  boundCancelCutsByIdArr
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

  const handleSetSelectedCuts = (id: number): void => {
    console.log("id:       " + id);
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

  if(selectedCuts.ids.length > 0){
    deleteDisabled = false;
  } else {
    deleteDisabled = true;
  }

  const handleClick = () => {
    console.log("handleclickss")
    boundCancelCutsByIdArr(selectedCuts, currentUser);
  }


  // select the cuts and add it the array
  // if array is not empty show the delete button
  // when pressed boundDeleteCuts

  console.log(cuts);
  return (
    <React.Fragment>
      <div className="cutlist-container">
        <h1>Your open appointments</h1>
        <div className="cutlist-table-container">
          <table className="cutlist-table">
            <thead className="cutlist-table__head">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Barber</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody className="cutlist-table__body">
              {cuts.map(
                ({
                  cutId,
                  appointmentDate,
                  barberId,
                  location,
                  fbBarberId,
                }) => (
                  <CutComponent
                    // form={form}
                    // handleStep={handleStep}
                    // handleSetForm={handleSetForm}
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
            </tbody>
          </table>
          <div className="cutlist-table-container__buttoncontainer">
            <button disabled={deleteDisabled} onClick={handleClick} type="submit" className="cutlist-button">
              Delete
            </button>
            <button disabled={true} type="submit" className="cutlist-button">
              Add
            </button>
          </div>
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
  cuts: state.cut,
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
