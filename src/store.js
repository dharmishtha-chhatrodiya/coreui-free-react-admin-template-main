// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './Reducers'

const initialState = {}
const middleware = [thunk, logger]

const store = createStore(
  rootReducer,
  initialState,
  compose(composeWithDevTools(applyMiddleware(...middleware))),
)

export default store
