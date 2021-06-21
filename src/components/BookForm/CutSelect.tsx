import React, { useEffect } from "react";
import { setOpenCuts, cutError } from "../../store/slices/cutSlice";
import { logout, logoutSuccess } from "../../store/slices/authSlice";
import { CutComponent } from "./Cut";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { Cut } from "../../store/types/Cut";
import "./CutSelect.scss";
import { NewBooking } from "../../store/types/Book";
import { getAuth, getCuts } from "../../store/selectors/index";
import { getAllOpenCutsService } from "../../store/services/CutService";
import { IError } from "../../store/types/Error";

interface CutSelectProps {
  bookForm: NewBooking;
  handleSetBookForm: (key: string, value: any) => void;
  handleSelectedCut: (cut: Cut) => void;
}

interface CutSelectState {}

type Props = CutSelectProps & CutSelectState;

const CutSelect: React.FC<Props> = ({
  bookForm,
  handleSetBookForm,
  handleSelectedCut,
}: Props) => {
  const dispatch = useAppDispatch();

  const _setOpenCuts = (payload: Cut[]) => dispatch(setOpenCuts(payload));
  const _cutError = (payload: IError) => dispatch(cutError(payload));
  const _logoutSuccess = () => dispatch(logoutSuccess());

  // ===========================================================================
  // Selectors
  // ===========================================================================
  const { currentUser } = useSelector(getAuth);
  const { cuts } = useSelector(getCuts);

  useEffect(() => {
    if (currentUser) {
      getAllOpenCutsService()
        .then((res) => {
          console.log(res);
          _setOpenCuts(res);
        })
        .catch((e) => {
          _cutError(e.data);
          _logoutSuccess();
          console.log(e.data);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="cutselect-container">
        <h5 className="cutselect-container__header">Select open appointment</h5>
        <div className="cutselect-table">
          <div className="cutselect-table__row">
            <div className="cutselect-table__head">Date</div>
            <div className="cutselect-table__head">Time</div>
            <div className="cutselect-table__head">Barber</div>
            <div className="cutselect-table__head">Location</div>
          </div>
          {cuts
            .slice()
            .sort(
              (a: any, b: any) =>
                +new Date(a.appointmentDate) - +new Date(b.appointmentDate)
            )
            .map(
              ({ cutId, appointmentDate, barberId, location }) => (
                <CutComponent
                  bookForm={bookForm}
                  handleSetBookForm={handleSetBookForm}
                  key={cutId}
                  cutId={cutId}
                  appointmentDate={appointmentDate}
                  barberId={barberId}
                  location={location}
                  handleSelectedCut={handleSelectedCut}
                />
              )
            )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CutSelect;

// cutId: c.cutId,
// appointmentDate: c.appointmentDate,
// barberId: c.barberId,
// location: c.location,
// seatLeft: c.seatLeft
