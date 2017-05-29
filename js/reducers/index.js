import { combineReducers } from 'redux'
import counter from './counter'
// import visibilityFilter from './visibilityFilter'
import client from '../lib/apollo'

const rootReducer = combineReducers({
  counter,
  apollo: client.reducer()
  // visibilityFilter
})

export default rootReducer
