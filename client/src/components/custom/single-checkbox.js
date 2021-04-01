import React from 'react';
import { useField, useFormikContext } from "formik";

const SingleCheckbox = ({
    label,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props)

    const handleChecked = (e) => {
        setFieldValue(field.name, e.target.checked);
    }

    return (
        <div className="custom-control custom-checkbox no-border" style={{margin : props.margin}}>
            <input type="checkbox" id={props.id} name={props.name} className="custom-control-input" onChange={handleChecked} />
            <label className="custom-control-label" htmlFor={props.id} dangerouslySetInnerHTML={{ __html: label }}>
            </label>
        </div>
    )
}

export default SingleCheckbox;
