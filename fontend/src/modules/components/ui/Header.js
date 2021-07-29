import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Header() {
  let loginLink = ''
  const tdnClass = 'text-decoration-none'

  const history = useHistory()
  const [jwt, setJwt] = useState('')

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
    history.go(0)
  }
  if (jwt === '') {
    loginLink = (
      <Link className={tdnClass} to="/login">
        Login
      </Link>
    )
  } else {
    loginLink = (
      <div className={tdnClass} onClick={logout}>
        logout
      </div>
    )
  }

  useEffect(() => {
    let token = localStorage.getItem('token')

    if (token === null) setJwt('')
    else  setJwt(token)

     
  }, [])

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h1 className="mb-3"> Go Watch a Movie! </h1> <hr className="mb-3" />
        </div>
        <div className="col mt-3 text-end">{loginLink}</div>
      </div>
    </>
  )
}
