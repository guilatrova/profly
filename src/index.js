/* eslint-disable import/default */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import runtime from 'serviceworker-webpack-plugin/lib/runtime'

import configureStore, { history } from './core/store/configureStore'
import Root from './Root'

const store = configureStore()

render(
  <AppContainer>
    <Root history={history} store={store} />
  </AppContainer>,
  document.getElementById('app')
)

if (process.env.NODE_ENV == 'production') {
  if ('serviceWorker' in navigator) {
    try {
      runtime.register()
      // eslint-disable-next-line no-console
      console.log('[SW] Registered!')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[SW]', err)
    }
  }
}

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NewRoot = require('./Root').default
    render(
      <AppContainer>
        <NewRoot history={history} store={store} />
      </AppContainer>,
      document.getElementById('app')
    )
  })
}
