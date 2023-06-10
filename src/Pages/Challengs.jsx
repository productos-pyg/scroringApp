import React, { useEffect, useState } from 'react'
import Wrap from '../components/Wrap'
import { Link } from 'react-router-dom'
import ChallengesTable from '../components/ChallengesTable'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import app from '../firebase'
import { async } from '@firebase/util'
import {RxPlusCircled} from "react-icons/rx"

const fireStore = getFirestore(app); 

const Challengs = () => {

const [challengeList, setChallengeList] = useState([]);

  useEffect(() => {
    const queryChallenge = async() =>{
      const list = [];
      try {
        const dataChallenges = await getDocs(collection(fireStore,'Challenges'));
        dataChallenges.forEach((doc) => {
          list.push(doc.data());
        });
        setChallengeList(list);
      } catch (error) {
        console.log(error);
      }
    }
    queryChallenge();
  }, [])


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
                                  hover:text-[#1097d5]" to="/newchallenge">
                  {<RxPlusCircled/>}
                  <span class="mx-2">Nuevo Retos</span>
                </Link>
            </button>
            <ChallengesTable challengeList={challengeList}/>
        </div>
    </Wrap>
  )
}

export default Challengs