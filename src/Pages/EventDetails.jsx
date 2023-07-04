import Wrap from '../components/Wrap'
import React, { useEffect } from 'react';
import {doc, getFirestore, getDoc, updateDoc, Firestore, collection} from 'firebase/firestore';
import app from '../firebase';
import {useState} from 'react'
import {Link , useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {TiArrowBackOutline} from "react-icons/ti"
import Edi from "../assets/img/Logo sin Fecha.png"

const firestore = getFirestore(app);

const EventDetails = () => {

    const [name, setName]= useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [challenges, setChallenges] = useState([]);

    const{id} = useParams();
  const collectionName = 'Events';
  const documentId = `${id}`;

// Crea una referencia al documento
  const documentRef = doc(firestore, collectionName, documentId);

  useEffect(() => {
    // Obtiene el documento
    getDoc(documentRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
      // El documento existe
        const data = docSnapshot.data();
        console.log('Documento encontrado:', data);
        setName(data.name);
        setDate(data.date);
        setDescription(data.description);
        setCountry(data.country);
        setState(data.state);
        setCity(data.city);
        setAddress(data.address);
        setChallenges(data.challenges);
        setEnable(data.enable);
      } else {
      // El documento no existe
        console.log('El documento no existe');
      }
    })
    .catch((error) => {
      console.log('Error al obtener el documento:', error);
    });  
  }, [])

  const nameChallenges = challenges.map((ChallenName) => {return(ChallenName.label)})
  console.log(nameChallenges);

  return (
    <Wrap>
    <div className='h-screen w-screen flex flex-row items-start'>
      <div className="w-2/5  p-4 bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-[#063653] dark:border-gray-700 shadow-lg shadow-[#1097d5]/100">
        <span className="mb-4 items-center w-full flex justify-end text-sm font-medium text-gray-500 dark:text-gray-400">Fecha: {date}</span>
        <div className="flex flex-col items-baseline text-gray-900 dark:text-white">
            <span className="w-full text-4xl font-extrabold tracking-tight text-center">{name}</span>
            <span className="w-full mt-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-justify">{description}</span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          
          <fieldset className='border border-dashed border-gray-600 px-5 pt-2 pb-3'>
          <legend className='text-gray-400 '>Lugar</legend>
            <li className="flex space-x-3">
                <span className="text-base font-extrabold leading-tight text-gray-500 dark:text-gray-300 ">País: </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{country}</span>
            </li>
            <li className="flex space-x-3">
                <span className="text-base font-extrabold leading-tight text-gray-500 dark:text-gray-300">Estado: </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{state}</span>
            </li>
            <li className="flex space-x-3">
                <span className="text-base font-extrabold leading-tight text-gray-500 dark:text-gray-300">Ciudad: </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{city}</span>
            </li>
            <li className="flex space-x-3">
                <span className="text-base font-extrabold leading-tight text-gray-500 dark:text-gray-300">Dirección: </span>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{address}</span>
            </li>
          </fieldset>
        </ul>
          <div>
            <span className="text-base font-extrabold leading-tight text-gray-500 dark:text-gray-300">Retos: </span>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">{nameChallenges}</span>
          </div>

        <button className='w-full flex items-center justify-center'>
          <Link className='flex
                        flex-row 
                        items-center 
                        justify-center
                        border 
                        rounded-md
                        w-32
                        p-2 
                        mt-4
                        font-corbel
                        text-white 
                        bg-[#1097d5]
                        hover:bg-[#ffffff]
                        hover:text-[#1097d5]
                        shadow-lg 
                        shadow-[#1097d5]/100' 
              to="/events">
          <TiArrowBackOutline className=''/>
          <span className='mx-2'>Atras</span>
          </Link>
        </button>
      </div>
      <div className='w-1/2 h-3/5 flex items-center ml-20 mt-20'>
        <img src={Edi} className='w-3/4'/>
      </div>
    </div>
  </Wrap>
  )
}

export default EventDetails