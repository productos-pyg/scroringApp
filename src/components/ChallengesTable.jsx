import React from 'react'
import {VscEdit} from "react-icons/vsc"
import {BsTrash3} from "react-icons/bs"
import Swal from 'sweetalert2'

const ChallengesTable = ({challengeList}) => {

    const handleErase= ()=>{
        console.log("Delete")
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
        })
    }
      
  console.log(challengeList);
  return (
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo de reto</th>
                <th>Categorias</th>
            </tr>
        </thead>
        <tbody>
            {challengeList.map((itemChallenges)=>{
                return(
                    <tr key = {itemChallenges.id}>
                        <td>{itemChallenges.name}</td>
                        <td>{itemChallenges.type}</td>
                        <td>{itemChallenges.categories.map((itemCat)=>{
                            return(<span className='mr-2'>
                                {itemCat.label}
                            </span>)
                        })}</td>
                        <td>
                            <button><VscEdit/></button>
                            <button onClick={handleErase}><BsTrash3/></button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
  )
}

export default ChallengesTable