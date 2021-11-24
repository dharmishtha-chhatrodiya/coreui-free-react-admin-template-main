import { ADD_NOTIFICATION } from './Types'

export const showSuccess = (type, text = '') => {
  const showText = text === '' ? `${type} added successfully!` : text
  return {
    type: ADD_NOTIFICATION,
    payload: { type: 'success', text: showText },
  }
}

export const showError = (text) => {
  console.log('error inn action helper', text)
  if (text === '') {
    // eslint-disable-next-line no-param-reassign
    text = 'There was some error Processing your request.'
  }
  return {
    type: ADD_NOTIFICATION,
    payload: {
      type: 'error',
      text,
    },
  }
}

export const limit = 9
