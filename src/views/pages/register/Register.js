/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from 'src/Actions/AuthActions'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^.[a-zA-Z0-9 ]+$/, 'Enter Valid Name')
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('This field is required.'),
  email: yup.string().email('Invalid email address').required('This field is required.'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32)
    .required('This field is required'),
})
const Register = (history) => {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(registerUser(data, history))
  }
  const user = useSelector((state) => state.auth.user)
  if (user.success === true) {
    return (
      <>
        <Redirect from="/register" to="/login" />

        {/* {enqueueSnackbar('User added successfully', { variant: 'success' })} */}
      </>
    )
  }
  console.log(' errors ', errors)
  // console.log(watch('username')) // watch input value by passing the name of it
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      defaultValue=""
                      min={2}
                      {...register('name')}
                      autoComplete="name"
                    />
                  </CInputGroup>
                  {errors.name && <h6 className="text-danger m-2"> {errors.name.message}</h6>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      defaultValue=""
                      {...register('email')}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  {errors.email && <h6 className="text-danger m-2"> {errors.email.message}</h6>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText onClick={() => setShowPassword(!showPassword)}>
                      <CIcon icon={cilLowVision} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      defaultValue=""
                      {...register('password')}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.password && (
                    <h6 className="text-danger m-2"> {errors.password.message}</h6>
                  )}

                  <div className="d-grid">
                    <CButton type="submit" color="primary" className="px-4">
                      Register
                    </CButton>
                    <Link className="px-0 mt-3 text-center" to="/login">
                      Login Now!
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

export default Register
