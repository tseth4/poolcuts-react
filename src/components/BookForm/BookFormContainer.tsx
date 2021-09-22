import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "@store/selectors/index";
import { createHashHistory } from "history";

// import { getBooks } from "@store/selectors/index";
import ServiceSelect from "./ServiceSelect";
import CutSelect from "./CutSelect";
import ReviewSubmit from "./ReviewSubmit";
import "./BookForm.scss";
import { NewBooking } from "@store/types/Book";
import { Cut } from "@store/types/Cut";
import { bookAppointmentService } from "@store/services/BookService";
import { IError } from "@store/types/Error";
import { Redirect } from "react-router-dom";

// import { useAppDispatch } from "@store";
// import { setBooks } from "@store/slices/bookSlice";
// import { IError } from "@store/types/Error";
// import { isEmpty } from "../../utils/Functions";

interface BookFormContainerProps {}

interface BookFormContainerState {}

type Props = BookFormContainerProps & BookFormContainerState;

const BookFormContainer: React.FC<Props> = ({}: Props) => {
  interface BookStatus {
    success?: boolean;
    error?: IError;
  }



  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { currentUser } = useSelector(getAuth);

  // ===========================================================================
  // States
  // ===========================================================================

  const [selectedCut, setSelectedCut] = useState<Cut>({});
  const [bookForm, setBookForm] = useState<NewBooking>({});
  const [bookStatus, setBookStatus] = useState<BookStatus>({
    success: undefined,
    error: undefined,
  });

  // ===========================================================================
  // Handelers
  // ===========================================================================

  // When a cut is selected the cut component is setting selected cut and cutId in bookForm
  // these handle methods are handling selecting and unSelecting cut

  const handleSelectedCut = (cut: Cut) => {
    if (cut.cutId == selectedCut.cutId) {
      setSelectedCut({});
    } else {
      setSelectedCut(cut);
    }
  };

  const handleSetBookForm = (key: string, value: any) => {
    if (key == "cutId" && bookForm[key] == value) {
      setBookForm({ ...bookForm, [key]: undefined });
    } else {
      setBookForm({ ...bookForm, [key]: value });
    }
  };

  // handle setting clientId in bookForm of type NewBooking

  useEffect(() => {
    setBookForm({ ...bookForm, clientId: currentUser?.id });
  }, [currentUser]);

  useEffect(() => {
    console.log(bookForm);
  }, [bookForm]);

  let bookFormProps = {
    bookForm: bookForm,
    handleSetBookForm: handleSetBookForm,
  };

  // handle button
  let buttonDisable: boolean = true;
  let buttonClass: string = "bookform-container__button";

  if (
    bookForm.category == undefined ||
    (bookForm.clientId == undefined && bookForm.fbClientId == undefined) ||
    bookForm.cutId == undefined
  ) {
    buttonDisable = true;
    buttonClass = "bookform-container__button disabled";
  } else {
    buttonDisable = false;
    buttonClass = "bookform-container__button";
  }

  // handle appointment booking

  const handleBookAppointment = (event: any) => {
    event.preventDefault();
    console.log("handle booking");
    if (currentUser != undefined) {
      bookAppointmentService(bookForm, currentUser)
        .then((res) => {
          setBookStatus({ ...bookStatus, success: true });
        })
        .catch((e) => {
          console.log(e.data);
          setBookStatus({
            ...bookStatus,
            success: false,
            error: e.data,
          });
        });
    }
  };

  // handle success message
  // the bookError starts empty
  // when we submit and theres an error its not empty
  // when we submit with no error it clears and its empty
  // boolean to know when we submit and therest no error
  // we can create state with bookSuccess boolean\ which starts at false
  // on unmount it clears it

  if (bookStatus.success){
    return <Redirect to='/profile'/>
  }

  return (
    <div className="bookform-container">
      <div className="bookform-container__form-container">
        <form
          onSubmit={handleBookAppointment}
          className="bookform-container__form"
        >
          <ServiceSelect {...bookFormProps} />
          <CutSelect handleSelectedCut={handleSelectedCut} {...bookFormProps} />
          <ReviewSubmit selectedCut={selectedCut} {...bookFormProps} />
          <div className="bookform-container__submit-container">
            <button
              disabled={buttonDisable}
              type="submit"
              className={buttonClass}
            >
              Book
            </button>
          </div>
          <div>
            {bookStatus.error != undefined &&
            bookStatus.error.message != undefined &&
            bookStatus.success != undefined
              ? bookStatus.error.message
              : bookStatus.error != undefined &&
                bookStatus.error.message == undefined &&
                bookStatus.success != undefined
              ? "booking error"
              : ""}
          </div>
        </form>
      </div>
      <div className="bookform-container__pselect"></div>
    </div>
  );
};

export default BookFormContainer;
