import Wrap from '../components/Wrap'
import React, { useEffect } from 'react';
import {doc, getFirestore, getDoc, updateDoc, Firestore, collection} from 'firebase/firestore';
import app from '../firebase';
import {useState} from 'react'
import {Link , useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {TiArrowBackOutline} from "react-icons/ti"

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
    const [challengesOptions, setChallengesOptions] = useState([]);
    const [enable, setEnable] = useState(false);


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
        serChallenges(data.challenges);
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

  return (
    <Wrap>
        <button>      
        <Link className='flex
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
                        hover:text-[#1097d5]
                        shadow-lg 
                        shadow-[#1097d5]/100' 
              to="/events">
          <TiArrowBackOutline className=''/>
          <span className='mx-2'>Atras</span>
        </Link>
      </button>

      <h1>{name}</h1>
    </Wrap>
  )
}

export default EventDetails