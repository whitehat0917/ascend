import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { connect } from "react-redux";

import { Colxx } from '../../../../components/common/CustomBootstrap';

import { setDetails } from "../../../../redux/actions";

const Start = ({ history, requestBody, setDetails }) => {
  const [state, updateState] = useState({
    currency: requestBody.currency,
  });

  const setCurrency = (e, type) => {
    e.preventDefault();
    updateState({...state, currency: type});
  }
  const goNext = (e) => {
    e.preventDefault();
    setDetails({ currency: state.currency });
    history.push("/app/getting-started/platforms");
  }

  return (
    <div className="text-center">
      <Row>
        <Colxx xxs="12">
          <h2>Pick the base currency you want your Everest account to be in</h2>
          <p className="text-muted">Once you’ve picked it, you can’t change it…</p>
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <div className={`card icon-card ${state.currency === "EUR" ? "active" : ""}`} onClick={(e) => setCurrency(e, "EUR")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/euro-icon${state.currency === "EUR" ? '-active' : ''}.svg`} alt="Euro Icon" />
                </div>
                <span>EUR</span>
              </div>
            </div>
            
            <div className={`card icon-card ${state.currency === "USD" ? "active" : ""}`} onClick={(e) => setCurrency(e, "USD")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/usd-icon${state.currency === "USD" ? '-active' : ''}.svg`} alt="USD Icon" />
                </div>
                <span>USD</span>
              </div>
            </div>
            
            <div className={`card icon-card ${state.currency === "GBP" ? "active" : ""}`} onClick={(e) => setCurrency(e, "GBP")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/gbp-icon${state.currency === "GBP" ? '-active' : ''}.svg`} alt="GBP Icon" />
                </div>
                <span>GBP</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary" disabled={!state.currency} onClick={goNext}>NEXT</button>
          </div>
        </Colxx>
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

