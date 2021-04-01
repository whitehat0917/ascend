import React from 'react';
import { connect } from "react-redux";
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Notification from '../../../../components/custom/notification';
import Radio from '../../../../components/custom/radio';
import Progress from '../../../../components/custom/progress';
import data from '../../../../constants/selectValue';
import { setQuestionDetails } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Second = ({ history, questionBody, setQuestionDetails }) => {
	const validationSchema = Yup.object().shape({
		tradingLots: Yup.string()
			.required('Required')
	});

	const alertText = "As Everest is a regulated firm, we are required to assess whether trading leveraged financial products is appropriate for you. Go ahead and complete this next section carefully as your responses will be used to determine if you are eligible for an Everest trading account.";

	return (
		<div className="account-types-wrapper">
			<Notification text={alertText} />
			<Row>
				<FlexLayout direction="column">
					<CardHeader>
						<Text fontSize="18px" lineHeight="40px" color="#1B222A">
							Your Trading Experience
						</Text>
						<Text fontSize="14px" lineHeight="24px" maxWidth="600px" margin="0 0 15px 0">
							Continued...
            			</Text>
					</CardHeader>
					<Card maxWidth="550px">
						<Progress value={61.7} />
						<Text fontSize="12px" margin="0 0 1rem 0" align="left">
							How you feel if your trades lost money?
						</Text>
						<Formik
							initialValues={{
								tradingLots: questionBody.tradingLots || null,
							}}
							validationSchema={validationSchema}
							onSubmit={values => {
								setQuestionDetails(values);
								history.push("/app/getting-started/knowledge")
							}}
						>
							{({ dirty, isValid }) => (
								<Form>
									<FormGroup className="mb-half">
										<Radio id="no-lots" label={data.tradingLots.no.label} name="tradingLots" value={data.tradingLots.no.value} checked={questionBody.tradingLots === data.tradingLots.no.value ? true : false} />
									</FormGroup>
									<FormGroup className="mb-half">
										<Radio id="tolerate-lots" label={data.tradingLots.tolerate.label} name="tradingLots" value={data.tradingLots.tolerate.value} checked={questionBody.tradingLots === data.tradingLots.tolerate.value ? true : false} />
									</FormGroup>
									<FormGroup className="mb-half">
										<Radio id="small-tolerate-lots" label={data.tradingLots.smallTolerate.label} name="tradingLots" value={data.tradingLots.smallTolerate.value} checked={questionBody.tradingLots === data.tradingLots.smallTolerate.value ? true : false} />
									</FormGroup>
									<FormGroup className="mb-half">
										<Radio id="hard-tolerate-lots" label={data.tradingLots.hardTolerate.label} name="tradingLots" value={data.tradingLots.hardTolerate.value} checked={questionBody.tradingLots === data.tradingLots.hardTolerate.value ? true : false} />
									</FormGroup>
									<FormGroup className="mb-half">
										<Radio id="see-lots" label={data.tradingLots.see.label} name="tradingLots" value={data.tradingLots.see.value} checked={questionBody.tradingLots === data.tradingLots.see.value ? true : false} />
									</FormGroup>
									<FormGroup>
										<Radio id="want-lots" label={data.tradingLots.want.label} name="tradingLots" value={data.tradingLots.want.value} checked={questionBody.tradingLots === data.tradingLots.want.value ? true : false} />
									</FormGroup>
									<FormGroup>
										<Row>
											<Col md={6} className="mb-2">
												<Button color="danger" className="mobile-float-r" onClick={() => history.push("/app/getting-started/trading-experience-1")}>Back</Button>
											</Col>
											<Col md={6} className="mb-2">
												<Button color="primary" className="mobile-float-l" type="Submit" disabled={!(isValid)}>Next</Button>
											</Col>
										</Row>
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

const mapStateToProps = ({ register }) => {
  const { questionBody } = register;
  return { questionBody };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setQuestionDetails: (data) => dispatch(setQuestionDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Second);