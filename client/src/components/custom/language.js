
import React, { useState } from 'react';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const langList = [
	{ "code": "GB", "name": "English", "label": "English" },
	{ "code": "ES", "name": "Español", "label": "Español" },
	{ "code": "PT", "name": "Português", "label": "Português" },
	{ "code": "CN", "name": "普通话", "label": "普通话" },
	{ "code": "FR", "name": "Français", "label": "Français" },
	{ "code": "DE", "name": "Deutsche", "label": "Deutsche" }
];

const Language = ({
	label,
	children,
	defaultLanguage,
	...props
}) => {
	const [state, updateState] = useState({
		isShow: false
	});
	const [selectedOption, setSelectedOption] = useState(langList.find((c) => c.code.toLowerCase() === defaultLanguage));

	const collapseMenu = () => {
		updateState({ ...state, isShow: !state.isShow });
	}

	const clickLanguage = (e, option) => {
		setSelectedOption(langList.find((c) => c.code === option));
		updateState({ ...state, isShow: !state.isShow });
		return true;
	}

	return (
		<div className={'language-picker'}>
			<NavLink
				to="#"
				className={`rotate-arrow-icon ${state.isShow ? 'collapsed' : ''}`}
				onClick={(e) =>collapseMenu()}
			>
				<img src={`/assets/img/flags/${selectedOption.code.toLowerCase()}.svg`} alt={selectedOption.code} width={20} height={20} className="mr-2" />
				<span>{selectedOption.label}</span>
				<img src={"/assets/img/icons/caret.svg"} alt="caret icon" />
			</NavLink>
			<Collapse
				isOpen={ state.isShow }
			>
				<Nav className="language-menu">
					{langList.filter(item => item.code !== selectedOption.code).map((item, index) => {
						return (
							<NavItem
								key={`${index}`}
							>
								<img src={`/assets/img/flags/${item.code.toLowerCase()}.svg`} alt={item.code} width={20} height={20} />
								<p onClick={(e) => clickLanguage(e, `${item.code}`)} >
									{item.label}
								</p>
							</NavItem>
						);
					})}
				</Nav>
			</Collapse>
		</div>
	)
}

export default Language;
