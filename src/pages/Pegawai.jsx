import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import TitleBar from '../components/TitleBar'
import { BasicButton } from '../components/BaseButton'

export const Pegawai = () => {
  const createNew = () => {

  }

  return (
    <>
      <Sidebar />
      <TitleBar
        title='Dashboard'
        button={<BasicButton onClick={createNew} iconShow='block' icon='mdi-plus-thick' title='Create New User'/>}
      />
    </>
  )
}
