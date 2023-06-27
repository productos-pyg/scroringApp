import {VscEdit} from "react-icons/vsc"
import {BsTrash3} from "react-icons/bs"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import {doc,deleteDoc,getFirestore} from 'firebase/firestore'
import app from '../firebase';
import { useNavigate } from 'react-router-dom'

const firestore = getFirestore(app);

const ChallengesTable = ({challengeList}) => {
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
                deleteDoc(doc(firestore,"Challenges",id))
            Swal.fire(
                '¡Eliminado!',
                'Este elemento fue eliminado.',
                'success'
            )
            navigate("/home")
            }
        })
    }
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
                            <td className='py-2 pl-2 border border-slate-600 w-2/5'>{itemChallenges.name}</td>
                            <td className='py-2 pl-2 border border-slate-600 w-1/5'>{itemChallenges.type}</td>
                            <td className='py-2 pl-2 border border-slate-600 w-2/6'>{itemChallenges.categories.map((itemCat)=>{
                                return(<span className='mr-2' key ={itemCat.label}>
                                    {itemCat.label}
                                </span>)
                            })}</td>
                            <td >
                                {/* <button className='pl-3 text-xl' onClick={() => handleEdit(itemChallenges)}><VscEdit/></button> */}
                                <button className='pl-3 text-xl' ><Link to = {`/challenges/${itemChallenges.id}`}><VscEdit/></Link></button>
                                <button className='pl-2 text-xl' onClick={()=>handleErase(itemChallenges.id)}><BsTrash3/></button>
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