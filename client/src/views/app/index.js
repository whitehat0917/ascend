import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AccountAppLayout from '../../layout/AccountAppLayout';

const GettingStarted = React.lazy(() =>
  import('./getting-started')
);
const DemoAccount = React.lazy(() =>
  import('./getting-started/account-types/demo')
);

const App = ({ match }) => {
  return (
    <AccountAppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/getting-started`} />

            <Route 
              path={`${match.url}/getting-started`}
              render={(props) => <GettingStarted {...props} />}
            />
            <Route
              path={`${match.url}/demo-account`}
              render={(props) => <DemoAccount {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AccountAppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
