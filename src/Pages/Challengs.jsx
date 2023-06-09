import React, { useEffect, useState } from 'react'
import Wrap from '../components/Wrap'
import { Link } from 'react-router-dom'
import ChallengesTable from '../components/ChallengesTable'
import { collection, getFirestore, getDocs } from 'firebase/firestore'
import app from '../firebase'
import { async } from '@firebase/util'

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
                <Link to="/newchallenge">
                    Crear reto
                </Link>
            </button>
            <ChallengesTable challengeList={challengeList}/>
        </div>
    </Wrap>
  )
}

export default Challengs