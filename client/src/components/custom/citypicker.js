
import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from "formik";
import axios from 'axios';

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


const formatOptionLabel = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{marginTop: '0.3rem'}}>{option.name}</div>
    </div>
);

const CityPicker = ({
	label,
	children,
	country,
	...props
}) => {
	const defaultCountry = {};
	const getCities = (country) => {
		axios.post("https://my.everestcm.com/rest/dict/cities?version=1.0.0",
			{
				'country': country,
			},
			{ headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer MTUwNzlkNmQ5MTJmNGI2MWU2ZWRkOGJjMmQ1M2QwOGViZWY1NGRiYTg5YjNjODhiMTY4Nzc3OWVkNjBjOGEyMw',
				}}
			)
			.then((res) => {
				setCityList(res.data)
			})
			.catch((err) => {
				setCityList([])
			})
	}
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props)
	const { touched, error } = meta;
	const [cityList, setCityList] = useState([
		{
			"name": "Augsburg"
		},
		{
			"name": "Berlin"
		},
		{
			"name": "Bielefeld"
		},
		{
			"name": "Bonn"
		},
		{
			"name": "Braunschweig"
		},
		{
			"name": "Bremen"
		},
		{
			"name": "Bremerhaven"
		},
		{
			"name": "Chemnitz"
		},
		{
			"name": "Coburg"
		},
		{
			"name": "Cologne"
		},
		{
			"name": "Cottbus"
		},
		{
			"name": "Dortmund"
		},
		{
			"name": "Dresden"
		},
		{
			"name": "Duisburg"
		},
		{
			"name": "Düsseldorf"
		},
		{
			"name": "Emden"
		},
		{
			"name": "Erfurt"
		},
		{
			"name": "Essen"
		},
		{
			"name": "Flensburg"
		},
		{
			"name": "Frankfurt"
		},
		{
			"name": "Freiburg"
		},
		{
			"name": "Furth"
		},
		{
			"name": "Gera"
		},
		{
			"name": "Giessen"
		},
		{
			"name": "Gottingen"
		},
		{
			"name": "Hamburg"
		},
		{
			"name": "Hannover"
		},
		{
			"name": "Heidelberg"
		},
		{
			"name": "Hof"
		},
		{
			"name": "Ingolstadt"
		},
		{
			"name": "Jena"
		},
		{
			"name": "Karlsruhe"
		},
		{
			"name": "Kassel"
		},
		{
			"name": "Kiel"
		},
		{
			"name": "Koblenz"
		},
		{
			"name": "Leipzig"
		},
		{
			"name": "Lubeck"
		},
		{
			"name": "Magdeburg"
		},
		{
			"name": "Mainz"
		},
		{
			"name": "Mannheim"
		},
		{
			"name": "Munich"
		},
		{
			"name": "Münster"
		},
		{
			"name": "Nürnberg"
		},
		{
			"name": "Oldenburg"
		},
		{
			"name": "Osnabrück"
		},
		{
			"name": "Potsdam"
		},
		{
			"name": "Regensburg"
		},
		{
			"name": "Rosenheim"
		},
		{
			"name": "Rostock"
		},
		{
			"name": "Saarbrucken"
		},
		{
			"name": "Schwerin"
		},
		{
			"name": "Stralsund"
		},
		{
			"name": "Stuttgart"
		},
		{
			"name": "Ulm"
		},
		{
			"name": "Wiesbaden"
		},
		{
			"name": "Wuppertal"
		},
		{
			"name": "Wurzburg"
		}
	]);
	const [state, updateState] = useState({
		selectedOption: cityList.find((c) => c.name.toLowerCase() === defaultCountry.name)
	});

    const selectRef = useRef(null);
	useEffect(() =>
	{
		getCities(country)
		//if (defaultCountry.name)
		//	setFieldValue(field.name, state.selectedOption.name.toLowerCase());
	}, [defaultCountry.name]
	)

    const handleChange = selectedOption => {
      updateState({ ...state, selectedOption: selectedOption });
	  setFieldValue(field.name, selectedOption.name.toLowerCase());
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
	        zIndex: "101"
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

	const customFilter = (candidate, searchText) => {
		if (searchText) {
			return candidate.data.name.toLowerCase().includes(searchText.toLowerCase());
		}
		return true;
	  }

    return (
        <div className={`select-wrapper country-picker ${getFieldCSSClasses(touched, error)}`}>
          <span className={`select-label ${state.selectedOption != null ? 'active' : ''}`} onClick={handleFocus}>
              {label}
          </span>
          <Select
            formatOptionLabel={formatOptionLabel}
			ref={selectRef}
            getOptionLabel={name => name}
			getOptionValue={name => name}
			filterOption={customFilter}
            value={state.selectedOption}
            onChange={handleChange}
            options={cityList}
            placeholder=""
            styles={customStyles}
          />
        </div>
    )
}

export default CityPicker;
