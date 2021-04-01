import React, { useState } from 'react';
import { useRef } from 'react';
import { useField, useFormikContext } from "formik";
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

import infoIcon from "../../assets/img/radio-info-icon.svg";

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

const CurrencyInput = (props) => {
  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext();
  const [field] = useField(props)

  const inputRef = useRef(null);

  const [state, updateState] = useState({
    value: field.value
  });

  const handleChange = (e) => {
    let value = e.target.value;
    // value = value.replace(/[^\x00-\x7F]+/ig, '');
    updateState({value: value});
    setFieldValue(field.name, value);
  }

  const handleFocus = (e) => {
    e.preventDefault();
    inputRef.current.focus();
  }

  return (
    <>
    <div className={`custom-input-wrapper ${getFieldCSSClasses(touched[field.name], errors[field.name])}`}>
      <span className="currency-input-icon">
        EUR
      </span>
      {
          props.tooltipText && (
            <Tooltip title={props.tooltipText} arrow={true} size={"regular"} className="input-info-icon currency-info-icon">
              <img id={"info-icon" + props.name} src={infoIcon} alt="input-icon" />
            </Tooltip>
          )
      }
      {
        props.icon && (
          <i className={props.icon}></i>
        )
      }
      <span onClick={handleFocus} className={state.value ? "custom-input-label has-value" : "custom-input-label"}>{props.label}</span>
      <input ref={inputRef} name={props.name} type={props.type} className="form-control" value={state.value || ""} onChange={handleChange} onBlur={() => setFieldTouched(props.name, true)} />
    </div>
    {
      props.feedbackLabel && (
        <div className="invalid-input-feedback">
          {touched[field.name] && errors[field.name]}
        </div>
      )
    }
    </>
  )
}

export default CurrencyInput;
