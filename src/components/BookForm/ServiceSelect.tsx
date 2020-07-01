import React from 'react';
import './ServiceSelect.scss';

interface Props {
  handleSetForm: (key: string, value: string) => void;
}
export const ServiceSelect: React.FC<Props> = ({ handleSetForm }: Props) => {

  function handleChange(value: string) {
    handleSetForm("category", value);
  }
  return (
    <div className="service-select">
      <h3>Services</h3>
      <div className="service-select__item">
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
          {/* <p>1h</p> */}
        </div>
        <div className="service-select__button" onClick={() => handleChange("kidscut")}><p>BOOK</p></div>
      </div>
      <div className="service-select__item">
        <div className="service-select__label"><p>Edge up</p></div>
        <div className="service-select__details">
          <p><b>$15.00</b> | 20m</p>
          {/* <p>20m</p> */}
        </div>
        <div className="service-select__button" onClick={() => handleChange("edgeup")}><p>BOOB</p></div>
      </div>
      {/* <input></input>
      <label>Beard</label>
      <label>Fade</label>
      <label>Fade + Beard Trim</label> */}
    </div>
  )
}
