import React, { useState } from "react";
import "./ServiceSelect.scss";
import { Book, NewBooking } from "@store/types/Book";

interface Props {
  handleSetBookForm: (key: string, value: string) => void;
  bookForm: NewBooking;
}
const ServiceSelect: React.FC<Props> = ({
  handleSetBookForm,
  bookForm,
}: Props) => {
  // const [check, setCheck] = useState(false);

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

        {/* <div className="service-select__item">
        <div className="service-select__label"><p>Haircut</p></div>
        <div className="service-select__details">
          <p><b>$26.00</b> | 1h</p>
        </div>
        <div className="service-select__button" onClick={() => handleChange("haircut")}><p>BOOK</p></div>
      </div>
      <div className="service-select__item">
        <div className="service-select__label"><p>Kidscut</p></div>
        <div className="service-select__details">
          <p><b>$21.00</b> | 1h</p>
        </div>
        <div className="service-select__button" onClick={() => handleChange("kidscut")}><p>BOOK</p></div>
      </div>
      <div className="service-select__item">
        <div className="service-select__label"><p>Edge up</p></div>
        <div className="service-select__details">
          <p><b>$15.00</b> | 20m</p>
        </div>
        <div className="service-select__button" onClick={() => handleChange("edgeup")}><p>BOOB</p></div>
      </div> */}
      </div>
    </React.Fragment>
  );
};

export default ServiceSelect;
