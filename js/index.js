import {
  StackNavigator,
} from 'react-navigation'
import Home from './screens/home'
import Play from './screens/play'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterApp from './reducers'
import React, { Component } from 'react'

let store = createStore(counterApp)

const AppRouteConfigs = {
  Main: { screen: Home },
  Play: { screen: Play }
}
const AppNavigator = StackNavigator(AppRouteConfigs);

class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

class HomophoneGame extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
