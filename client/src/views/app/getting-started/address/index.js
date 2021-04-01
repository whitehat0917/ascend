import React from 'react';
import { Row, FormGroup, Button } from 'reactstrap';
import { connect } from "react-redux";
import Input from '../../../../components/custom/input';
import Progress from '../../../../components/custom/progress';
import CityPicker from '../../../../components/custom/citypicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FlexLayout, Text, Card, CardHeader } from "../../../../components/custom/styles";
import { setDetails } from "../../../../redux/actions";

const Start = ({ history, requestBody, setDetails }) => {

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .required('Please enter street name')
      .test("number", "Are you sure your Street doesn't have a name? Please try again", val => val && /^\d+$/.test(val) === false)
      .test("special", "Are you sure your Street has special characters in it? Please try again", val => /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(val) === false)
      .test('1letter', "We’re sure your Street has a name and number.", val => val && val.length > 1),
    city: Yup.string()
      .required('Please enter City/Town')
      .test("number", "Are you sure your City/Town has a number? Please try again", val => val && /^\d+$/.test(val) === false)
      .test("special", "Are you sure your City/Town has special characters in it? Please try again", val => /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(val) === false)
      .test('1letter', "We’re sure your City/Town has a name.", val => val && val.length > 1),
    zipCode: Yup.string()
      .required('Required'),
  });

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Your Residential Address
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={38.5} />
            <Text fontSize="12px" margin="0 0 10px 0" align="center">
              All fields are required
            </Text>
            <Formik
              initialValues={{
                address: requestBody.address || "",
                additionalAddress: requestBody.additionalAddress || '',
                city: requestBody.city || '',
                zipCode: requestBody.zipCode || '',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                setDetails(values);
                history.push("/app/getting-started/employment-info");
              }}
            >
              {({ dirty, isValid }) => (
                <Form>
                  <FormGroup>
                    <Input name="address" label={"Street Name & Number"} type={"text"} feedbackLabel={true} />
                  </FormGroup>
                  <FormGroup>
                    <Input name="additionalAddress" label={"Additional Address Info"} type={"text"} />
                  </FormGroup>
                  <FormGroup>
                    <CityPicker name={"city"} label={"City / Town"} country={requestBody.country}/>
                  </FormGroup>
                  <FormGroup>
                    <Input name="zipCode" label={"Post Code"} type={"number"} />
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
  const { requestBody } = register;
  return { requestBody };
};

const mapActionsToProps = (dispatch) => {
  return {
    setDetails: (data) => dispatch(setDetails(data)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Start);

