import React, { useEffect, useState } from "react";

// selectors for geting the state
import { useSelector } from "react-redux";
import { getAuth, getCuts } from "@store/selectors/index";

// dispatches for setting the state
import { useAppDispatch } from "@store/index";
import { cutError, setOpenCuts } from "@store/slices/cutSlice";

// services for fetching data
import {
  getOpenBarberCuts,
  deleteCutsByIdsArr,
} from "@store/services/CutService";

import "./CutList.scss";

import { CutComponent } from "./Cut";
import { SelectedIds } from "@store/types/SelectedIds";
import { Cut } from "@store/types/Cut";
import { User } from "@store/types/Auth";
import { IError } from "@store/types/Error";

// parent: profile container

interface CutListProps {
  handleAddCutFormModal: (active: boolean) => void;
  currentUser: User;
}

interface CutListState {}

type Props = CutListProps & CutListProps;

const CutList: React.FC<Props> = ({
  handleAddCutFormModal,
  currentUser,
}: Props) => {
  let deleteDisabled: boolean = true;

  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { cuts, error, loading } = useSelector(getCuts);
  let cutsForSort = [...cuts];

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useAppDispatch();
  const _setOpenCuts = (payload: Cut[]) => dispatch(setOpenCuts(payload));
  const _cutError = (payload: IError) => dispatch(cutError(payload));

  const [selectedCuts, setSelectedCuts] = useState<SelectedIds>({ ids: [] });
  const [localCuts, setLocalCuts] = useState<Cut[]>([]);

  useEffect(() => {
    if (currentUser)
      getOpenBarberCuts(currentUser)
        .then((res) => {
          console.log(res);
          _setOpenCuts(res);
        })
        .catch((err) => {
          _cutError(err);
        });
  }, []);

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

  console.log(selectedCuts);

  const handleClick = () => {
    // Delete cuts if
    deleteCutsByIdsArr(selectedCuts)
      .then((res) => {
        window.location.reload()
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    setSelectedCuts({ ids: [] });
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
          {cutsForSort
            .sort(
              (a: any, b: any) =>
                +new Date(a.appointmentDate) - +new Date(b.appointmentDate)
            )
            .map(({ cutId, appointmentDate, barberId, location }) => (
              <CutComponent
                {...cutListProps}
                key={cutId}
                cutId={cutId}
                appointmentDate={appointmentDate}
                barberId={barberId}
                location={location}
              />
            ))}
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
            onClick={() => handleAddCutFormModal(true)}
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

export default CutList;
