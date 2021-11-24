/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_NOTIFICATION,
  CREATE_USER,
  LOGIN_ERR0RS,
  SIDEBAR_UPDATE,
  USER_LOGIN,
} from '../Actions/Types'

const initialState = {
  isAuthenticated: false,
  sidebarShow: true,
  notification: {},
  user: {},
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_ERR0RS:
      return {
        ...state,
        error: action.payload.data,
        user: {
          sucess: false,
          isAuthenticated: false,
        },
      }
    case SIDEBAR_UPDATE:
      return {
        ...state,
        sidebarShow: action.payload,
      }
    // Notification  state change
    case ADD_NOTIFICATION:
      return {
        ...state,
        notification: { ...action.payload, show: true },
      }
    case CREATE_USER:
      return {
        ...state,
        user: {
          success: true,
          data: action.payload,
        },
      }
    case USER_LOGIN:
      return {
        ...state,
        user: {
          success: true,
          isAuthenticated: true,
          data: action.payload.data,
        },
      }
    default:
      return state
  }
}
