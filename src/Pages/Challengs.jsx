import React from 'react'
import Wrap from '../components/Wrap'
import { Link } from 'react-router-dom'
import ChallengesTable from '../components/ChallengesTable'


const Challengs = () => {
  return (
    <Wrap>
        <div>
            <button>
                <Link to="/newchallenge">
                    Crear reto
                </Link>
            </button>
            <ChallengesTable/>
        </div>
    </Wrap>
  )
}

export default Challengs