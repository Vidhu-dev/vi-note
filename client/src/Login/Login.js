import './Login.css'
import React, { useEffect, useState } from 'react'
import Sidebar from '../SideNavBar/Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../Redux/Features/authSlice'
import { register } from '../Redux/Features/authSlice'
import toast, { Toaster } from 'react-hot-toast'

const initalState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
}

function Login() {
  const { loading, error } = useSelector((state) => ({ ...state.auth }))
  const [isUser, setIsUser] = useState(false)
  const [formValue, setFormValue] = useState(initalState)
  const { email, password, firstName, lastName, confirmPassword } = formValue

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSignIn = async (e) => {
    e.preventDefault()
    if (email && password) {
      await toast.promise(dispatch(login({ formValue })).unwrap(), {
        loading: 'Signing in...',
        success: () => {
          return 'Signed in successfully'
        },
        error: (err) => err,
      })
      navigate('/')
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('passwords do not match')
    }
    if (email && password && firstName && lastName && confirmPassword) {
      toast.promise(dispatch(register({ formValue })).unwrap(), {
        loading: 'Registering...',
        success: () => 'Registered successfully',
        error: (err) => err,
      })
      navigate('/')
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  return (
    <div className="login">
      <Sidebar />
      <div className="login-container">
        <Link className="login-logo" to="/">
          Vi-Note
        </Link>
        <div className="login-form-container">
          <form className="login-form" action="">
            <div className="login-form-heading">
              {!isUser ? 'Sign In' : 'Sign Up'}
            </div>
            {isUser && (
              <input
                onChange={onInputChange}
                required={true}
                type="text"
                placeholder="first name"
                name="firstName"
                value={firstName}
              />
            )}
            {isUser && (
              <input
                onChange={onInputChange}
                value={lastName}
                type="text"
                placeholder="last name"
                name="lastName"
              />
            )}
            <input
              required={true}
              onChange={onInputChange}
              value={email}
              type="email"
              name="email"
              placeholder="example@123gmail.com"
            />
            <input
              required={true}
              onChange={onInputChange}
              value={password}
              type="password"
              name="password"
              id=""
              placeholder="password"
            />
            {isUser && (
              <input
                required={true}
                onChange={onInputChange}
                value={confirmPassword}
                type="password"
                name="confirmPassword"
                id=""
                placeholder="confirm password"
              />
            )}
            <button
              onClick={!isUser ? handleSignIn : handleSignUp}
              className="login-form-submit"
            >
              {!isUser ? 'Sign In' : 'Sign Up'}
            </button>
            <label htmlFor="">
              {isUser ? 'Registered user?' : ' Not a registered user?'}
              <button
                className="login-form-change"
                onClick={(e) => {
                  e.preventDefault()
                  setFormValue(initalState)
                  setIsUser(!isUser)
                }}
              >
                {isUser ? 'Sign In' : 'Sign Up'}
              </button>
              now!
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
