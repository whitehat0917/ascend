import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, FormGroup, Button } from "reactstrap";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Notification from "../../../components/custom/notification";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { Text } from "../../../components/custom/styles";
import Radio from "../../../components/custom/radio";
import StyledDropzone from "../../../components/custom/dropzone";
import { DropzoneComponentWrapper, SkipButton } from "./verification.style";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Start = ({ history, userId, register, countryCode }) => {
  const validationSchema = Yup.object().shape({
    identify: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  const [state, updateState] = useState({
    idFrontVerification: { file: null, status: false },
    idBackVerification: { file: null, status: false },
    bankDocVerification: { file: null, status: false },
    idOption: "",
    loading: false,
  });

  const setIdFrontVerification = (id, status) => {
    updateState({
      ...state,
      idFrontVerification: { file: id, status: status },
    });
  };

  const setIdBackVerification = (id, status) => {
    updateState({ ...state, idBackVerification: { file: id, status: status } });
  };

  const setBankVerification = (bank, status) => {
    updateState({
      ...state,
      bankDocVerification: { file: bank, status: status },
    });
  };

  const idChange = (option) => {
    updateState({ ...state, idOption: option });
  };

  const checkValidation = () => {
    if (
      state.idFrontVerification.file &&
      state.idFrontVerification.status &&
      state.idBackVerification.file &&
      state.idBackVerification.status &&
      state.bankDocVerification.file &&
      state.bankDocVerification.status
    ) {
      return true;
    }
    return !(
      (state.idFrontVerification.file && !state.idFrontVerification.status) ||
      (state.idBackVerification.file && !state.idBackVerification.status) ||
      (state.bankDocVerification.file && !state.bankDocVerification.status)
    );
  };

  const alertText = "To activate you account and to start trading, you need to";
  const alertButtons = [
    {
      title: "upload documents",
      icon: "/assets/img/icons/upload-icon.svg",
      path: "/pages/verification",
    },
    {
      title: "make your deposit",
      icon: "/assets/img/icons/deposit-icon.svg",
      path: "/pages/deposit",
    },
  ];

  const handleSubmit = (values) => {
    updateState({
      ...state,
      loading: true
    });
    
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("country", register.requestBody.country);
    formData.append("address", values['address']);
    formData.append("identify", values['identify']);
    if (state.bankDocVerification.file)
      formData.append("address_front", state.bankDocVerification.file);
    if (state.idFrontVerification.file)
      formData.append("identify_front", state.idFrontVerification.file);
    if (state.idBackVerification.file)
      formData.append("identify_back", state.idBackVerification.file);

    axios.post("/api/documents/upload", formData)
    .then((res) => {
      updateState({
        ...state,
        loading: false
      });
      console.log(res);
      console.log(res.data);
      if(res.data.success) {
        history.push("/pages/deposit");
      }else {
        alert("Failed to upload documents");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to upload documents");
      updateState({
        ...state,
        loading: false
      });
    });
  };

  return (
    <div className="account-types-wrapper">
      <Notification text={alertText} buttons={alertButtons} history={history} />
      <Row>
        <Colxx xxs="12">
          <Formik
            initialValues={{
              identify: null,
              address: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleSubmit(values);
              // history.push("/pages/deposit");
            }}
          >
            {({ isValid }) => (
              <Form>
                <h2>Verify Your Identity & Address</h2>
                <div className="d-flex align-items-center justify-content-center flex-wrap">
                  <DropzoneComponentWrapper
                    className={
                      state.idFrontVerification.file ||
                      state.idBackVerification.file
                        ? state.idFrontVerification.status &&
                          state.idBackVerification.status
                          ? "is-valid id-valid"
                          : (state.idFrontVerification.status ||
                              state.idBackVerification.status) &&
                            state.idOption === "passport"
                          ? "is-valid id-valid"
                          : "is-invalid id-valid"
                        : ""
                    }
                  >
                    <div className="dropzone-info">
                      <Text
                        fontSize="12px"
                        maxWidth="15rem"
                        align="left"
                        padding="0 15px 10px 15px"
                      >
                        Choose your Proof of Identify you want to upload
                      </Text>
                      <FormGroup className="mb-0">
                        <Radio
                          id="passport-identify"
                          name="identify"
                          value={"Passport"}
                          label={"Passport"}
                          handleChange={idChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="passport-national"
                          name="identify"
                          value={"National ID"}
                          label={"National ID"}
                          handleChange={idChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="passport-driver"
                          name="identify"
                          value={"Driver''s License"}
                          label={"Driver's License"}
                          handleChange={idChange}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="passport-other"
                          name="identify"
                          value={"Other"}
                          label={"Other"}
                          handleChange={idChange}
                        />
                      </FormGroup>
                    </div>
                    <AwesomeSlider>
                      <div>
                        <StyledDropzone
                          type="id-front"
                          verificationFile={state.idFrontVerification}
                          setVerification={setIdFrontVerification}
                        />
                      </div>
                      <div>
                        <StyledDropzone
                          type="id-back"
                          verificationFile={state.idBackVerification}
                          setVerification={setIdBackVerification}
                        />
                      </div>
                    </AwesomeSlider>
                    <Text fontSize="12px" margin="1.5rem 0 1.3rem 0">
                      Shouldn't be expired
                    </Text>
                  </DropzoneComponentWrapper>
                  <DropzoneComponentWrapper
                    className={
                      state.bankDocVerification.file
                        ? state.bankDocVerification.status
                          ? "is-valid bank-valid"
                          : "is-invalid bank-valid"
                        : ""
                    }
                  >
                    <div className="dropzone-info">
                      <Text
                        fontSize="12px"
                        maxWidth="15rem"
                        align="left"
                        padding="0 15px 10px 15px"
                      >
                        Choose your Proof of Identify you want to upload
                      </Text>
                      <FormGroup className="mb-0">
                        <Radio
                          id="address-bank"
                          name="address"
                          value={"Bank Statement"}
                          label={"Bank Statement"}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="address-utility"
                          name="address"
                          value={"Utility Bill"}
                          label={"Utility Bill"}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="address-internet"
                          name="address"
                          value={"Internet Bill"}
                          label={"Internet Bill"}
                        />
                      </FormGroup>
                      <FormGroup className="mb-0">
                        <Radio
                          id="address-other"
                          name="address"
                          value={"Other"}
                          label={"Other"}
                        />
                      </FormGroup>
                    </div>
                    <StyledDropzone
                      type="bank"
                      verificationFile={state.bankDocVerification}
                      setVerification={setBankVerification}
                    />
                    <Text fontSize="12px" margin="0 0 1.3rem 0">
                      Not older than 6 months
                    </Text>
                  </DropzoneComponentWrapper>
                </div>
                <Text
                  fontSize="12px"
                  maxWidth="25rem"
                  margin="1rem auto 0"
                  padding="0"
                  color={!checkValidation() ? "#F73757" : ""}
                >
                  The files need to be in the following file formats: doc, docx,
                  pdf, jpg, or png
                </Text>
                <div className="mt-4">

                  <Button
                    color="primary"
                    type="submit"
                    className={`btn-shadown btn-multiple-state ${state.loading ? 'show-spinner' : ''}`}
                    disabled={
                      !isValid ||
                      state.loading ||
                      !(
                        (state.idFrontVerification.status &&
                          state.idBackVerification.status &&
                          state.idOption !== "passport") ||
                        ((state.idFrontVerification.status ||
                          state.idBackVerification.status) &&
                          state.idOption === "passport")
                      ) ||
                      !state.bankDocVerification.status
                    }
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">SUBMIT</span>
                  </Button>
                </div>
                <SkipButton>
                  <a
                    href="#"
                    className="text-lg-center skip"
                    onClick={() => history.push("/pages/deposit")}
                  >
                    Skip
                  </a>
                </SkipButton>
              </Form>
            )}
          </Formik>
        </Colxx>
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => {
    const { userId } = state.register
    return {
        userId: userId,
        register: state.register,
        countryCode: state.settings.countryCode
    };
};

const mapDispatchToProp = (dispatch) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProp)(Start);

