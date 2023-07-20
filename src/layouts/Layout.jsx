import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/Navbar'

const Layout = (props) => {
  return (
    <section className="section main-section">
      <Sidebar/>
      <Navbar/>
      {props.children}
    </section>
  )
}

export default Layout