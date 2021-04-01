import React, { useState } from "react";
import { Row, FormGroup, Button } from 'reactstrap';
import { connect } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Select from '../../../../components/custom/select';
import Input from "../../../../components/custom/input";
import Progress from '../../../../components/custom/progress';
import data from '../../../../constants/selectValue';
import { setQuestionDetails } from "../../../../redux/actions";

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";

const Start = ({ history, questionBody, setQuestionDetails }) => {
  const statusOptions = [];
  const industryOptions = [];
  const educationOptions = [];

  Object.values(data.employmentStatus).map((printer, index) =>
    statusOptions.push({ key: Object.keys(data.employmentStatus)[index], ...printer })
  );
  Object.values(data.employmentIndustry).map((printer, index) =>
    industryOptions.push({ key: Object.keys(data.employmentIndustry)[index], ...printer })
  );
  Object.values(data.employmentEducation).map((printer, index) =>
    educationOptions.push({ key: Object.keys(data.employmentEducation)[index], ...printer })
  );

  const [state, updateState] = useState({
    statusOption: questionBody.employmentStatus === "Other" ? statusOptions.find(item => item.value === "Other") : null,
    industryOption: questionBody.employmentIndustry === "Other" ? industryOptions.find(item => item.value === "Other") : null,
  });
  
  const validationSchema = Yup.object().shape({
    employmentStatus: Yup.string()
      .required('Required'),
    statusExplain: Yup.string().when('status', {
      is: "Other",
      then: Yup.string().required('Required')
    }),
    employmentIndustry: Yup.string()
      .required('Required'),
    industryExplain: Yup.string().when('industry', {
      is: "Other",
      then: Yup.string().required('Required')
    }),
    employmentEducation: Yup.string()
      .required('Required')
  });

  const statusChange = (option) => {
    updateState({ ...state, statusOption: option });
  };

  const industryChange = (option) => {
    updateState({ ...state, industryOption: option });
  }

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Your Employment Info
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={46.2} />
            <Text fontSize="12px" margin="0 0 10px 0" align="center">
              You need to fill in all the fields
            </Text>
            <Formik
              initialValues={{
                employmentStatus: questionBody.employmentStatus || null,
                employmentIndustry: questionBody.employmentIndustry || null,
                employmentEducation: questionBody.employmentEducation || null,
                statusExplain: questionBody.statusExplain || "",
                industryExplain: questionBody.industryExplain || ""
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setQuestionDetails(values);
                history.push("/app/getting-started/trading-experience-1");
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <FormGroup>
                    <Select options={statusOptions} selectedValue={questionBody.employmentStatus} name="employmentStatus" label="Employment Status" handleChange={statusChange} />
                  </FormGroup>
                  {state.statusOption &&
                    state.statusOption["value"] === "Other" && (
                      <FormGroup>
                        <Input
                          name="statusExplain"
                          label={"Please explain here"}
                          type={"text"}
                        />
                      </FormGroup>
                    )}
                  <FormGroup>
                    <Select options={industryOptions} selectedValue={questionBody.employmentIndustry} name="employmentIndustry" label="What industry are you in?" handleChange={industryChange} />
                  </FormGroup>
                  {state.industryOption &&
                    state.industryOption["value"] === "Other" && (
                      <FormGroup>
                        <Input
                          name="industryExplain"
                          label={"Please add the industry are you in here."}
                          type={"text"}
                        />
                      </FormGroup>
                    )}
                  <FormGroup>
                    <Select options={educationOptions} selectedValue={questionBody.employmentEducation} name="employmentEducation" label="What's your level of education?" />
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

export default connect(mapStateToProps, mapDispatchToProp)(Start);


