import React from 'react'
import { FormGroup, Button } from 'reactstrap';
import Input from '../components/custom/input';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FlexLayout, Text, Card } from "../components/custom/styles";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .email(),
    password: Yup.string()
      .required('Required'),
  });
  

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
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ dirty, isValid, handleSubmit }) => (
              <Form>
                <FormGroup>
                  <Input name="email" label={"Email"} type={"email"} icon={"email-icon"} />
                </FormGroup>
                <FormGroup>
                  <Input name="password" label={"Password"} type={"password"} icon={"password-icon"} />
                </FormGroup>
                <FormGroup className="text-center">
                  <Text fontSize="11px" margin="0 0 10px 0" align="center">
                    Forgotten your password?
                  </Text>
                  <Button color="primary" type="submit" disabled={!(dirty && isValid)} onClick={(e) => {handleSubmit()}}>SIGN IN</Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Card>
      </FlexLayout>
    </main>
  )
}

export default Login;
