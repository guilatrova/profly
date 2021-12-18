/* eslint-disable import/no-named-as-default */
import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { SnackbarProvider } from 'notistack'
import Login from 'pages/Login'
import MainPage from 'pages/Main'
import NotFoundPage from 'pages/NotFound'
import StocksMain from 'pages/StocksMain'
import StockTicker from 'pages/StockTicker'
import WalletsMain from 'pages/WalletsMain'
import PrivateRoute from 'routes/components/PrivateRoute'
import paths from 'routes/paths'

import AppWrapper from './AppWrapper'

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
              component={StocksMain}
              path={paths.STOCKS_DASHBOARD}
            />
            <PrivateRoute component={StockTicker} path={paths.STOCK_TICKER} />
            <PrivateRoute
              exact
              component={WalletsMain}
              path={paths.SAVINGS_DASHBOARD}
            />

            <Route component={Login} path={paths.LOGIN} />
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
