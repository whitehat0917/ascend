import React from 'react';
import { useField, useFormikContext } from "formik";

const Checkbox = ({
    label,
    ...props
}) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    const handleChecked = (e) => {
        const set = new Set(field.value);
        if (set.has(props.value)) {
          set.delete(props.value);
        } else {
          set.add(props.value);
        }
        setFieldValue(field.name, Array.from(set));
    }

    return (
        <div className="custom-control custom-checkbox" style={{margin : props.margin}}>
            <input type="checkbox" id={props.id} name={props.name} className="custom-control-input" defaultChecked={props.checked} onChange={handleChecked} />
            <label className="custom-control-label" htmlFor={props.id}>
                {label}
            </label>
        </div>
    )
}

export default Checkbox;
