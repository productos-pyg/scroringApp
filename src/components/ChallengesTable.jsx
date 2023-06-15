import React, { useState } from 'react'
import {VscEdit} from "react-icons/vsc"
import {BsTrash3} from "react-icons/bs"
import Swal from 'sweetalert2'
import EditComponents from './EditComponents'

const ChallengesTable = ({challengeList}) => {

    const  [IsModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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

    const handleEdit = ({name}) =>{
        	console.log(name)

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
                                {/* <button className='pl-3 text-xl' onClick={() => handleEdit(itemChallenges)}><VscEdit/></button> */}
                                <button className='pl-3 text-xl' onClick={handleOpenModal}><VscEdit/></button>
                                <button className='pl-2 text-xl' onClick={handleErase}><BsTrash3/></button>
                            </td>
                            <EditComponents isOpen={IsModalOpen} onClose={handleCloseModal}>
                                <div className="w-96
                                                flex
                                                flex-col 
                                                items-center
                                                bg-[#b8bfc2]">
                                    <label className='mt-2'>Nombre del Reto</label>
                                    <input value= {itemChallenges.name} className='pl-2 py-2 border rounded-lg' type='text' placeholder='name' required onChange={e => setName(e.target.value)}></input>

                                    <label className='mt-2'>Tipo de reto</label>
                                    <select value={itemChallenges.type} className='pl-2 py-2 border rounded-lg' required onChange={e => setChallengeType(e.target.value)}>
                                    <option ></option>
                                    <option >Reto Match</option>
                                    <option >Reto Task</option>
                                    </select>

                                    <label className='mt-2' >Descripción del Reto</label>
                                    <textarea value={itemChallenges.description}
                                            className=' pl-2 
                                                        py-2
                                                        mx-10
                                                        block 
                                                        w-full 
                                                        rounded-lg 
                                                        border' 
                                            rows="4"
                                            required onChange={e => setDescription(e.target.value)}/>
                                    
                                    <label className='mt-2' >Categorias</label>
                                    {/* <Select  className='pl-2 py-2'
                                    value={itemChallenges.categories}
                                    id = "categories"   
                                    required
                                    closeMenuOnSelect={false}
                                    components={animatedComponents} //es una libreria que trae recat selec internamnete
                                    isMulti
                                    options={categoriesOptions}
                                    onChange={handleChange}
                                    /> */}

                                    <label className='mt-2' >Minimo de Equipos</label>
                                    <input value={itemChallenges.maxTeams}
                                            className='pl-2 py-2 border rounded-lg' type='number' required onChange={e => setMinTeams(e.target.value)}></input>

                                    <label className='mt-2'>Maximo de Equipos</label>
                                    <input value={itemChallenges.minTeams}
                                            className='pl-2 py-2 border rounded-lg' type='number' onChange={e => setMaxTeams(e.target.value)}></input>
                                            
                                    <div className="w-100
                                                    flex
                                                    flex-row 
                                                    items-center
                                                    content-between
                                                    px-20">
                                        <button className='flex
                                                            m-4
                                                            flex-row 
                                                            items-center 
                                                            border 
                                                            rounded-md 
                                                            p-2 
                                                            font-corbel
                                                            text-white 
                                                            bg-[#e21c15]
                                                            hover:bg-[#ffffff]
                                                            hover:text-[#e21c15]'
                                                onClick={handleCloseModal}>Cancelar
                                        </button>
                                        <button className='flex
                                                            m-4
                                                            flex-row 
                                                            items-center 
                                                            border 
                                                            rounded-md 
                                                            p-2
                                                            font-corbel
                                                            text-white 
                                                            bg-[#1097d5]
                                                            hover:bg-[#ffffff]
                                                            hover:text-[#1097d5]'>Guardar
                                        </button>
                                    </div>
                                </div>
                            </EditComponents>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
    )
}

export default ChallengesTable