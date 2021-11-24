import axios from 'axios'
import { showError, showSuccess } from './ActionsHelper'
// eslint-disable-next-line camelcase
import { CREATE_USER, LOGIN_ERR0RS, USER_LOGIN } from './Types'

// Register
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`http://localhost:4000/api/user`, userData)
    .then((result) => dispatch({ type: CREATE_USER, payload: result }))
    .catch((err) => dispatch({ type: LOGIN_ERR0RS, payload: err.response }))
}

//login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('http://localhost:4000/api/user/login', userData)
    .then((result) => {
      const userData = (result.data && result.data) || {}
      console.log('userData', userData)
      localStorage.setItem('name', userData.name)
      localStorage.setItem('email', userData.email)
      dispatch({ type: USER_LOGIN, payload: result })
      dispatch(showSuccess('', 'User Login successfully!'))
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ERR0RS, payload: err.response })
      dispatch(showError('There was some error while login'))
    })
}
