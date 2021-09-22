import React from "react";
import CutFormContainer from "@components/CutForm/CutFormContainer";
import "./CutFormModal.scss";

interface CutFormModalProps {
  modalClass: any;
  handleAddCutFormModal: (active: boolean) => void;
}

interface CutFormModalState {}

type Props = CutFormModalProps & CutFormModalState;

const CutEditFormModal: React.FC<Props> = ({
  modalClass,
  handleAddCutFormModal,
}: Props) => {
  let overlayId = "overlay";
  let title = "create cut";

  if (modalClass.class == "cutform-modal active") {
    overlayId = "overlay-active";
  }

  return (
    <React.Fragment>
      <div className={modalClass.class}>
        <div className="cutform-modal__header">
          <div className="cutform-modal__header-title">{title}</div>
          <button
            onClick={() => handleAddCutFormModal(false)}
            className="cutform-modal__close-button"
          >
            &times;
          </button>
        </div>
        <div className="cutform-modal__body">
          <CutFormContainer
            handleAddCutFormModal={handleAddCutFormModal}
            // modalClass={modalClass}
          />
        </div>
      </div>
      <div id={overlayId} className="cutform-modal__overlay"></div>
    </React.Fragment>
  );
};

export default CutEditFormModal;
