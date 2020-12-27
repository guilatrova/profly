import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './core/components/App';
import { ApolloProvider } from '@apollo/client';
import apolloClient from "./core/apollo";

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
