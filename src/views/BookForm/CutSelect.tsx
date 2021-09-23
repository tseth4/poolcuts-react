import { useAppDispatch } from "@store/index";
import { getAllOpenCutsService } from "@store/mockServices/CutService/Cut.service";
import { getAuth, getCuts } from "@store/selectors/index";
import { logoutSuccess } from "@store/slices/authSlice";
import { cutError, setOpenCuts } from "@store/slices/cutSlice";
import { NewBooking } from "@store/types/Book";
import { Cut } from "@store/types/Cut";
import { IError } from "@store/types/Error";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CutComponent } from "./Cut";
import "./CutSelect.scss";

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

          _setOpenCuts(res);
        })
        .catch((e) => {
          _cutError(e.data);
          _logoutSuccess();
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
