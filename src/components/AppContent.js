/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useToasts } from 'src/ToastManager'
import { connect } from 'react-redux'

const AppContent = (props) => {
  const toastManager = useToasts()

  useEffect(() => {
    const { type, text, show } = props.notifications
    console.log('props in content', props.notifications)
    if (show) toastManager.addToast({ type, text })
  }, [props.notifications])
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

// export default React.memo(AppContent)

const mapStateToProp = (state) => {
  return {
    notifications: state.auth.notification,
  }
}

export default connect(mapStateToProp)(React.memo(AppContent))
