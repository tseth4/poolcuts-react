import React from 'react';
import ServiceSelect from './ServiceSelect';
import './BookForm.scss';
const BookFromContainer = () => {
  return (
    <div className="bookform-container">
      <div className="bookform-container__inner">
        <form className="bookform-container__form">
          <ServiceSelect/>
        </form>
      </div>
    </div>

  );
}

export default BookFromContainer;
