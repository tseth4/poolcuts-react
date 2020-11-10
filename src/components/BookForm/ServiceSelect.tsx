import React, { useState } from "react";
import "./ServiceSelect.scss";
import { Book } from "../../store/types/Book";

interface Props {
  handleSetForm: (key: string, value: any) => void;
  handleStep: () => void;
  form: Book;
}
export const ServiceSelect: React.FC<Props> = ({
  form,
  handleSetForm,
  handleStep,
}: Props) => {
  const [check, setCheck] = useState(false);

  const handleChange = (e: any) => {
    console.log("hiii");
    handleSetForm("category", e.target.name);
    handleStep();
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
              checked={form.category == "haircut"}
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
              checked={form.category == "kidscut"}
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
              checked={form.category == "edgeup"}
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
