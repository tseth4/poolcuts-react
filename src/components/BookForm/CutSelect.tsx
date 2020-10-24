import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetAllCuts } from "../../store/actions/CutActions";
import { Cut } from "../../store/types/Cut";
import { AppState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../store/types";
import { bindActionCreators } from "redux";
import { User } from "../../store/types/User";
import { CutComponent } from "./Cut";
import "./CutSelect.scss";
import { Book, NewBooking } from "../../store/types/Book";
import { FBUser, FBUserAuthResponse } from "../../store/types/FBUser";

interface CutSelectProps {
  cuts?: Cut[];
  handleSetForm: (key: string, value: string) => void;
  handleStep: () => void;
  form: NewBooking;
  handleSelectedCut: (cut: Cut) => void;
}

interface CutSelectState {}

type Props = CutSelectProps &
  LinkDispatchToProps &
  LinkStateProps &
  CutSelectState;

const CutSelect: React.FC<Props> = ({
  cuts,
  boundGetAllCuts,
  user,
  fbUser,
  handleSetForm,
  handleStep,
  form,
  handleSelectedCut,
}: Props) => {
  let cutsRender;

  useEffect(() => {
    if (user.length > 0 && user != null) {
      boundGetAllCuts(user[0]);
    } else if (fbUser.length > 0 && fbUser != null) {
      boundGetAllCuts(fbUser[0]);
    }
  }, []);

  console.log(cuts);

  return (
    <React.Fragment>
      <div className="cutselect-container">
      <h3>Select open appointment</h3>

        <div className="cutselect-table">
          <div className="cutselect-table__row">
            <div className="cutselect-table__head">Date</div>
            <div className="cutselect-table__head">Time</div>
            <div className="cutselect-table__head">Barber</div>
            <div className="cutselect-table__head">Location</div>
          </div>
            {cuts
              .sort(
                (a: any, b: any) =>
                  +new Date(a.appointmentDate) - +new Date(b.appointmentDate)
              )
              .map(
                ({
                  cutId,
                  appointmentDate,
                  barberId,
                  location,
                  fbBarberId,
                }) => (
                  <CutComponent
                    form={form}
                    handleStep={handleStep}
                    handleSetForm={handleSetForm}
                    key={cutId}
                    cutId={cutId}
                    appointmentDate={appointmentDate}
                    barberId={barberId}
                    fbBarberId={fbBarberId}
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

//specifies return value of mapStateToProps
interface LinkStateProps {
  cuts: Cut[];
  user: User[];
  fbUser: FBUserAuthResponse[];
}

//specifies return value of mapDispatchToProps
interface LinkDispatchToProps {
  boundGetAllCuts: (user: User | FBUser) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutSelectProps
): LinkStateProps => ({
  cuts: state.cut,
  user: state.user,
  fbUser: state.fbUser,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: CutSelectProps
): LinkDispatchToProps => ({
  boundGetAllCuts: bindActionCreators(boundGetAllCuts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CutSelect);

// cutId: c.cutId,
// appointmentDate: c.appointmentDate,
// barberId: c.barberId,
// location: c.location,
// seatLeft: c.seatLeft
