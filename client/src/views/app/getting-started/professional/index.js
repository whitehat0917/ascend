import React, { useState } from 'react';
import { connect } from "react-redux";
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Radio from '../../../../components/custom/radio';
import Progress from "../../../../components/custom/progress";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Start = ({ history }) => {
	const [state, updateState] = useState({
		limitOption: ""
	});

	const validationSchema = Yup.object().shape({
		limit: Yup.string()
			.required('Required')
	});

	const limitChange = (option) => {
		updateState({ ...state, limitOption: option });
	}

	return (
		<div className="account-types-wrapper">
			<Row>
				<FlexLayout direction="column">
					<CardHeader>
						<Text fontSize="18px" lineHeight="40px" color="#1B222A">
							Professional Trader
						</Text>
					</CardHeader>
					<Card maxWidth="550px">
						<Progress value={85} />
						<Text fontSize="12px" margin="0 0 1rem 0" align="left">
							Based on your responses, you may be categorised as an Everest Professional Trader. Would you like us to share more information with you about this? Everest Professional Traders aren't restricted to the lower leverage limits which are applicable to Retail Traders.
            			</Text>
						<Formik
							initialValues={{
								limit: ""
							}}
							validationSchema={validationSchema}
							onSubmit={values => {
								history.push("/app/getting-started/notification-1")
							}}
						>
							{({ dirty, isValid }) => (
								<Form>
									<FormGroup row>
										<Col sm="4">
											<Radio id="yes-limit" name="limit" value="yes" label="Yes" handleChange={limitChange} />
										</Col>
										<Col sm="4">
											<Radio id="no-limit" name="limit" value="no" label="No" handleChange={limitChange} />
										</Col>
									</FormGroup>
									{
										state.limitOption && state.limitOption === "yes" && (
											<FormGroup>
												<Text fontSize="12px" margin="0 0 1rem 0" align="left">
													We'll send you out an email shortly in relation to how you can become an Everest
            									</Text>
											</FormGroup>
										)
									}
									<FormGroup>
										<Button color="primary" type="submit" disabled={!(isValid)}>Next</Button>
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
	};
  };
  
  const mapDispatchToProp = () => {
	return {
	};
  };
  
  export default connect(mapStateToProps, mapDispatchToProp)(Start);