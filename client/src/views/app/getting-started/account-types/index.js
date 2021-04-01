import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { connect } from "react-redux";

import { setDetails } from "../../../../redux/actions";

const AccountType = ({ history, requestBody, setDetails }) => {
  const [state, updateState] = useState({
    accountType: requestBody.accountType,
    rawCardOpen: false,
    classicCardOpen: false
  });

  const showCardBack = (e, card) => {
    e.preventDefault();
    e.stopPropagation();
    if (card === 'raw')
      updateState({...state, rawCardOpen: true});
    else if (card === 'classic')
      updateState({...state, classicCardOpen: true});
  }

  const closeCardBack = (e, card) => {
    e.preventDefault();
    e.stopPropagation();
    if (card === 'raw')
      updateState({...state,  rawCardOpen: false});
    else if (card === 'classic')
      updateState({...state, classicCardOpen: false});
  }

  const setAccountType = (e, type) => {
    e.preventDefault();
    updateState({...state, accountType: type});
  }

  const goNext = (e) => {
    e.preventDefault();
    setDetails({accountType: state.accountType});
    history.push("/app/getting-started/currency");
  }

  return (
    <div className="account-types-wrapper">
      <Row>
        <Colxx xxs="12">
          <h2>Pick the trading account that suits you</h2>
          <div className="account-type-widgets">
              <div
                className={`card back-black ${state.rawCardOpen ? 'show-back' : ''} ${state.accountType === "RAW" ? "active" : ""}`}
                onClick={(e) => setAccountType(e, "RAW")}
              >
                  <div className="card-body">
                      <div className="card-front">
                          <h3 className="widget-title">RAW</h3>
                          <div className="widget-info" onClick={(e) => showCardBack(e, 'raw')}></div>
                          <ul className="features">
                              <li>
                                  <h5>Spreads</h5>
                                  <span>from 0.0 pips</span>
                              </li>
                              <li>
                                  <h5>Minimum Deposit</h5>
                                  <span>$250</span>
                              </li>
                              <li>
                                  <h5>Commission</h5>
                                  <span>$7 per round turn</span>
                              </li>
                          </ul>
                      </div>
                      <div className="card-back">
                          <h3 className="widget-title">RAW</h3>
                          <div className="widget-info-close" onClick={(e) => closeCardBack(e, 'raw')}></div>
                          <p className="mt-3">
                            The most popular account type at Everest as we don't add any mark ups whatsoever. We do charge an extremely competitive small commission fee though.
                          </p>
                          <p>
                            As always, there are never any hidden fees. Peace of mind guaranteed!
                          </p>
                      </div>
                  </div>
              </div>
              <div
                className={`card back-primary ${state.classicCardOpen ? 'show-back' : ''} ${state.accountType === "CLASSIC" ? "active" : ""}`}
                onClick={(e) => setAccountType(e, "CLASSIC")}
              >
                  <div className="card-body">
                      <div className="card-front">
                          <h3 className="widget-title">CLASSIC</h3>
                          <div className="widget-info" onClick={(e) => showCardBack(e, 'classic')}></div>
                          <ul className="features">
                              <li>
                                  <h5>Spreads</h5>
                                  <span>from 0.3 pips</span>
                              </li>
                              <li>
                                  <h5>Minimum Deposit</h5>
                                  <span>$250</span>
                              </li>
                              <li>
                                  <h5>Commission</h5>
                                  <span>$0</span>
                              </li>
                          </ul>
                      </div>
                      <div className="card-back">
                          <h3 className="widget-title">CLASSIC</h3>
                          <div className="widget-info-close" onClick={(e) => closeCardBack(e, 'classic')}></div>
                          <p className="mt-3">
                            Experience trading while never having to pay a cent in commissions with our CLASSIC account. 30% of our traders use this account.
                          </p>
                          <p>
                            The spreads on our CLASSIC account are low too, and as always, there are zero hidden fees when it comes to trading with Everest.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
          <p className="under-text">
            or get a risk-free <NavLink to="/app/demo-account">Demo Account</NavLink>
          </p>
          <div className="mt-4">
            <button className="btn btn-primary" disabled={!state.accountType} onClick={goNext}>NEXT</button>
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

export default connect(mapStateToProps, mapActionsToProps)(AccountType);


