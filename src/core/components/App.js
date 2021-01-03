/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import Dashboard from '../containers/Dashboard';
import StockPage from '../../stocks/containers/StockPage';
import TransactionForm from '../../transactions/containers/TransactionFormContainer';
import AppWrapper from './AppWrapper';
import AmplifyPage from '../../core/containers/AmplifyPage';
import PrivateRoute from '../../core/components/PrivateRoute';


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/transactions" component={TransactionForm} />
          <PrivateRoute path="/stocks/:ticker" component={StockPage} />

          <Route path="/login" component={AmplifyPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
