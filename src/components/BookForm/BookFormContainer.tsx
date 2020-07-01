import React, { useState } from 'react';
import { ServiceSelect } from './ServiceSelect';
import './BookForm.scss';

const BookFormContainer = () => {
  // Book b = new Book();

  const [form, setForm] = useState({});

  const handleSetForm = (key: string, value: any) => {
    setForm({...form, [key]: value});
  }

  let formProps = {
    handleSetForm: handleSetForm
  }

  return (
    <div className="bookform-container">
      <div className="bookform-container__inner">
        <form className="bookform-container__form">
          <ServiceSelect {...formProps} />
        </form>
      </div>
    </div>

  );
}

export default BookFormContainer;
