/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";
import StocksDashboard from '../containers/Dashboard';
import SavingsDashboard from '../../savings/containers/Dashboard';
import MainPage from '../../savings/containers/Main';
import StockPage from '../../stocks/containers/StockPage';
import AppWrapper from './AppWrapper';
import AmplifyPage from '../../core/containers/AmplifyPage';
import PrivateRoute from '../../core/components/PrivateRoute';

import { SnackbarProvider } from 'notistack';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <SnackbarProvider>
        <Switch>
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/stocks" component={StocksDashboard} />
          <PrivateRoute path="/stocks/:ticker" component={StockPage} />
          <PrivateRoute exact path="/savings" component={SavingsDashboard} />

          <Route path="/login" component={AmplifyPage} />
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
