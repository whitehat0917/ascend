import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker2';
import moment from 'moment';
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

const CustomDatePicker = (props) => {

  const { setFieldValue, setFieldTouched, errors, touched } = useFormikContext();
  const [field] = useField(props)

  const [state, updateState] = useState(field.value ? moment(field.value) : null);

  const datepickerRef = useRef(null);

  const handleFocus = (e) => {
    e.preventDefault();
    datepickerRef.current.deferFocusInput()
  }

  const setDate = (date) => {
    updateState(moment(date));
    setFieldTouched(props.name, true)
    setFieldValue(field.name, new Date(date));
  }
  return (
    <>
    <div className={`custom-datepicker-wrapper custom-input-wrapper ${getFieldCSSClasses(touched[field.name], errors[field.name])}`}>
        <span onClick={handleFocus} className={"has-value"}>{props.label}</span>
        <DatePicker
          ref={datepickerRef}
          showTodayButton={false}
          timePicker={false}
          inputFormat="DD/MM/YYYY"
          placeholder="DD/MM/YYYY"
          value={state}
          onBlur={() => setFieldTouched(props.name, true)}
          onChange={setDate}
        />
        <i className="date-picker-icon"></i>
    </div>
    {
      touched[field.name] && errors[field.name] && (
        <div className="invalid-datepicker-feedback">
          {errors[field.name]}
        </div>
      )
    }
    </>
  )
}

export default CustomDatePicker;
