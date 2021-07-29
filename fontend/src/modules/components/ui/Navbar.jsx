import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [token] = useState(localStorage.getItem('token') || '')
  const tdnClass = 'text-decoration-none'
  const lgiClass = 'list-group-item'
  
  return (
    <div className="col-md-2">
      <nav>
        <ul className="list-group">
          <li className={lgiClass}>
            <Link to="/" className={tdnClass}>
              Home
            </Link>
          </li>
          <li className={lgiClass}>
            <Link to="/movies" className={tdnClass}>
              Movies
            </Link>
          </li>
          <li className={lgiClass}>
            <Link to="/genres" className={tdnClass}>
              Genres
            </Link>
          </li>
          {token && (
            <>
              <li className={lgiClass}>
                <Link to="/admin/movies/add" className={tdnClass}>
                  Add movie
                </Link>
              </li>
              <li className={lgiClass}>
                <Link to="/admin" className={tdnClass}>
                  Manage Catalogue
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}
