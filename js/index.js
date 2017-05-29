import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import counterApp from './reducers'
import React, { Component } from 'react'
import AppWithNavigationState from './navigator'
import { ApolloProvider } from 'react-apollo'
import client from './lib/apollo'

let store = createStore(counterApp)

class HomophoneGame extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AppWithNavigationState />
        </ApolloProvider>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('HomophoneGame', () => HomophoneGame)
