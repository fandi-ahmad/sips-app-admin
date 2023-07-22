import React from 'react'
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'

const Layout = (props) => {
  return (
    <>
      <Sidebar/>
      <TitleBar title={props.title} button={props.button} />
      <section className="section main-section"  style={{ minHeight: '75vh' }}>
        {props.children}
      </section>
    </>
  )
}

export default Layout