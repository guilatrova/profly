import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './core/components/App';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './core/apollo';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AuthenticationProvider } from './core/authentication';

const onRedirectCallback = () => {
  window.location.href = window.location.origin;
};

const onLogoutCallback = () => {
  window.location.href = `${window.location.origin}/login`;
};

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <AuthenticationProvider onRedirectCallback={onRedirectCallback} onLogoutCallback={onLogoutCallback}>
            <ConnectedRouter history={history}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
              </MuiPickersUtilsProvider>
            </ConnectedRouter>
          </AuthenticationProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
