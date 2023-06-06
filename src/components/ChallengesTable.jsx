import React from 'react'

const ChallengesTable = () => {
  return (
    <div>
        <table className='border'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Año</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>SIR</td>
                    <td>2023</td>
                </tr>
                <tr>
                    <td>CopaInnobotics</td>
                    <td>2023</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ChallengesTable