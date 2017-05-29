import { AsyncStorage } from 'react-native'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'
import counter from './counter'
import client from '../lib/apollo'

const rootReducer = combineReducers({
  counter,
  apollo: client.reducer()
})

export const store = createStore(
  rootReducer,
  {}, // initial state. TODO: Is this right?
  compose(
    applyMiddleware(client.middleware(), logger),
    autoRehydrate()
  )
)

persistStore(
  store,
  {
    storage: AsyncStorage
  }
)
