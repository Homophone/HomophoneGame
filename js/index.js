import { AppRegistry } from 'react-native'
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import AppWithNavigationState from './navigator'
import { store } from './reducers'
import client from './lib/apollo'

class HomophoneGame extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <AppWithNavigationState />
      </ApolloProvider>
    )
  }
}

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
