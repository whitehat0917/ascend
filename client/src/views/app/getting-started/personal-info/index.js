import React, { useState } from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { connect } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Radio from '../../../../components/custom/radio';
import CountryPicker from '../../../../components/custom/countrypicker';
import CustomDatePicker from '../../../../components/custom/datepicker';
import Input from '../../../../components/custom/input';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'

import { FlexLayout, Text, SpanText, Card, CardHeader } from "../../../../components/custom/styles";
import Progress from '../../../../components/custom/progress';
import { setDetails } from "../../../../redux/actions";
import infoIcon from "../../../../assets/img/radio-info-icon.svg";
const publicIp = require('public-ip');

const Start = ({ history, countryCode, setDetails, requestBody }) => {
  const [state, updateState] = useState({
    locationOption: requestBody.usCitizen || "No"
  });

  let validateDate = new Date();
  validateDate.setFullYear(validateDate.getFullYear() - 18);
  const validationSchema = Yup.object().shape({
    birthDate: Yup.date()
      .max(validateDate, "You must be 18 or over to trade with Everest.")
      .required('Please input your birth date.'),
    nationality: Yup.string()
      .required('Required'),
    usCitizen: Yup.string()
      .required('Required'),
    pep: Yup.string()
      .required('Required'),
    usTaxCode: Yup.string().when('usCitizen', {
      is: "Yes",
      then: Yup.string().test('len', 'Your Tax code should be 9-digits.', val => val && val.length === 9)
    }),
  });
  var clientIp = '';
  publicIp.v4().then(function (result){
    clientIp = result;
  });

  const locationChange = (option) => {
    updateState({ ...state, locationOption: option });
  }

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Personal Info
            </Text>
            <Text fontSize="14px" lineHeight="24px" maxWidth="600px" margin="0 0 15px 0">
              {requestBody.firstName}, we need some more info about you.
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={30.8} />
            <Text fontSize="12px" margin="0 0 10px 0" align="center">
              You need to fill in all the fields
            </Text>
            <Formik
              initialValues={{
                nationality: requestBody.nationality ? requestBody.nationality : countryCode,
                birthDate: requestBody.birthDate ? new Date(requestBody.birthDate) : "",
                usCitizen: requestBody.usCitizen || "No",
                pep: requestBody.pep || "No",
                usTaxCode: requestBody.usTaxCode || ""
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                values['clientIp'] = clientIp;
                setDetails(values);
                history.push("/app/getting-started/residential-address");
              }}
            >
              {({ isValid }) => (
                <Form>
                  <FormGroup>
                    <CustomDatePicker name={"birthDate"} label={"Date of Birth"} />
                  </FormGroup>
                  <FormGroup>
                    <CountryPicker name={"nationality"} label={"Nationality"} defaultCountry={requestBody.nationality ? requestBody.nationality : countryCode} hide={false} />
                  </FormGroup>
                  <FormGroup>
                    <Text fontSize="12px" margin="0 0 10px 0" align="left">
                      Are you a US citizen or US resident for tax purposes?
                    </Text>
                    <Row>
                      <Col>
                        <Radio name={"usCitizen"} id="no-option" label={"No"} value={"No"} checked={state.locationOption === 'No' ? true : false} handleChange={locationChange} />
                      </Col>
                      <Col>
                        <Radio name={"usCitizen"} id="yes-option" label={"Yes"} value={"Yes"} checked={state.locationOption === 'Yes' ? true : false} handleChange={locationChange} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup style={{textAlign: "left"}}>
                    <SpanText fontSize="12px" margin="0 0 10px 0" align="left">
                      Are you a PEP?
                    </SpanText>
                    <Tooltip title="Politically exposed person is an individual with a high profile political role, or who has been entrusted with a prominent public function" arrow={true} size={"regular"} style={{marginLeft: "5px"}}>
                      <img id="info-icon" src={infoIcon} alt="input-icon" />
                    </Tooltip>
                    <Row>
                      <Col>
                        <Radio name={"pep"} id="pep-no-option" label={"No"} value={"No"} checked={requestBody.pep === "No" ? true : false} />
                      </Col>
                      <Col>
                        <Radio name={"pep"} id="pep-yes-option" label={"Yes"} value={"Yes"} checked={requestBody.pep === "Yes" ? true : false} />
                      </Col>
                    </Row>
                  </FormGroup>
                  {
                    state.locationOption && state.locationOption === "Yes" && (
                      <FormGroup>
                        <Input name="usTaxCode" label={"US Tax Code"} type={"text"} feedbackLabel={true} />
                      </FormGroup>
                    )
                  }
                  <FormGroup>
                    <Button color="primary" type="submit" disabled={!isValid}>Next</Button>
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

const mapStateToProps = ({ settings, register }) => {
  const { requestBody } = register;
  const { countryCode } = settings;
  return { requestBody, countryCode };
};

const mapActionsToProps = (dispatch) => {
  return {
    setDetails: (data) => dispatch(setDetails(data)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Start);

