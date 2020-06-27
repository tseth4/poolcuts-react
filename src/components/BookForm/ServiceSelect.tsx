import React, { useState } from 'react';
import './ServiceSelect.scss';

export default function ServiceSelect() {
  const [service, setService] = useState('');

  function handleChange(value: string) {
    console.log(value);
  }
  return (
    <div className="service-select">
      <div className="service-select__item">
        <div className="service-select__label"><p>haircut</p></div>
        <div className="service-select__details">
          <p>$26.00 | <b>1h</b></p>
        </div>
        <div className="service-select__button" onClick={() => handleChange("taper")}><p>BOOK</p></div>
      </div>
      <div className="service-select__item">
        <div className="service-select__label">kidscut</div>
        <div className="service-select__details">
          <p>$21.00 | <b>1h</b></p>
          {/* <p>1h</p> */}
        </div>
        <div className="service-select__button" onClick={() => handleChange("beard")}><p>BOOK</p></div>
      </div>
      <div className="service-select__item">
        <div className="service-select__label">edge up</div>
        <div className="service-select__details">
          <p>$15.00 | <b>20m</b></p>
          {/* <p>20m</p> */}
        </div>
        <div className="service-select__button" onClick={() => handleChange("fade")}><p>BOOB</p></div>
      </div>
      {/* <input></input>
      <label>Beard</label>
      <label>Fade</label>
      <label>Fade + Beard Trim</label> */}
    </div>
  )
}
