import React, { useState } from 'react';
import { connect } from "react-redux";
import { Row, FormGroup, Button } from 'reactstrap';
import Input from "../../../../components/custom/input";
import SingleCheckbox from '../../../../components/custom/single-checkbox';
import Progress from "../../../../components/custom/progress";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';
import { setUserId } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Start = ({ history, countryCode, register, setUserId }) => {
	const [isLoading, setLoading] = useState(false);
	let validationSchema = Yup.object().shape({
		isVerify: Yup.boolean()
			.required("Required")
			.oneOf([true], "You should check."),
	});

	let formValues = {
		isVerify: null
	}

	if (countryCode === "es") {
		validationSchema = Yup.object().shape({
			isVerify: Yup.boolean()
				.required("Required")
				.oneOf([true], "You should check."),
			spainVerify: Yup.boolean()
				.required("Required")
				.oneOf([true], "You should check."),
			explain: Yup.string()
				.required('Required')
				.test("text", "You should be able here to copy or type using his kyeboard the highlighted text and past it in the paragragh space.", val => val === "Product that is difficult to understand. The CNMV considers that, in general, it is not appropriate for retail investors."),
		});
		formValues = {
			isVerify: null,
			spainVerify: null,
			explain: ""
		}
	}

	return (
		<div className="account-types-wrapper">
			<Row>
				<FlexLayout direction="column">
					<CardHeader>
						<Text fontSize="18px" lineHeight="40px" color="#1B222A">
							Notifications
            </Text>
					</CardHeader>
					<Card maxWidth="550px">
						<Progress value={96} />
						<Formik
							initialValues={formValues}
							validationSchema={validationSchema}
							onSubmit={values => {
								setLoading(true);
								axios.post("/api/auth/register", {
									'firstName': register.requestBody.firstName,
									'lastName': register.requestBody.lastName,
									'country': register.requestBody.country.toUpperCase(),
									'email': register.requestBody.email,
									'phone': register.requestBody.mobile,
									'city': register.requestBody.city,
									'birthDate': moment(register.requestBody.birthDate).format("DD-MM-YYYY"),
									'nationality': register.requestBody.nationality.toUpperCase(),
									'zipCode': register.requestBody.zipCode,
									'clientIp': register.requestBody.clientIp,
									sendWelcomeEmail: true,
								})
								.then((res) => {
									if (res.data.message === 'success') {
										setUserId(res.data.id);
										let bodyData = {requestBody: register.requestBody, questionBody: register.questionBody};
										axios.post("/api/user/setUserData", {
											'userId': res.data.id,
											'data': JSON.stringify(bodyData)
										})
										.then((res) => {
											// console.log(res)
										})
										.catch((err) => {
											console.log(err)
										})
										localStorage.removeItem('requestBody');
										localStorage.removeItem('questionBody');
										history.push("/pages/verification");
										setLoading(false);
									}else{
										alert(res.data.message);
										setLoading(false);
									}
								})
								.catch((err) => {
									console.log(err)
									setLoading(false);
								})
							}}
						>
							{({ dirty, isValid }) => (
								<Form>
									<FormGroup>
										<SingleCheckbox id={"isVerify"} label={"I hereby represent that the information provided on the registration form is true and correct, and that I will notify EverestCM of any material changes in writing. By submitting below, I acknowledge that this is a legally binding agreement, which I have read carefully and agree to be bound by all Legal Documentation listed in the previous page. To aid the fight against money laundering and terrorist financing, EU regulation requires all investment firms to obtain, verify and record information that identifies each person who opens an account."} name={"isVerify"} value="1" />
									</FormGroup>
									{
										countryCode === "es" && (
											<>
												<FormGroup>
													<SingleCheckbox id={"spainVerify"} label={"I am aware that the CFD and rolling-spot forex financial products are complex and that CNMV believes they are not appropriate for retail investors."} name={"spainVerify"} value="1" />
												</FormGroup>
												<Text fontSize="12px" margin="0 0 1rem 0" align="left" padding="0 0 10px 40px">
													In order to provide you with the greatest protection as a client and comply with Securities Market Regulations, you must transcribe with your keyboard the following text:
											</Text>
												<Text fontSize="12px" margin="0 0 1rem 0" align="left" padding="0 0 10px 40px">
													Product that is difficult to understand. The CNMV considers that, in general, it is not appropriate for retail investors.
											</Text>
												<FormGroup style={{ padding: "0 0 10px 40px" }}>
													<Input
														name="explain"
														label={"Type text here..."}
														type={"text"}
														feedbackLabel={true}
													/>
												</FormGroup>
											</>
										)
									}
									<FormGroup>
										<Button 
											color="primary"
											type="submit"
											disabled={!(dirty && isValid)}
											className={`btn-shadown btn-multiple-state ${isLoading ? 'show-spinner' : ''}`}
										>
											<span className="spinner d-inline-block">
											<span className="bounce1" />
											<span className="bounce2" />
											<span className="bounce3" />
											</span>
											<span className="label">LAUNCH</span>
										</Button>
									</FormGroup>
								</Form>
							)}
						</Formik>
					</Card>
				</FlexLayout>
			</Row>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		register: state.register,
		countryCode: state.settings.countryCode
	};
};

const mapDispatchToProp = (dispatch) => {
	return {
		setUserId: (data) => dispatch(setUserId(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProp)(Start);