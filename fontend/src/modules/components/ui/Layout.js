import React from 'react'
import Content from './Content'
import Header from './Header'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="container-fluid">
      <Header />

      <div className="row">
        <Navbar />
        <Content />
      </div>
    </div>
  )
}
