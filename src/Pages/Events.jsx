import React, { useState, useEffect} from 'react'
import Wrap from '../components/Wrap'
import {RxPlusCircled} from "react-icons/rx"
import { Link } from 'react-router-dom'
import EventsTable from '../components/EventsTable'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import app from '../firebase'
import {async} from '@firebase/util'

const firestore = getFirestore(app);

const Events = () => {

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const queryEvent = async()=>{
      const list = [];
    
  try{
    const dataEvets= await getDocs(collection(firestore,"Events"));
    dataEvets.forEach((doc) =>{
      list.push(doc.data());
    });
    setEventList(list);
    }
  catch(error){
    console.log(error);
  }
    }
    queryEvent();
  }, [])
 console.log("event: ",eventList);
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
            <EventsTable eventList={eventList}/> 
        </div>
    </Wrap>
  )
}

export default Events