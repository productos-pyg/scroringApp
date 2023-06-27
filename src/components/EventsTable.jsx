import React from 'react'
import {SlEye} from "react-icons/sl"
import {VscEdit} from "react-icons/vsc"
import {BsTrash3} from "react-icons/bs"
import {doc, deleteDoc, getFirestore} from 'firebase/firestore'
import app from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const firestore = getFirestore(app);

const EventsTable = ({eventList}) => {
console.log(eventList);
    const navigate = useNavigate();

    const handleErase= (id)=>{
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
                deleteDoc(doc(firestore,"Events",id))
            Swal.fire(
                '¡Eliminado!',
                'Este elemento fue eliminado.',
                'success'
            )
            navigate("/home")
            }
        })
        console.log(id);
    }

  return (
    <div className='h-screen w-screen'>
    <table className='border-collapse  w-10/12 border-slate-950'>
        <thead>
            <tr>
                <th className='border py-2 text-xl font-corbel border-slate-600'>Nombre del Evento</th>
                <th className='border py-2 text-xl font-corbel border-slate-600'>Ciudad</th>
                <th className='border py-2 text-xl font-corbel border-slate-600'>Fecha</th>
            </tr>
        </thead>
        <tbody>
            {eventList.map((itemEvent)=>{
                return(
                    <tr key = {itemEvent.id}>
                        <td className='py-2 pl-2 border border-slate-600 w-2/5'>{itemEvent.name}</td>
                        <td className='py-2 pl-2 border border-slate-600 w-1/5'>{itemEvent.city}</td>
                        <td className='py-2 pl-2 border border-slate-600 w-2/6'>{itemEvent.date}</td>
                        <td >
                            {/* <button className='pl-3 text-xl' onClick={() => handleEdit(itemChallenges)}><VscEdit/></button> */}
                            <button className='pl-2 text-xl' ><SlEye/></button>
                            <button className='pl-3 text-xl' ><Link to = {`/events/${itemEvent.id}`}><VscEdit/></Link></button>
                            <button className='pl-2 text-xl' onClick={()=>handleErase(itemEvent.id)}><BsTrash3/></button>
                        </td>                            
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
  )
}

export default EventsTable