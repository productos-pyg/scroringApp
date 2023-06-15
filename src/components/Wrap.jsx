import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'

const Wrap = ({children}) => {
  return (
    <>
    <Nav/>
    <div className='flex'>
      <Sidebar/>
      <div className='pl-32 py-32'>
      {children}
      </div>
    </div>
    </>
  )
}

export default Wrap