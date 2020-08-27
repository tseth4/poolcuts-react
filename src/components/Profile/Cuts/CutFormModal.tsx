import React from "react";
import CutFormContainer from "../../CutForm/CutFormContainer";
import "./CutFormModal.scss";

interface CutFormModalProps {
  modalClass: any;
  setModalClass: any;
}

interface CutFormModalState {}

type Props = CutFormModalProps & CutFormModalState;

const CutEditFormModal: React.FC<Props> = ({
  modalClass,
  setModalClass,
}: Props) => {
  let overlayId = "overlay";
  let title = "";

  if (modalClass.type == "edit") {
    title = "edit cut";
  } else if (modalClass.type == "add") {
    title = "new cut";
  }

  const handleCloseModal = () => {
    setModalClass({ class: "cutform-modal", type: "" });
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
          <CutFormContainer modalClass={modalClass} />
        </div>
      </div>
      <div id={overlayId} className="cutform-modal__overlay"></div>
    </React.Fragment>
  );
};

export default CutEditFormModal;
