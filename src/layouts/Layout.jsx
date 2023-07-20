import React from 'react'
import Sidebar from '../components/sidebar'
import Navbar from '../components/Navbar'

const Layout = (props) => {
  return (
    <>
      <Sidebar/>
      <Navbar/>
      <section className="section main-section" style={{ height: '90vh' }}>
        {props.children}
      </section>
    </>
  )
}

export default Layout