import { AppRegistry } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import React, { Component } from 'react'
import AppWithNavigationState from './navigator'
import { ApolloProvider } from 'react-apollo'
import client from './lib/apollo'
import logger from 'redux-logger'

const store = createStore(
  rootReducer,
  {}, // initial state
  compose(
    applyMiddleware(client.middleware(), logger)
  )
)


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
