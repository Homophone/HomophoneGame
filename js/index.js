import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterApp from './reducers'
import React, { Component } from 'react'
import AppWithNavigationState from './navigator'

let store = createStore(counterApp)

class HomophoneGame extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
