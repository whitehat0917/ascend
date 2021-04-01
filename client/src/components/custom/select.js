import React, { useState, useRef } from 'react';
import { useField, useFormikContext } from "formik";
import Select from 'react-select';

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

const SelectBox = ({
    label,
    options,
    children,
    selectedValue,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props)
    const { touched, error } = meta;

    const selectRef = useRef(null);
    const [state, updateState] = useState({
        selectedOption: selectedValue ? options.find(item => item.value === selectedValue) : null
    });

    const handleChange = selectedOption => {
        updateState({ ...state, selectedOption: selectedOption });
        setFieldValue(field.name, selectedOption.value);
        if (props.handleChange)
            props.handleChange(selectedOption);
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
          textAlign: "left"
        })
      };

    return (
        <div className={`select-wrapper ${getFieldCSSClasses(touched, error)}`}>
            <span className={`select-label ${state.selectedOption != null ? 'active' : ''}`} onClick={handleFocus}>
                {label}
            </span>
            <Select
                name={field.name}
                ref={selectRef}
                value={state.selectedOption}
                onChange={handleChange}
                options={options}
                placeholder=""
                styles={customStyles}
            />
        </div>
    )
}

export default SelectBox;
