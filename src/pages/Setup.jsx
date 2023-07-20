import React from 'react'

// component
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import { BasicButton } from '../components/BaseButton'

const Setup = () => {
  return (
    <>
      <Sidebar />
      <TitleBar
        title='Setup'
        button={<BasicButton iconShow='block' icon='mdi-plus-thick' title='Create New Setup'/>}
      />

      <section className="section main-section">

      </section>
    </>
  )
}

export default Setup