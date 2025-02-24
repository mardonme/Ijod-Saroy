import React, { useState, useEffect } from 'react'
import './InputValue.css'

const InputValue = ({ name, type, placeholder, defaultValue, disabled, icon, required}) => {
    const [value, setValue] = useState(defaultValue || '');
    useEffect(() => {
        if (defaultValue !== undefined && defaultValue !== null) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    return (
        <div className="input-value">
            <input 
                value={value} 
                onChange={(e) => setValue(e.target.value.trimStart())} 
                style={value.trim() !== "" ? { borderColor: 'green' } : {}} 
                type={type} 
                name={name} 
                placeholder=''
                required={required || false} 
                disabled={disabled} 
            />
            <label><i className={`fa-solid ${icon}`}></i> {placeholder}</label>
        </div>
    );
}

export default InputValue;
