import React from 'react';
import { Row, FormGroup, Button } from 'reactstrap';
import { connect } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Notification from '../../../../components/custom/notification';
import Progress from '../../../../components/custom/progress';
import Radio from '../../../../components/custom/radio';
import data from '../../../../constants/selectValue';
import { setQuestionDetails } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const First = ({ history, questionBody, setQuestionDetails }) => {
  const validationSchema = Yup.object().shape({
    tradingExperience: Yup.string()
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
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={54} />
            <Text fontSize="12px" margin="0 0 1rem 0" align="left">
              How much trading experience do you have when it comes to forex and CFDs?
            </Text>
            <Formik
              initialValues={{
                tradingExperience: questionBody.tradingExperience || null,
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setQuestionDetails(values);
                history.push("/app/getting-started/trading-experience-2");
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <FormGroup className="mb-half">
                    <Radio id="no-experience" name="tradingExperience" value={data.tradingExperience.no.value} label={data.tradingExperience.no.label} checked={questionBody.tradingExperience === data.tradingExperience.no.value ? true : false} />
                  </FormGroup>
                  <FormGroup className="mb-half">
                    <Radio id="small-experience" name="tradingExperience" value={data.tradingExperience.small.value} label={data.tradingExperience.small.label} checked={questionBody.tradingExperience === data.tradingExperience.small.value ? true : false} />
                  </FormGroup>
                  <FormGroup className="mb-half">
                    <Radio id="medium-experience" name="tradingExperience" value={data.tradingExperience.medium.value} label={data.tradingExperience.medium.label} checked={questionBody.tradingExperience === data.tradingExperience.medium.value ? true : false} />
                  </FormGroup>
                  <FormGroup>
                    <Radio id="large-experience" name="tradingExperience" value={data.tradingExperience.large.value} label={data.tradingExperience.large.label} checked={questionBody.tradingExperience === data.tradingExperience.large.value ? true : false} />
                  </FormGroup>
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

const mapStateToProps = ({ register }) => {
  const { questionBody } = register;
  return { questionBody };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setQuestionDetails: (data) => dispatch(setQuestionDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(First);
