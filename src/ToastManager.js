/* eslint-disable react/prop-types */
// @flow

import React, { Component } from 'react'
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core'
import { Close, CheckCircle, Error, Info, Warning } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { amber, green } from '@material-ui/core/colors'
import clsx from 'clsx'

const Ctx = React.createContext()

// Styled Components
// ==============================

const styles = (theme) => ({
  toastContainer: {
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1201,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
}

// Provider
// ==============================

function MySnackbarContentWrapper(props) {
  const { classes } = props
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

class ToastProvider extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = { toasts: [] }

  addToast = ({ type = 'info', text = '' }) => {
    this.setState({ open: true, text, type })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  // avoid creating a new fn on every render
  onDismiss = (id) => () => this.remove(id)

  render() {
    const { open, type, text } = this.state
    const { classes } = this.props
    console.log('state', this.state)
    return (
      <Ctx.Provider
        value={{
          addToast: this.addToast,
        }}
      >
        {this.props.children}
        <div className={classes.toastContainer}>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              classes={classes}
              onClose={this.handleClose}
              variant={type}
              message={text}
            />
          </Snackbar>
        </div>
      </Ctx.Provider>
    )
  }
}

export default withStyles(styles)(ToastProvider)

export const ToastConsumer = Ctx.Consumer

export const useToasts = () => React.useContext(Ctx)
