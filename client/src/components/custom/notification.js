import React, { useState } from 'react';

import closeIcon from "../../assets/img/close-black-icon.svg";
import { Alert, CloseAlertButton, Text, AlertButton } from "./styles";

const Notification = (props) => {
	const [state, updateState] = useState({
		show: true
	});

	const hideNotification = () => {
		updateState({ ...state, show: false });
	}

	const clickPath = (path) => {
		props.history.push(path);
	}

	return (
		<div className={`${state.show ? '' : 'hide'}`} style={{ minHeight: `15vh` }}>
			<Alert>
				<CloseAlertButton src={closeIcon} onClick={(e) => hideNotification()} />
				<Text className={props.buttons ? "col-md-6" : ""} fontSize="12px" fontFamily="Montserrat" lineHeight="19px" dangerouslySetInnerHTML={{
					__html: props.text
				}}>
				</Text>
				{
					props.buttons &&
					(
						<div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
							{props.buttons.map((item, index) => (
								<div key={index}>
									<AlertButton onClick={(e) => clickPath(item.path)}>
										<img src={item.icon} alt="button icon" />
										{item.title}
									</AlertButton>
								</div>
							))}
						</div>
					)
				}
			</Alert>
		</div>
	)
}

export default Notification;
