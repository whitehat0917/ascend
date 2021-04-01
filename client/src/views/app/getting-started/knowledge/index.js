import React from "react";
import { connect } from "react-redux";
import { Row, FormGroup, Button, Col } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Radio from "../../../../components/custom/radio";
import Progress from "../../../../components/custom/progress";
import data from '../../../../constants/selectValue';
import { setQuestionDetails } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Start = ({ history, questionBody, setQuestionDetails }) => {
  const validationSchema = Yup.object().shape({
    knowledgeMarket: Yup.string().required("Required"),
    knowledgeRate: Yup.string().required("Required"),
    knowledgeProfit: Yup.string().required("Required"),
  });

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Knowledge
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={69.5} />
            <Formik
              initialValues={{
                knowledgeMarket: questionBody.knowledgeMarket || null,
                knowledgeRate: questionBody.knowledgeRate || null,
                knowledgeProfit: questionBody.knowledgeProfit || null,
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setQuestionDetails(values);
                history.push("/app/getting-started/source-funds");
              }}
            >
              {({ isValid }) => (
                <Form>
                  <Text fontSize="12px" margin="0 0 1rem 0" align="left" lineHeight="16px">
                    What would be the required margin for 1 lot (€100,000) EUR/USD, if your leverage is 1:10?
                  </Text>
                  <FormGroup row className="mb-half">
                    <Col sm="4">
                      <Radio id="small-rate" label={data.knowledgeRate.small.label} name="knowledgeRate" value={data.knowledgeRate.small.value} checked={questionBody.knowledgeRate === data.knowledgeRate.small.value ? true : false} />
                    </Col>
                    <Col sm="4">
                      <Radio id="medium-rate" label={data.knowledgeRate.medium.label} name="knowledgeRate" value={data.knowledgeRate.medium.value} checked={questionBody.knowledgeRate === data.knowledgeRate.medium.value ? true : false} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm="4">
                      <Radio id="large-rate" label={data.knowledgeRate.large.label} name="knowledgeRate" value={data.knowledgeRate.large.value} checked={questionBody.knowledgeRate === data.knowledgeRate.large.value ? true : false} />
                    </Col>
                    <Col sm="4">
                      <Radio id="most-rate" label={data.knowledgeRate.largest.label} name="knowledgeRate" value={data.knowledgeRate.largest.value} checked={questionBody.knowledgeRate === data.knowledgeRate.largest.value ? true : false} />
                    </Col>
                  </FormGroup>
                  <Text fontSize="12px" margin="0 0 1rem 0" align="left" lineHeight="16px">
                    Your trade will close automatically if your margin reaches stop-out level.
                  </Text>
                  <FormGroup row>
                    <Col sm="4">
                      <Radio id="yes-profit" label={data.knowledgeProfit.yes.label} name="knowledgeProfit" value={data.knowledgeProfit.yes.value} checked={questionBody.knowledgeProfit === data.knowledgeProfit.yes.value ? true : false} />
                    </Col>
                    <Col sm="4">
                      <Radio id="no-profit" label={data.knowledgeProfit.no.label} name="knowledgeProfit" value={data.knowledgeProfit.no.value} checked={questionBody.knowledgeProfit === data.knowledgeProfit.no.value ? true : false} />
                    </Col>
                  </FormGroup>
                  <Text fontSize="12px" margin="0 0 1rem 0" align="left" lineHeight="16px">
                    Trading CFDs with high leverage means that you could take a larger position and increase your profit potential but it can also magnify your pottential for losses.
                  </Text>
                  <FormGroup row>
                    <Col sm="4">
                      <Radio id="yes-level" label={data.knowledgeMarket.yes.label} name="knowledgeMarket" value={data.knowledgeMarket.yes.value} checked={questionBody.knowledgeMarket === data.knowledgeMarket.yes.value ? true : false} />
                    </Col>
                    <Col sm="4">
                      <Radio id="no-level" label={data.knowledgeMarket.no.label} name="knowledgeMarket" value={data.knowledgeMarket.no.value} checked={questionBody.knowledgeMarket === data.knowledgeMarket.no.value ? true : false} />
                    </Col>
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
  );
};

const mapStateToProps = ({ register }) => {
  const { questionBody } = register;
  return { questionBody };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setQuestionDetails: (data) => dispatch(setQuestionDetails(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Start);
