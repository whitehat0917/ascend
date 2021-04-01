
import React, { useState, useRef } from 'react';
import Select from 'react-select';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import { useField, useFormikContext } from "formik";

import infoIcon from "../../assets/img/radio-info-icon.svg";

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push("is-invalid-select");
  }

  if (touched && !errors) {
    classes.push("is-valid-select");
  }

  return classes.join(" ");
};

const langList = [
  { "code": "GB", "name": "English", "label": "English" },
  { "code": "ES", "name": "Spanish", "label": "Spanish" },
  { "code": "DE", "name": "Germany", "label": "Germany" }
];

const formatOptionLabel = (option) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img src={`/assets/img/flags/${option.code.toLowerCase()}.svg`} alt={option.code} width={20} height={20} className="mr-2" />
    <div>{option.label}</div>
  </div>
);

const LanguagePicker = ({
  label,
  children,
  defaultLanguage,
  ...props
}) => {

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props)
  const { touched, error } = meta;

  const selectRef = useRef(null);
  const [state, updateState] = useState({
    selectedOption: langList.find((c) => c.code.toLowerCase() === defaultLanguage)
  });

  const handleChange = selectedOption => {
    updateState({ ...state, selectedOption: selectedOption });
    setFieldValue(field.name, selectedOption.label);
  }

  const handleFocus = (e) => {
    e.preventDefault();
    selectRef.current.onMenuOpen();
    selectRef.current.focus();
  }

  const customStyles = {
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: "0.5rem",
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: "0",
      textAlign: "left",
      " li": {
        // Overwrittes the different states of border
        backgroundColor: "red"
      }
    })
  };

  return (
    <div className={`select-wrapper country-picker ${props.tooltipText ? "tooltip-picker" : ""} ${getFieldCSSClasses(touched, error)}`}>
      <span className={`select-label ${state.selectedOption != null ? 'active' : ''}`} onClick={handleFocus}>
        {label}
      </span>
      {
        props.tooltipText && (
          <Tooltip title={props.tooltipText} arrow={true} size={"regular"} className="input-info-icon">
            <img id={"info-icon" + props.name} src={infoIcon} alt="input-icon" />
          </Tooltip>
        )
      }
      <Select
        formatOptionLabel={formatOptionLabel}
        ref={selectRef}
        getOptionLabel={label => label}
        getOptionValue={code => code}
        value={state.selectedOption}
        onChange={handleChange}
        options={langList}
        placeholder=""
        styles={customStyles}
      />
    </div>
  )
}

export default LanguagePicker;
