import React from 'react'
import { FormGroup, Col, Button } from 'reactstrap';
import Notification from '../../../../components/custom/notification';
import Radio from '../../../../components/custom/radio';
import Select from '../../../../components/custom/select';
import InputLabel from '../../../../components/custom/inputLabel';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FlexLayout, Text, Card } from "../../../../components/custom/styles";

const Demo = () => {

  const alertText = "Please note that during high market volatility or illiquidity periods, trades reqested on a demo platform may differ to trades requested on live accounts.<br>We do our best to ensure our demo platforms reflect real life trading environment, but this isn't always possible.";

  const tooltipText = "Give our ZERO account a try with your new Everest demo account and experience trading while never having to pay a cent in commissions.<br><br>The spreads on ZERO aren't anywhere as low as our RAW, but it's a good opportunity for you to try us out.";

  const leverageOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
    { value: '300', label: '300' },
    { value: '400', label: '400' },
    { value: '500', label: '500' }
  ];

  const platformOptions = [
    { value: 'MT4', label: 'MT4' },
    { value: 'MT5', label: 'MT5' },
    { value: 'SUMMIT', label: 'SUMMIT' }
  ];

  const currencyOptions = [
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' },
    { value: 'GBP', label: 'GBP' }
  ];
  
  const validationSchema = Yup.object().shape({
    // accountType: Yup.string()
    //   .required('Please select your account type.'),
    leverage: Yup.string()
      .required('Required'),
    platform: Yup.string()
      .required('Required'),
    baseCurrency: Yup.string()
      .required('Required'),
  });
  

  return (
    <div className="account-types-wrapper">
      <Notification text={alertText} />
        
      <FlexLayout direction="column">
        <Text fontSize="18px" lineHeight="40px" color="#1B222A">
          Create a Demo Account
        </Text>
          <Text fontSize="14px" lineHeight="24px" maxWidth="600px" margin="0 0 15px 0">
            Get yourself a risk-free Everest demo trading account to try out your trading strategies or to simply see how we stack up as a broker. You won't be disappointed.
        </Text>
        <Card maxWidth="400px">
          <Text fontSize="12px" margin="0 0 10px 0" align="left">
            Select Your Trading Account Type
          </Text>
          <Formik
            initialValues={{
              accountType: "ZERO",
              leverage: null,
              platform: null,
              baseCurrency: null,
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <FormGroup row>
                  <Col sm="4">
                    <Radio id="raw-option" name="accountType" value="RAW" label="RAW" info={true} tooltipText={tooltipText} />
                  </Col>
                  <Col sm="4">
                    <Radio id="zero-option" name="accountType" value="ZERO" label="ZERO" info={true} tooltipText={tooltipText} checked={true} />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Select options={leverageOptions} name="leverage" label="Select Your Leverage" />
                </FormGroup>
                <FormGroup>
                  <Select options={platformOptions} name="platform" label="Select Your Platform" />
                  <InputLabel text="Demo accounts expire in 15 days unless you have a funded live account." />
                </FormGroup>
                <FormGroup>
                  <Select options={currencyOptions} name="baseCurrency" label="Select Your Base Currency" />
                  <InputLabel text="Once selected, you can't change it, so pick wisely." />
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit" onClick={(e) => {handleSubmit()}}>Create</Button>
                </FormGroup>
              </Form>
            )}
          </Formik>
        </Card>
      </FlexLayout>
    </div>
  )
}

export default Demo;
