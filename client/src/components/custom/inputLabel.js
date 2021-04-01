import React from 'react';

import { Text } from "./styles";

const InputLabel = (props) => {

	return (
		<div className={`input-description ${props.class ? props.class : ""}`}>
			<Text fontSize="11px" margin="0 0 0 12px" align="left" color={props.color? props.color : ""}>
				{props.text}
			</Text>
		</div>
	)
}

export default InputLabel;
