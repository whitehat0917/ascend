import React, { useState } from 'react';
import { useRef } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useField, useFormikContext } from "formik";

const getFieldCSSClasses = (touched, errors) => {
    const classes = [];
    if (touched && errors) {
      classes.push("is-invalid-input");
    }
  
    if (touched && !errors) {
      classes.push("is-valid-input");
    }
  
    return classes.join(" ");
};

const CustomPhoneInput = (props) => {

  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(props)
  const { touched, error } = meta;

  const datepickerRef = useRef(null);

  const [state, updateState] = useState({
    phone: field.value,
    countryCode: 'us'
  });

  const handleFocus = (e) => {
    e.preventDefault();
    datepickerRef.current.deferFocusInput()
  }
  const setPhone = (phone) => {
      updateState({phone});
      setFieldValue(field.name, '+' + phone);
  }
  return (
    <>
    <div className={`phone-input-wrapper custom-input-wrapper ${getFieldCSSClasses(touched, error)}`}>
        <span onClick={handleFocus} className={state.phone ? "custom-input-label has-value" : "custom-input-label"}>{props.label}</span>
        <PhoneInput
          country={ props.defaultCountry || 'us'}
          value={state.phone}
          onChange={phone => setPhone(phone)}
          onBlur={() => setFieldTouched(field.name, true)}
        />
    </div>
    {
      touched && error && (

        <div className="invalid-input-feedback">
          {error}
        </div>
      )
    }
    </>
  )
}

export default CustomPhoneInput;
