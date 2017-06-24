import { StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Play from './screens/play'
import Score from './screens/score'
import Stats from './screens/stats'
import React, { Component } from 'react'

const AppRouteConfigs = {
  Main: { screen: Home },
  Play: { screen: Play },
  Score: { screen: Score },
  Stats: { screen: Stats }
}
const AppNavigator = StackNavigator(AppRouteConfigs)

export default class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}
