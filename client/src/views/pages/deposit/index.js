import React, { useState } from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import axios from 'axios';
import Select from '../../../components/custom/select';
import CurrencyInput from '../../../components/custom/currencyinput';
import InputLabel from '../../../components/custom/inputLabel';
import { SkipButton } from "../verification/verification.style";
import { FlexLayout, Text, Card, CardHeader } from "../../../components/custom/styles";
import { DepositStepHeader } from "./styles";

const Start = ({ history, userId }) => {
	const [state, updateState] = useState({
		step: 1,
		depositFrom: null,
		depositTo: null,
		depositAmount: null,
		creditAmount: null,
		praxisUrl: ''
	});

	const initValidationSchema = Yup.object().shape({
		depositFrom: Yup.string()
			.required('Required'),
		depositTo: Yup.string()
			.required('Required'),
	});
	const detailsValidationSchema = Yup.object().shape({
		depositAmount: Yup.string()
			.required('Required'),
		creditAmount: Yup.string()
			.required('Required'),
	});

	const depositFromOptions = [
		{ label: "Praxis LIVE", value: "Praxis LIVE" },
		{ label: "Praxis TEST", value: "Praxis TEST" }
	];
	const depositToOptions = [
		{ label: "RAW 2000111644", value: "RAW 2000111644" }
	];

	const confirmDeposit = () => {
		updateState({ ...state, step: 4 });
		axios.post("/api/user/getPraxisUrl", {
			'userId': userId,
			'method': state.depositFrom
		})
			.then((res) => {
				if (res.data.status === 'success') {
					updateState({ ...state, step: 4, praxisUrl: res.data.url });
					console.log(state.step)
				} else {
					console.log(res.data)
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<div className="account-types-wrapper">
			<Row>
				<FlexLayout direction="column">
					{
						state.step !== 4 &&
						<CardHeader>
						</CardHeader>
					}
					{state.step !== 4 &&
						<Card maxWidth="550px">
							<FlexLayout padding="0 10px" borderBottom="1px solid #F3F3F3">
								<FlexLayout width="33%">
									<DepositStepHeader className={state.step === 1 ? "active" : ""}>1. INITIAL INFORMATION</DepositStepHeader>
								</FlexLayout>
								<FlexLayout width="33%">
									<DepositStepHeader className={state.step === 2 ? "active" : ""}>2. TRANSFER DETAILS</DepositStepHeader>
								</FlexLayout>
								<FlexLayout width="33%">
									<DepositStepHeader className={state.step === 3 ? "active" : ""}>3. CONFIRMATION</DepositStepHeader>
								</FlexLayout>
							</FlexLayout>
							{
								state.step === 1 &&
								<Formik
									initialValues={{
										depositFrom: state.depositFrom ? state.depositFrom : null,
										depositTo: state.depositTo ? state.depositTo : null,
									}}
									validationSchema={initValidationSchema}
									onSubmit={values => {
										updateState({ ...state, step: 2, depositFrom: values.depositFrom, depositTo: values.depositTo });
									}}
								>
									{({ dirty, isValid }) => (
										<Form>
											<FormGroup style={{ marginTop: "1.6rem" }}>
												<Select options={depositFromOptions} selectedValue={state.depositFrom} name="depositFrom" label="Deposit From" />
											</FormGroup>
											<FormGroup>
												<Select options={depositToOptions} selectedValue={state.depositTo} name="depositTo" label="Deposit To" />
											</FormGroup>
											<FormGroup>
												<Button color="primary" type="submit" disabled={state.depositFrom ? false : isValid && dirty ? false : true}>Continue</Button>
											</FormGroup>
										</Form>
									)}
								</Formik>
							}
							{
								state.step === 2 &&
								<Formik
									initialValues={{
										depositAmount: state.depositAmount ? state.depositAmount : null,
										creditAmount: state.creditAmount ? state.creditAmount : null,
									}}
									validationSchema={detailsValidationSchema}
									onSubmit={values => {
										updateState({ ...state, step: 3, depositAmount: values.depositAmount, creditAmount: values.creditAmount });
									}}
								>
									{({ dirty, isValid }) => (
										<Form>
											<FormGroup style={{ marginTop: "1.6rem" }}>
												<CurrencyInput name="depositAmount" label={"Deposit Amount"} type={"number"} />
												<InputLabel color="#23A5D6" text={"Deposit to " + state.depositTo} />
											</FormGroup>
											<FormGroup>
												<CurrencyInput name="creditAmount" label={"Credited Amount"} type={"number"} tooltipText="Approximate amount to be credited onto your Trading Account after deducting the Commission & Fees" />
											</FormGroup>
											<FormGroup>
												<Row>
													<Col md={6}>
														<Button className="mobile-float-r black-button" onClick={() => updateState({ ...state, step: 1 })}>Back</Button>
													</Col>
													<Col md={6}>
														<Button color="primary" className="mobile-float-l" type="submit" disabled={state.depositAmount ? false : isValid && dirty ? false : true} >Continue</Button>
													</Col>
												</Row>
											</FormGroup>
										</Form>
									)}
								</Formik>
							}
							{
								state.step === 3 &&
								<>
									<FormGroup style={{ marginTop: "1.6rem" }}>
										<FlexLayout padding="15px" backgroundColor="#F8F8F8" justify="space-between">
											<Text fontSize="11px">Deposit With</Text>
											<Text fontSize="11px" color="#23A5D6" fontWeight="bold">{state.depositFrom}</Text>
										</FlexLayout>
										<FlexLayout padding="15px" justify="space-between">
											<Text fontSize="11px">Deposit To</Text>
											<Text fontSize="11px" color="#23A5D6" fontWeight="bold">{state.depositTo}</Text>
										</FlexLayout>
										<FlexLayout padding="15px" backgroundColor="#F8F8F8" justify="space-between">
											<Text fontSize="11px">Deposit Amount</Text>
											<Text fontSize="11px" color="#23A5D6" fontWeight="bold">{state.depositAmount} EUR</Text>
										</FlexLayout>
										<FlexLayout padding="15px" justify="space-between">
											<Text fontSize="11px">Amount To Be Credited</Text>
											<Text fontSize="11px" color="#23A5D6" fontWeight="bold">{state.creditAmount} EUR</Text>
										</FlexLayout>
									</FormGroup>
									<FormGroup>
										<Row>
											<Col md={6}>
												<Button className="mobile-float-r black-button" onClick={() => updateState({ ...state, step: 2 })}>Back</Button>
											</Col>
											<Col md={6}>
												<Button color="primary" className="mobile-float-l" onClick={() => confirmDeposit()}>Continue</Button>
											</Col>
										</Row>
									</FormGroup>
								</>
							}
							<SkipButton>
								<a
									href="#"
									className="text-lg-center skip"
									onClick={() => history.push("/error")}
								>
									Skip
								</a>
							</SkipButton>
						</Card>
					}
					{
						state.step === 4 &&
						<Card maxWidth="550px">
							<iframe src={state.praxisUrl} width="100%" style={{ minHeight: "880px" }}>

							</iframe>
						</Card>
					}
				</FlexLayout>
			</Row>
		</div>
	);
};

const mapStateToProps = ({ register }) => {
	const { userId } = register;
	return { userId };
};

export default connect(mapStateToProps)(Start);
