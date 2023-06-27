import React from 'react'
import Wrap from '../components/Wrap'
import {RxPlusCircled} from "react-icons/rx"
import { Link } from 'react-router-dom'


const Events = () => {
  return (
    <Wrap>
        <div>
            <button>
                <Link className="flex
                                  mb-5
                                  flex-row 
                                  items-center 
                                  border 
                                  rounded-md 
                                  p-2 
                                  mt-4
                                  font-corbel
                                  text-white 
                                  bg-[#1097d5]
                                  hover:bg-[#ffffff]
                                  hover:text-[#1097d5]" to="/events/newevent">
                  {<RxPlusCircled/>}
                  <span className="mx-2">Nuevo Evento</span>
                </Link>
            </button>
            {/* <ChallengesTable challengeList={challengeList}/> */}
        </div>
    </Wrap>
  )
}

export default Events