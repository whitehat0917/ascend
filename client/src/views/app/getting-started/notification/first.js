import React from 'react';
import { connect } from "react-redux";
import { Row, FormGroup, Button } from 'reactstrap';
import LanguagePicker from '../../../../components/custom/languagepicker';
import SingleCheckbox from '../../../../components/custom/single-checkbox';
import Progress from "../../../../components/custom/progress";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FlexLayout, Text, Card, CardHeader} from "../../../../components/custom/styles";

const First = ({ history }) => {

  const validationSchema = Yup.object().shape({
    isVerify: Yup.boolean()
      .required("Required")
      .oneOf([true], "You should check."),
    haveRead: Yup.boolean()
      .required("Required")
      .oneOf([true], "You should check."),
    policy: Yup.boolean()
      .required("Required")
      .oneOf([true], "You should check."),
    language: Yup.string()
      .required('Required'),
  });

  return (
    <div className="account-types-wrapper">
      <Row>
        <FlexLayout direction="column">
          <CardHeader>
            <Text fontSize="18px" lineHeight="40px" color="#1B222A">
              Notifications
            </Text>
          </CardHeader>
          <Card maxWidth="550px">
            <Progress value={93} />
            <Formik
              initialValues={{
                language: "English",
                isVerify: null,
                haveRead: null,
                policy: null
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                // same shape as initial values
                history.push("/app/getting-started/notification-2");
              }}
            >
            {({ dirty, isValid }) => (
              <Form>
                <FormGroup>
                  <LanguagePicker name="language" label={"Your preferred notification language"} defaultLanguage="gb" tooltipText={"We may send you promotional emails, which include market news, company news, and product updates.<br><br>You can manage your email subscriptions from within the Notifications Centre in Ascend."} />
                </FormGroup>
                <FormGroup>
                  <SingleCheckbox id={"isVerify"} label={"I agree to receive your newsletters, company news and product updates."} name={"isVerify"} value="1"/>
                  <SingleCheckbox id={"haveRead"} label={"I hereby acknowledge the Risk Disclosure provided by Lunem Ltd according to which trading in Forex and Contracts for Difference involves a significant level of risk and is not appropriate for me, but I still wish to proceed with registering for a Trading Account with the Company.<span style='color: red'>*</span>"} name={"haveRead"} value="1"/>
                  <SingleCheckbox id={"policy"} label={"I declare that I have carefully read and fully understand and accept the entire content of the <a href='localhost:3002'>Terms & Conditions</a>, <a href='localhost:3002'>Client Categorization Policy</a>, <a href='localhost:3002'>Clients Complaint Policy</a>, <a href='localhost:3002'>Order Execution Policy</a>, <a href='localhost:3002'>Conflict of Interest Policy</a>, <a href='localhost:3002'>Risk Disclosure</a>, <a href='localhost:3002'>Investor Compensation Fund</a>, <a href='localhost:3002'>Privacy and Cookie Policy</a>, and <a href='localhost:3002'>Key Information Document (KID) for FX</a>, <a href='localhost:3002'>Key Information Document (KID) for Shares</a>, <a href='localhost:3002'>Key Information Document (KID) for Indices</a>, <a href='localhost:3002'>Key Information Document (KID) for Commodities</a>, <a href='localhost:3002'>Key Information Document (KID) for Cryptocurrencies</a>"} name={"policy"} value="1"/>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit" disabled={!(dirty && isValid)}>Next</Button>
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
  
const mapDispatchToProp = (dispatch) => {
	return {
	};
};
  
export default connect(mapStateToProps, mapDispatchToProp)(First);