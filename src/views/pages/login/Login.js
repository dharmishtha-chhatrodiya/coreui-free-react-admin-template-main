import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLowVision, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import { loginUser } from 'src/Actions/AuthActions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }
  const user = useSelector((state) => state.auth.user)
  if (user.success === true) {
    return (
      <>
        <Redirect from="/login" to="/dashboard" />
        {() => {
          toast.success('Success Notification !', {
            position: toast.POSITION.TOP_LEFT,
          })
        }}
        <ToastContainer />
      </>
    )
  }
  // console.log(' errors '.errors)
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      defaultValue=""
                      {...register('email', { required: true })}
                      placeholder="email"
                    />
                  </CInputGroup>
                  {errors.email && <h6 className="text-danger m-2"> This field is required</h6>}

                  <CInputGroup className="mb-4">
                    <CInputGroupText onClick={() => setShowPassword(!showPassword)}>
                      <CIcon icon={cilLowVision} />
                    </CInputGroupText>
                    <CFormInput
                      defaultValue=""
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    {/* <Input
        type={values.showPassword ? "text" : "password"}
        onChange={handlePasswordChange("password")}
        value={values.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      /> */}
                  </CInputGroup>
                  {errors.email && <h6 className="text-danger m-2"> This field is required</h6>}

                  <div className="d-grid">
                    <CButton color="link" className="px-0">
                      Forgot password?
                    </CButton>

                    <CButton type="submit" color="primary" className="px-4">
                      Login
                    </CButton>

                    <Link className="px-0 mt-3 text-center" to="/register">
                      Register Now!
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
