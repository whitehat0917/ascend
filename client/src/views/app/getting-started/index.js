import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AccountType = React.lazy(() =>
  import('./account-types')
);
const Currency = React.lazy(() =>
  import('./currency')
);
const Platforms = React.lazy(() =>
  import('./platforms')
);
const PersonalInfo = React.lazy(() =>
  import('./personal-info')
);
const Address = React.lazy(() =>
  import('./address')
);
const EmploymentInfo = React.lazy(() =>
  import('./employment')
);
const TradingExperience1 = React.lazy(() =>
  import('./trading/first')
);
const TradingExperience2 = React.lazy(() =>
  import('./trading/second')
);
const Knowledge = React.lazy(() =>
  import('./knowledge')
);
const SourceFunds = React.lazy(() =>
  import('./funds')
);
const ProfessionalTrader = React.lazy(() =>
  import('./professional')
);
const Notification1 = React.lazy(() =>
  import('./notification/first')
);
const Notification2 = React.lazy(() =>
  import('./notification/second')
);

const GettingStarted = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/account-type`} />
      <Route
        path={`${match.url}/account-type`}
        render={(props) => <AccountType {...props} />}
      />
      <Route
        path={`${match.url}/currency`}
        render={(props) => <Currency {...props} />}
      />
      <Route
        path={`${match.url}/platforms`}
        render={(props) => <Platforms {...props} />}
      />
      <Route
        path={`${match.url}/personal-info`}
        render={(props) => <PersonalInfo {...props} />}
      />
      <Route
        path={`${match.url}/residential-address`}
        render={(props) => <Address {...props} />}
      />
      <Route
        path={`${match.url}/employment-info`}
        render={(props) => <EmploymentInfo {...props} />}
      />
      <Route
        path={`${match.url}/trading-experience-1`}
        render={(props) => <TradingExperience1 {...props} />}
      />
      <Route
        path={`${match.url}/trading-experience-2`}
        render={(props) => <TradingExperience2 {...props} />}
      />
      <Route
        path={`${match.url}/knowledge`}
        render={(props) => <Knowledge {...props} />}
      />
      <Route
        path={`${match.url}/source-funds`}
        render={(props) => <SourceFunds {...props} />}
      />
      <Route
        path={`${match.url}/professional-trader`}
        render={(props) => <ProfessionalTrader {...props} />}
      />
      <Route
        path={`${match.url}/notification-1`}
        render={(props) => <Notification1 {...props} />}
      />
      <Route
        path={`${match.url}/notification-2`}
        render={(props) => <Notification2 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default GettingStarted;
