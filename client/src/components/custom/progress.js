import React from 'react';

import { ProgressBackground, ProgressBar } from "./styles";

const Progress = (props) => {

	return (
		<ProgressBackground>
            <ProgressBar width={100-props.value + "%"}></ProgressBar>
        </ProgressBackground>
	)
}

export default Progress;
