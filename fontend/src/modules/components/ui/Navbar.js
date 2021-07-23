import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="col-md-2">
      <nav>
        <ul className="list-group">
          <li className="list-group-item ">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/movies" className="text-decoration-none">
              Movies
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/by-category" className="text-decoration-none">
              Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin" className="text-decoration-none">
              Manage Catalogue
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}