import {
  StackNavigator,
} from 'react-navigation'
import Home from './screens/home'
import Play from './screens/play'
import {
  AppRegistry
} from 'react-native'

const HomophoneGame = StackNavigator({
  Main: { screen: Home },
  Play: { screen: Play }
});

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
