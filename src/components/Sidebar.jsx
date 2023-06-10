import React from 'react'
import { Link } from 'react-router-dom'
import {TfiCup} from "react-icons/tfi"
import {BsGear} from "react-icons/bs"
import {TbUsers} from "react-icons/tb"

const Sidebar = () => {
  return (
  <div  class="fixed 
              top-20 
              left-0
              w-55 
              h-screen">

    <div class="h-full 
                px-3 
                py-4 
                overflow-y-auto 
                bg-gradient-to-b from-[#063653] to-[#1097d5]"> 
                
      <ul className='h-full 
                    flex 
                    flex-col 
                    items-center 
                    justify-evenly 
                    space-y-2 
                    text-xl 
                    text-[#ffffff] 
                    font-corbel'>
        <li>
          <Link className="flex flex-col items-center" to="/events">
            <TfiCup/>
            <span class="ml-2">Eventos</span>
          </Link>
        </li>
        <li>
          <Link className="flex flex-col items-center" to="/challenges">
            <BsGear/>
            <span class="ml-2">Retos</span>
          </Link>
        </li>
        <li>
          <Link className="flex flex-col items-center" to="/teams">
            <TbUsers/>
            <span class="ml-2">Equipos</span>
          </Link>
        </li>
      </ul>

    </div>
  </div>
  )
}

export default Sidebar
