import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'

const Wrap = ({children}) => {
  return (
    <>
    <Nav/>
    <Sidebar/>
    <div>
    {children}
    </div>
    </>
  )
}

export default Wrap