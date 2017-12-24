import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import {enableBatching} from 'redux-batched-actions';

import App from './components/app'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import reducer from './reducers/index'
import { isProd } from '../shared/util'

const store = createStore(enableBatching(reducer),isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>;

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./components/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}