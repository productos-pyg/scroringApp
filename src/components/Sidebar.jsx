import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import {TfiCup} from "react-icons/tfi"
import {BsGear} from "react-icons/bs"
import {TbUsers} from "react-icons/tb"

const Sidebar = () => {
  return (
    <div id="bar" className='h-80 border rounded-r-lg flex shadow-2xl w-1/12 mr-2'>
      <ul className='flex flex-col items-center justify-evenly ms-12'>
        <li className='ml-auto mr-auto'>
          <Link to="/events">
            <TfiCup/>
          </Link>
        </li>
        <li>
          <Link to="/challenges">
            <BsGear/>
          </Link>
        </li>
        <li>
          <Link to="/teams">
            <TbUsers/>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
