import React from 'react'
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import Footer from '../components/Footer'

const Layout = (props) => {
  return (
    <>
      <Sidebar/>
      <TitleBar title={props.title} button={props.button} />
      <section className="section main-section"  style={{ minHeight: '70vh' }}>
        {props.children}
      </section>
      <Footer/>
    </>
  )
}

export default Layout