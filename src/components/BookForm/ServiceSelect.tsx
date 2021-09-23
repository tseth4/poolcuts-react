import { NewBooking } from "@store/types/Book";
import React from "react";
import "./ServiceSelect.scss";

interface Props {
  handleSetBookForm: (key: string, value: string) => void;
  bookForm: NewBooking;
}
const ServiceSelect: React.FC<Props> = ({
  handleSetBookForm,
  bookForm,
}: Props) => {

  const handleChange = (e: any) => {
    handleSetBookForm("category", e.target.name);
  };
  return (
    <React.Fragment>
      <div className="service-select">
        <h3>Services</h3>
        <div className="service-select__item">
          <div className="service-select__label">Haircut</div>
          <div className="service-select__details">
            <p>
              <b>$27.00</b> | 1h
            </p>
          </div>
          <div className="service-select__button">
            <input
              onChange={handleChange}
              type="checkbox"
              name="haircut"
              checked={bookForm.category == "haircut"}
            />
          </div>
        </div>
        <div className="service-select__item">
          <div className="service-select__label">Kids cut</div>
          <div className="service-select__details">
            <p>
              <b>$21.00</b> | 1h
            </p>
          </div>
          <div className="service-select__button">
            <input
              onChange={handleChange}
              type="checkbox"
              name="kidscut"
              checked={bookForm.category == "kidscut"}
            />
          </div>
        </div>
        <div className="service-select__item">
          <div className="service-select__label">Edgeup</div>
          <div className="service-select__details">
            <p>
              <b>$16.00</b> | 1h
            </p>
          </div>
          <div className="service-select__button">
            <input
              onChange={handleChange}
              type="checkbox"
              name="edgeup"
              checked={bookForm.category == "edgeup"}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServiceSelect;
