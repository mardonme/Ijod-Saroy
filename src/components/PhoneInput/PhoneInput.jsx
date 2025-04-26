import React, { useEffect, useState } from 'react';

const formatPhoneNumber = (numericValue) => {
  let formatted = '+998 (__) ___-__-__';
  let index = 0;
  for (let char of numericValue) {
    formatted = formatted.replace('_', char);
    index++;
  }
  return formatted;
};

const extractNumeric = (input) => {
  return input.replace(/[^\d]/g, '').replace(/^998/, '');
};

const PhoneInput = ({ defaultValue = '', required, disabled}) => {
  const [value, setValue] = useState('+998 (__) ___-__-__');
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      let numericValue = extractNumeric(defaultValue);
      numericValue = numericValue.slice(0, 9);
      setValue(formatPhoneNumber(numericValue));
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    setIsEdited(true);
    let input = e.target.value;
    let numericValue = extractNumeric(input);
    numericValue = numericValue.slice(0, 9);
    setValue(formatPhoneNumber(numericValue));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      setIsEdited(true);
      let input = value;
      let numericValue = extractNumeric(input);

      numericValue = numericValue.slice(0, -1);
      setValue(formatPhoneNumber(numericValue));
    }
  };

  return (
    <input
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
      name="phoneNumber"
      disabled={disabled}
      placeholder="+998 (__) ___-__-__"
      required={required}
    />
  );
};

export default PhoneInput;
