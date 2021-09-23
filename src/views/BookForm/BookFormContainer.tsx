import { bookAppointmentService } from "@store/mockServices/BookService/Book.service";
import { getAuth } from "@store/selectors/index";
import { NewBooking } from "@store/types/Book";
import { Cut } from "@store/types/Cut";
import { IError } from "@store/types/Error";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./BookForm.scss";
import CutSelect from "./CutSelect";
import ReviewSubmit from "./ReviewSubmit";
import ServiceSelect from "./ServiceSelect";


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


  const handleBookAppointment = (event: any) => {
    event.preventDefault();
    if (currentUser != undefined) {
      bookAppointmentService(bookForm, currentUser)
        .then((res) => {
          setBookStatus({ ...bookStatus, success: true });
        })
        .catch((e) => {
          setBookStatus({
            ...bookStatus,
            success: false,
            error: e.data,
          });
        });
    }
  };


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
