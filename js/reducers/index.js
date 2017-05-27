import { combineReducers } from 'redux'
import counter from './counter'
// import visibilityFilter from './visibilityFilter'

const counterApp = combineReducers({
  counter,
  // visibilityFilter
})

export default counterApp
