import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, Col, Button } from 'reactstrap';
import Input from '../components/custom/input';
import CountryPicker from '../components/custom/countrypicker';
import PhoneInput from "../components/custom/phone-input";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input'

import { FlexLayout, Text, Card } from "../components/custom/styles";
import { setDetails } from "../redux/actions";

import axios from "axios";

Yup.addMethod(Yup.string, 'customValidator', function () {
  return this.test(
    'is-jimmy',
    '${path} is not Jimmy',
    async (value, context) => (await axios.get('/api/auth/check-email?email=' + value)).data.message === 'valid',
  )
});

const Register = ({ history, countryCode, requestBody, setDetails }) => {

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Please fill in your first name')
      .test("len", "We're sure your first name has more than one letter", val => val && val.length > 1)
      .test("number", "Are you sure your first name has numbers in it? Please try again", val => /\d/.test(val) === false)
      .test("special", "Are you sure your first name has special characters in it? Please try again", val => /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(val) === false)
      .test("english", "Please use the English letters to enter your name.", val => /[^\x00-\x7F]+/ig.test(val) === false),
    lastName: Yup.string()
      .required('Please fill in your last name')
      .test("len", "We're sure your last name has more than one letter", val => val && val.length > 1)
      .test("number", "Are you sure your last name has numbers in it? Please try again", val => /\d/.test(val) === false)
      .test("special", "Are you sure your last name has special characters in it? Please try again", val => /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(val) === false)
      .test("english", "Please use the English letters to enter your name.", val => /[^\x00-\x7F]+/ig.test(val) === false),
    country: Yup.string()
      .required('Required'),
    email: Yup.string()
      .required('Please enter your email.')
      .test("len", "We’re sure your email has more than one letter...", val => val && val.length > 1)
      .email("Make sure you’ve entered your email correctly as it doesn’t look right."),
    // .customValidator(),
    mobile: Yup.string()
      .test("phone", 'Phone number is not valid', val => val && isValidPhoneNumber(val))
      .required('Required'),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    try {
      // attempt API call
      const res = await axios.post('/api/auth/check-email', { email: values.email });
      if (res.data.message === 'valid') {
        setLoading(false);
        setDetails(values);
        history.push('/app');
      }
      else {
        setLoading(false);
        setFieldError('email', 'This email address is already registerd.');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      // setFieldError('email', 'This email address is already registerd.');
    }
  }

  return (
    <main className="authentication">
      <FlexLayout direction="column">
        <img className="mb-3" src="/assets/img/site-logo.svg" alt="Site Logo" />
        <Text fontSize="15px" lineHeight="40px" margin="0 0 20px 0" color="#1B222A">
          Register Quickly & Securely
        </Text>
        <Card maxWidth="550px">
          <Text fontSize="12px" margin="0 0 15px 0" align="center">
            You need to fill in all the fields
          </Text>
          <Formik
            initialValues={{
              firstName: requestBody.firstName || "",
              lastName: requestBody.lastName || "",
              country: requestBody.country || countryCode,
              email: requestBody.email || "",
              mobile: requestBody.mobile || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form>
                <FormGroup row>
                  <Col sm="6">
                    <Input name="firstName" label={"First Name"} type={"text"} tooltipText={"Enter your first name as it appears on your passport or ID."} feedbackLabel={true} />
                  </Col>
                  <Col sm="6">
                    <Input name="lastName" label={"Last Name"} type={"text"} tooltipText={"Enter your last name (surname) as it appears on your passport or ID."} feedbackLabel={true} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <CountryPicker name="country" label={"Country of Residence"} defaultCountry={requestBody.country ? requestBody.country : countryCode} hide={true} />
                </FormGroup>
                <FormGroup>
                  <Input name="email" label={"Email"} type={"email"} tooltipText={"Enter the email address you use on a daily basis."} feedbackLabel={true} />
                </FormGroup>
                <FormGroup>
                  <PhoneInput name="mobile" label={"Mobile"} defaultCountry={countryCode} />
                </FormGroup>
                <div className="text-center">
                  <Text fontSize="11px" margin="0 0 10px 0" align="center">
                    By registering, you agree to our <a className="text-primary" href="#!" target="_blank"><b>privacy policy.</b></a>
                  </Text>
                  <Button
                    color="primary"
                    type="submit"
                    disabled={(!isValid || loading)}
                    className={`btn-shadown btn-multiple-state ${loading ? 'show-spinner' : ''}`}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Continue</span>
                  </Button>
                  <Text fontSize="11px" margin="10px 0 0 0" align="center">
                    Already got an account? <NavLink to="/login" className="text-primary"><b>Sign in</b></NavLink>
                  </Text>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </FlexLayout>
    </main>
  )
}

const mapStateToProps = ({ settings, register }) => {
  const { countryCode } = settings;
  const { requestBody } = register;
  return { countryCode, requestBody };
};

const mapActionsToProps = (dispatch) => {
  return {
    setDetails: (data) => dispatch(setDetails(data)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
