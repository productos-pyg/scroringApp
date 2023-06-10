import React from 'react'
import {VscEdit} from "react-icons/vsc"
import {BsTrash3} from "react-icons/bs"
import Swal from 'sweetalert2'

const ChallengesTable = ({challengeList}) => {

    const handleErase= ()=>{
        console.log("Delete")
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Eliminar este elemento",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                '¡Eliminado!',
                'Este elemento fue eliminado.',
                'success'
            )
            }
        })
    }

    console.log(challengeList);
    return (
        <div className='h-screen w-screen'>
        <table className='border-collapse  w-10/12 border-slate-950'>
            <thead>
                <tr>
                    <th className='border py-2 text-xl font-corbel border-slate-600'>Nombre</th>
                    <th className='border py-2 text-xl font-corbel border-slate-600'>Tipo de reto</th>
                    <th className='border py-2 text-xl font-corbel border-slate-600'>Categorias</th>
                </tr>
            </thead>
            <tbody>
                {challengeList.map((itemChallenges)=>{
                    return(
                        <tr key = {itemChallenges.id}>
                            <td className='py-2 pl-2 border  border-slate-600 w-2/5'>{itemChallenges.name}</td>
                            <td className='py-2 pl-2 border border-slate-600 w-1/5'>{itemChallenges.type}</td>
                            <td className='py-2 pl-2 border border-slate-600 w-2/6'>{itemChallenges.categories.map((itemCat)=>{
                                return(<span className='mr-2'>
                                    {itemCat.label}
                                </span>)
                            })}</td>
                            <td >
                                <button className='pl-3 text-xl'><VscEdit/></button>
                                <button className='pl-2 text-xl' onClick={handleErase}><BsTrash3/></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}

export default ChallengesTable