import React from 'react'
import Wrap from '../components/Wrap'

const NewChallenge = () => {
  return (
    <Wrap>
        <form>
            <label>Name</label>
            <input type='text' placeholder='name'></input>
            <label>Año</label>
            <input type='date'></input>
            <button>Enviar</button>
        </form>
    </Wrap>
  )
}

export default NewChallenge