import React from "react";
import CutFormContainer from "../../CutForm/CutFormContainer";
import "./CutFormModal.scss";
import { Cut } from "../../../store/types/Cut";

interface CutFormModalProps {
  modalClass: any;
  setModalClass: any;
}

interface CutFormModalState {}

type Props = CutFormModalProps & CutFormModalState;

const CutEditFormModal: React.FC<Props> = ({
  modalClass,
  setModalClass
}: Props) => {
  let overlayId = "overlay";
  let title = "New";

  const handleCloseModal = () => {
    setModalClass({ class: "cutform-modal"});
  };

  if (modalClass.class == "cutform-modal active") {
    overlayId = "overlay-active";
  }

  return (
    <React.Fragment>
      <div className={modalClass.class}>
        <div className="cutform-modal__header">
          <div className="cutform-modal__header-title">{title}</div>
          <button
            onClick={handleCloseModal}
            className="cutform-modal__close-button"
          >
            &times;
          </button>
        </div>
        <div className="cutform-modal__body">
          <CutFormContainer  
            handleCloseModal={handleCloseModal}
          // modalClass={modalClass} 
          />
        </div>
      </div>
      <div id={overlayId} className="cutform-modal__overlay"></div>
    </React.Fragment>
  );
};

export default CutEditFormModal;
