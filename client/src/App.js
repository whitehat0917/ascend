import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from "axios";
import { IntlProvider } from 'react-intl';
import AppLocale from './lang';
import { getDirection } from './helpers/Utils';
import { setCountryCode } from './redux/actions';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewPage = React.lazy(() =>
  import(/* webpackChunkName: "views-pages" */ './views/pages')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewRegister = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/register')
);
const ViewLogin = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/login')
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }

  componentDidMount()  {
    this.setState({ isLoading: true });
    axios.get('https://ipapi.co/json/').then((response) => {
      const data = response.data;
      this.props.setCountryCode(data.country.toLowerCase());
      this.setState({ isLoading: false });
    }).catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
    });
  }

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    const { isLoading } = this.state;

    return (
      <div className="h-100">
        {
          isLoading ? (
            <div className="loading" />
          ) : (
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}
            >
              <>
                <Suspense fallback={<div className="loading" />}>
                  <Router>
                    <Switch>
                      <Route
                        path="/register"
                        render={(props) => <ViewRegister {...props} />}
                      />
                      <Route
                        path="/login"
                        render={(props) => <ViewLogin {...props} />}
                      />
                      <Route
                        path="/app"
                        render={(props) => <ViewApp {...props} />}
                      />
                      <Route
                        path="/pages"
                        render={(props) => <ViewPage {...props} />}
                      />
                      <Route
                        path="/error"
                        exact
                        render={(props) => <ViewError {...props} />}
                      />
                      <Route
                        path="/"
                        exact
                        render={(props) => <ViewMain {...props} />}
                      />
                      <Redirect to="/error" />
                    </Switch>
                  </Router>
                </Suspense>
              </>
            </IntlProvider>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale, countryCode } = settings;
  return { locale, countryCode };
};
const mapActionsToProps = (dispatch) => {
  return {
    setCountryCode: (data) => dispatch(setCountryCode(data)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(App);
