import React, { useState, useEffect } from 'react';

const PhoneInput = ({ defaultValue = '', required }) => {
  const formatPhone = (value) => {
    let numericValue = value.replace(/[^\d]/g, '');

    // Agar 998 bilan boshlansa, uni olib tashlaymiz
    if (numericValue.startsWith('998')) {
      numericValue = numericValue.slice(3);
    } else if (numericValue.length === 12 && numericValue.startsWith('+998')) {
      numericValue = numericValue.slice(4);
    }

    // 9 ta raqamdan ortig‘ini olmaymiz
    numericValue = numericValue.slice(0, 9);

    let formatted = '+998 (__) ___-__-__';
    for (let char of numericValue) {
      formatted = formatted.replace('_', char);
    }
    return formatted;
  };

  const [value, setValue] = useState(formatPhone(defaultValue));

  useEffect(() => {
    setValue(formatPhone(defaultValue));
  }, [defaultValue]);

  const handleChange = (e) => {
    let input = e.target.value;
    let numericValue = input.replace(/[^\d]/g, '');
    if (numericValue.startsWith('998')) {
      numericValue = numericValue.slice(3);
    }
    numericValue = numericValue.slice(0, 9);
    let formatted = '+998 (__) ___-__-__';
    for (let char of numericValue) {
      formatted = formatted.replace('_', char);
    }
    setValue(formatted);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      let numericValue = value.replace(/[^\d]/g, '');
      numericValue = numericValue.slice(0, -1);
      let formatted = '+998 (__) ___-__-__';
      for (let char of numericValue) {
        formatted = formatted.replace('_', char);
      }
      setValue(formatted);
    }
  };

  return (
    <div className="input-value">
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        name='phoneNumber'
        placeholder='+998 (__) ___-__-__'
        required={required}
        // style={{ margin: '0 10px', width: '100%' }}
      />
    </div>
  );
};

export default PhoneInput;
