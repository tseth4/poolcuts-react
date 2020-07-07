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
import { Book } from "../../store/types/Book";

interface CutSelectProps {
  cuts?: Cut[];
  handleSetForm: (key: string, value: string) => void;
  handleStep: () => void;
  form: Book;
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
  handleSetForm,
  handleStep,
  form,
}: Props) => {
  let cutsRender;

  useEffect(() => {
    console.log(cuts);

    console.log(user);
    if (user.length > 0 || user != null) {
      boundGetAllCuts(user[0]);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="cutselect-container">
        {cuts.map(
          ({ cutId, appointmentDate, barberId, location, seatLeft }) => (
            <CutComponent
              form={form}
              handleStep={handleStep}
              handleSetForm={handleSetForm}
              key={cutId}
              cutId={cutId}
              appointmentDate={appointmentDate}
              barberId={barberId}
              location={location}
              seatLeft={seatLeft}
            />
          )
        )}
      </div>
    </React.Fragment>
  );
};

//specifies return value of mapStateToProps
interface LinkStateProps {
  cuts: Cut[];
  user: User[];
}

//specifies return value of mapDispatchToProps
interface LinkDispatchToProps {
  boundGetAllCuts: (user: User) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: CutSelectProps
): LinkStateProps => ({
  cuts: state.cut,
  user: state.user,
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
