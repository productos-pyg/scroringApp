import Wrap from '../components/Wrap'
import React, { useState, useEffect} from 'react'
import {RxPlusCircled} from "react-icons/rx"
import { Link } from 'react-router-dom'
import EventsTable from '../components/EventsTable'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import app from '../firebase'

const Teams = () => {
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
                                  hover:text-[#1097d5]" to="/teams/newteams">
                  {<RxPlusCircled/>}
                  <span className="mx-2">Nuevo Equipo</span>
                </Link>
            </button>
        </div>
    </Wrap>
  )
}

export default Teams