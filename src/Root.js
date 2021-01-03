import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './core/components/App';
import { ApolloProvider } from '@apollo/client';
import apolloClient from "./core/apollo";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AuthenticationProvider } from './core/authentication';

const onRedirectCallback = () => {
  window.location.href = window.location.origin;
};

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <AuthenticationProvider onRedirectCallback={onRedirectCallback}>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <ConnectedRouter history={history}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <App />
              </MuiPickersUtilsProvider>
            </ConnectedRouter>
          </ApolloProvider>
        </Provider>
      </AuthenticationProvider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
