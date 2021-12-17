/* eslint-disable import/no-named-as-default */
import React from "react";
import { hot } from "react-hot-loader";
import { Route, Switch } from "react-router-dom";

import { SnackbarProvider } from 'notistack';
import PropTypes from "prop-types";

import PrivateRoute from '../../core/components/PrivateRoute';
import AmplifyPage from '../../core/containers/AmplifyPage';
import SavingsDashboard from '../../savings/containers/Dashboard';
import MainPage from '../../savings/containers/Main';
import StockPage from '../../stocks/containers/StockPage';
import StocksDashboard from '../containers/Dashboard';
import AppWrapper from './AppWrapper';
import NotFoundPage from "./NotFoundPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <SnackbarProvider>
        <Switch>
          <PrivateRoute exact component={MainPage} path="/" />
          <PrivateRoute exact component={StocksDashboard} path="/stocks" />
          <PrivateRoute component={StockPage} path="/stocks/:ticker" />
          <PrivateRoute exact component={SavingsDashboard} path="/savings" />

          <Route component={AmplifyPage} path="/login" />
          <Route component={NotFoundPage} />
        </Switch>
        </SnackbarProvider>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
