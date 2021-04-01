import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, FormGroup, Button } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "../../../../components/custom/select";
import Input from "../../../../components/custom/input";
import Progress from "../../../../components/custom/progress"
import data from '../../../../constants/selectValue';
import { setQuestionDetails } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Start = ({ history, questionBody, setQuestionDetails }) => {
  const sourceOptions = [];
  const incomeOptions = [];
  const investOptions = [];

  Object.values(data.fundsSource).map((printer, index) =>
    sourceOptions.push({ key: Object.keys(data.fundsSource)[index], ...printer })
  );
  Object.values(data.fundsIncome).map((printer, index) =>
    incomeOptions.push({ key: Object.keys(data.fundsIncome)[index], ...printer })
  );
  Object.values(data.fundsInvest).map((printer, index) =>
    investOptions.push({ key: Object.keys(data.fundsInvest)[index], ...printer })
  );

  const [state, updateState] = useState({
    sourceOption: questionBody.fundsSource === "Other" ? sourceOptions.find(item => item.value === "Other") : null
  });

  const validationSchema = Yup.object().shape({
    fundsSource: Yup.string().required("Required"),
    fundsExplain: Yup.string().when('fundsSource', {
      is: "Other",
      then: Yup.string().required('Required')
    }),
    fundsIncome: Yup.string().required("Required"),
    fundsInvest: Yup.string().required("Required"),
  });

  const sourceChange = (option) => {
    updateState({ ...state, sourceOption: option });
  };

  const checkScore = (values) => {
    let score = 0;
    score += data['employmentStatus'][questionBody.employmentStatus].score;
    score += data['employmentIndustry'][questionBody.employmentIndustry].score;
    score += data['employmentEducation'][questionBody.employmentEducation].score;
    score += data['tradingExperience'][questionBody.tradingExperience].score;
    score += data['tradingLots'][questionBody.tradingLots].score;
    score += data['knowledgeRate'][questionBody.knowledgeRate].score;
    score += data['knowledgeMarket'][questionBody.knowledgeMarket].score;
    score += data['knowledgeProfit'][questionBody.knowledgeProfit].score;
    score += data['fundsSource'][values.fundsSource].score;
    score += data['fundsIncome'][values.fundsIncome].score;
    score += data['fundsInvest'][values.fundsInvest].score;
    if (score >= 80){
      history.push("/app/getting-started/professional-trader");
    } else if (score > 30){
      history.push("/app/getting-started/notification-1");
    } else{
      history.push("/app/getting-started/notification-1");
    }
  };

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Source of Funds
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={77.2} />
            <Text fontSize="12px" margin="0 0 10px 0" align="center">
              You need to fill in all the fields
            </Text>
            <Formik
              initialValues={{
                fundsSource: questionBody.fundsSource || null,
                fundsIncome: questionBody.fundsIncome || null,
                fundsInvest: questionBody.fundsInvest || null,
                fundsExplain: questionBody.fundsExplain || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setQuestionDetails(values);
                checkScore(values);
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <FormGroup>
                    <Select
                      options={sourceOptions}
                      selectedValue={questionBody.fundsSource} 
                      name="fundsSource"
                      label="Source of Funds?"
                      handleChange={sourceChange}
                    />
                  </FormGroup>
                  {state.sourceOption &&
                    state.sourceOption["value"] === "Other" && (
                      <FormGroup>
                        <Input
                          name="fundsExplain"
                          label={"Please explain"}
                          type={"text"}
                        />
                      </FormGroup>
                    )}
                  <FormGroup>
                    <Select
                      options={incomeOptions}
                      selectedValue={questionBody.fundsIncome} 
                      name="fundsIncome"
                      label="What's your annual income?"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Select
                      options={investOptions}
                      selectedValue={questionBody.fundsInvest} 
                      name="fundsInvest"
                      label="How much do you expect to invest in the next 12 months?"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      color="primary"
                      type="submit"
                      disabled={!(isValid)}
                    >
                      Next
                    </Button>
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
