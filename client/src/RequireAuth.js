import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { setLogout, setUser } from './Redux/Features/authSlice'
import * as api from './Redux/api.js'
import { ClipLoader } from 'react-spinners'

function RequireAuth({ children }) {
  const user = localStorage.getItem('profile')
  const [loading, setLoading] = useState(true) // To handle loading state
  let location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (user) {
          const parsedUser = JSON.parse(user)
          const token = parsedUser?.token
          if (token) {
            const response = await api.isTokenValid(token)
            console.log(response)
          } 
        }
      } catch (error) {
        console.error('Error checking token validity:', error.message) 
        dispatch(setLogout()) 
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [dispatch, user])

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader size={100} aria-label="Loading Spinner" color="#EA2E00" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
