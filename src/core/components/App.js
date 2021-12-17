/* eslint-disable import/no-named-as-default */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { SnackbarProvider } from 'notistack'
import MainPage from 'pages/Main'
import PrivateRoute from 'routes/components/PrivateRoute'
import paths from 'routes/paths'

import AmplifyPage from '../../core/containers/AmplifyPage'
import SavingsDashboard from '../../savings/containers/Dashboard'
import StockPage from '../../stocks/containers/StockPage'
import StocksDashboard from '../containers/Dashboard'
import AppWrapper from './AppWrapper'
import NotFoundPage from './NotFoundPage'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        <SnackbarProvider>
          <Switch>
            <PrivateRoute exact component={MainPage} path={paths.MAIN} />
            <PrivateRoute
              exact
              component={StocksDashboard}
              path={paths.STOCKS_DASHBOARD}
            />
            <PrivateRoute component={StockPage} path={paths.STOCK_TICKER} />
            <PrivateRoute
              exact
              component={SavingsDashboard}
              path={paths.SAVINGS_DASHBOARD}
            />

            <Route component={AmplifyPage} path={paths.LOGIN} />
            <Route component={NotFoundPage} />
          </Switch>
        </SnackbarProvider>
      </AppWrapper>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
}

export default hot(module)(App)
