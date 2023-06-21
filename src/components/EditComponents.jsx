import React from 'react';
import { useParams } from 'react-router-dom';
import Wrap from './Wrap';
import {doc, getFirestore, getDoc} from 'firebase/firestore';
import app from '../firebase';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import {RiMailSendLine} from "react-icons/ri"

const fireStore = getFirestore(app);
const animatedComponents = makeAnimated();

const EditComponents = () => {
  const [name,setName] = useState("");
  const [challengeType, setChallengeType] =useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [minTeams, setMinTeams] = useState("");
  const [maxTeams, setMaxTeams] = useState("");

  const categoriesOptions = [
    {value:"toddler", label:"Infantil"},
    {value:"junior", label:"Junior"},
    {value:"youth", label:"Juvenil"},
    {value:"senior", label:"Senior"},
    {value:"open", label:"Abierta"}
  ]
  const handleChange = (selectedOption) => {
    setCategories(selectedOption)
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const id = idGeneretor();
    console.log(id);
    const challenge = {
      name, 
      type:challengeType,
      description,
      categories,
      minTeams,
      maxTeams,
      id
    }
    await setDoc(doc(fireStore,'Challenges', id),challenge);
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Enviar este elemento",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Enviado',
          'Tu información ha sido enviada.',
          'success'
        )
      }navigate("/challenges");
    })
  }

  const {id} = useParams();

// Especifica la colección y el ID del documento que deseas obtener
  const collectionName = 'Challenges';
  const documentId = `${id}`;

// Crea una referencia al documento
  const documentRef = doc(fireStore, collectionName, documentId);

// Obtiene el documento
  getDoc(documentRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
      // El documento existe
        const data = docSnapshot.data();
        console.log('Documento encontrado:', data);
      } else {
      // El documento no existe
        console.log('El documento no existe');
      }
    })
    .catch((error) => {
      console.log('Error al obtener el documento:', error);
    });
    

    return (
    <Wrap>
        <button>        
        <Link className='flex
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
                        hover:text-[#1097d5]' to="/challenges">
          <TiArrowBackOutline className=''/>
          <span className='mx-2'>Atras</span>
        </Link>
      </button>

      <div className='h-screen
                      w-screen'>
        <form className= 'w-10/12 flex flex-col' 
        
        onSubmit={handleSubmit}>
            <label className='mt-2'>Nombre del Reto</label>
            <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='name' required onChange={e => setName(e.target.value)}></input>

            <label className='mt-2'>Tipo de reto</label>
            <select className='pl-2 py-2 border rounded-lg' required onChange={e => setChallengeType(e.target.value)}>
              <option ></option>
              <option >Reto Match</option>
              <option >Reto Task</option>
            </select>

            <label className='mt-2' >Descripción del Reto</label>
            <textarea className='pl-2 
                                py-2
                                block 
                                w-full 
                                rounded-lg 
                                border' 
                                rows="4"
                                required onChange={e => setDescription(e.target.value)}/>

            <label className='mt-2' >Categorias</label>
            <Select  className='pl-2 py-2'
              value={categories}
              id = "categories"
              required
              closeMenuOnSelect={false}
              components={animatedComponents} //es una libreria que trae recat selec internamnete
              isMulti
              options={categoriesOptions}
              onChange={handleChange}
            />

            <label className='mt-2' >Minimo de Equipos</label>
            <input className='pl-2 py-2 border rounded-lg' type='number' required onChange={e => setMinTeams(e.target.value)}></input>

            <label className='mt-2'>Maximo de Equipos</label>
            <input className='pl-2 py-2 border rounded-lg' type='number' onChange={e => setMaxTeams(e.target.value)}></input>

            <button className='flex

                              w-1/12
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
                              hover:text-[#1097d5]'>
            <RiMailSendLine/>
            <span class="ml-2">Enviar</span>
            </button>
        </form>
      </div>
    </Wrap>
  );
};

export default EditComponents;