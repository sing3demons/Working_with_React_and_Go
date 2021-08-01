import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import LoadingPage from './LoadingPage.jsx'

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
})

export default function Login() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [hidePassword, setHidePassword] = useState(true)
  let checkType = ''

  const onSubmit = async ({ email, password }) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/signin', { email, password })
      localStorage.setItem('token', response.data.token)
      setIsLoading(false)
      history.replace('/')
      history.go(0)
    } catch (error) {
      console.log(error)
    }
  }
  if (hidePassword === true) checkType = 'password'
  else checkType = 'text'

  const checkPassword = () => setHidePassword(!hidePassword)

  if (isLoading) <LoadingPage />

  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        {errors.email && (
          <p className="alert alert-danger">{errors.email?.message}</p>
        )}
        {errors.password && (
          <p className="alert alert-danger">{errors.password?.message}</p>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors?.email && 'is-invalid'}`}
            id="email"
            name="email"
            {...register('email', { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={checkType}
              className={`form-control ${errors?.password && 'is-invalid'}`}
              id="password"
              name="password"
              {...register('password', { required: true })}
            />
            <div className="input-group-append">
              <span className="input-group-text" onClick={checkPassword}>
                {hidePassword ? (
                  <Eye width="24" height="24" />
                ) : (
                  <EyeSlash width="24" height="24" />
                )}
              </span>
            </div>
          </div>
        </div>
        <input type="submit" className="btn btn-success" value="login" />
      </form>
    </>
  )
}
