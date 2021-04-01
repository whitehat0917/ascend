import React from 'react';
// import Tooltip from 'react-tooltip-lite';
import { useField, useFormikContext } from "formik";
import {
    Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

import infoIcon from "../../assets/img/radio-info-icon.svg";

const Radio = ({
    label,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props)
    // const { touched, error } = meta;

    const handleChecked = (e) => {
        setFieldValue(field.name, props.value);
        if (props.handleChange) {
            props.handleChange(props.value);
        }
    }

    return (
        <div className="custom-control custom-radio" style={{margin : props.margin}}>
            <input type="radio" id={props.id} name={props.name} className="custom-control-input" defaultChecked={props.checked} onChange={handleChecked} />
            <label className="custom-control-label" htmlFor={props.id}>
                {label}
            </label>
            {
                props.info && (
                    <Tooltip title={props.tooltipText} arrow={true} size={"regular"}>
                        <img id={"info-icon" + props.id} src={infoIcon} className="radio-info-icon" alt="radio-icon" />
                    </Tooltip>
                )
            }
        </div>
    )
}

export default Radio;
