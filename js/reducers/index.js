// TODO: Re-introduce persister but blacklist some apollo stuff.
// import { AsyncStorage } from 'react-native'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
// TODO: Re-introduce persister but blacklist some apollo stuff.
// import { persistStore, autoRehydrate } from 'redux-persist'
import logger from 'redux-logger'
import counter from './counter'
import currentGame from './currentGame'
import client from '../lib/apollo'

const rootReducer = combineReducers({
  counter,
  currentGame,
  apollo: client.reducer()
})

export const store = createStore(
  rootReducer,
  {}, // initial state. TODO: Is this right?
  compose(
    applyMiddleware(client.middleware(), logger)
    // TODO: Re-introduce persister but blacklist some apollo stuff.
    // autoRehydrate()
  )
)

// TODO: Re-introduce persister but blacklist some apollo stuff.
// persistStore(
//   store,
//   {
//     storage: AsyncStorage
//   }
// )
