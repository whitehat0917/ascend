import React, { useState } from 'react';
import { Row } from 'reactstrap';
import { connect } from "react-redux";
import { Colxx } from '../../../../components/common/CustomBootstrap';
import { setDetails } from "../../../../redux/actions";

const Start = ({ history, requestBody, setDetails }) => {
  const [state, updateState] = useState({
    platform: requestBody.platform,
  });

  const setPlatform = (e, platform) => {
    e.preventDefault();
    updateState({...state, platform: platform});
  }
  
  const goNext = (e) => {
    e.preventDefault();
    setDetails({ platform: state.platform });
    history.push("/app/getting-started/personal-info");
  }

  return (
    <div className="text-center">
      <Row>
        <Colxx xxs="12">
          <h2>Pick the trading platform you’d like to trade with</h2>
          <p className="text-muted">You can trade with more than one once you’ve completed your registration</p>
          <div className="d-flex align-items-center justify-content-center flex-wrap">
            <div className={`card icon-card ${state.platform === "MT4" ? "active" : ""}`} onClick={(e) => setPlatform(e, "MT4")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/mt4-icon${state.platform === "MT4" ? '-active' : ''}.svg`} alt="MT4 Icon" />
                </div>
                <span>MT4</span>
                <p>by MetaQuotes</p>
              </div>
            </div>
            
            <div className={`card icon-card ${state.platform === "MT5" ? "active" : ""}`} onClick={(e) => setPlatform(e, "MT5")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/mt5-icon${state.platform === "MT5" ? '-active' : ''}.svg`} alt="MT5 Icon" />
                </div>
                <span>MT5</span>
                <p>by MetaQuotes</p>
              </div>
            </div>
            
            <div className={`card icon-card ${state.platform === "SUMMIT" ? "active" : ""}`} onClick={(e) => setPlatform(e, "SUMMIT")}>
              <div className="card-body">
                <div className="icon">
                  <img src={`/assets/img/icons/summit-icon${state.platform === "SUMMIT" ? '-active' : ''}.svg`} alt="SUMMIT Icon" />
                </div>
                <span>SUMMIT</span>
                <p>by Everest</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary" disabled={!state.platform} onClick={goNext}>NEXT</button>
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

