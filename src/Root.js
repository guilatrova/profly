import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { ApolloProvider } from '@apollo/client';
import DateFnsUtils from '@date-io/date-fns';
import { ConnectedRouter } from 'connected-react-router';

import apolloClient from './core/apollo';
import { AuthenticationProvider } from './core/authentication';
import App from './core/components/App';

const onRedirectCallback = () => {
  window.location.href = window.location.origin;
};

const onLogoutCallback = () => {
  window.location.href = `${window.location.origin}/login`;
};

export default class Root extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <AuthenticationProvider onLogoutCallback={onLogoutCallback} onRedirectCallback={onRedirectCallback}>
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
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
