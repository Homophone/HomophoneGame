import { StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Play from './screens/play'
import React, { Component } from 'react'

const AppRouteConfigs = {
  Main: { screen: Home },
  Play: { screen: Play }
}
const AppNavigator = StackNavigator(AppRouteConfigs)

export default class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
