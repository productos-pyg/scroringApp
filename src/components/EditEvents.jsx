
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrap from './Wrap';
import {doc, getFirestore, getDocs, updateDoc, Firestore, collection, getDoc} from 'firebase/firestore';
import app from '../firebase';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import {RiMailSendLine} from "react-icons/ri"

const firestore = getFirestore(app);
const animatedComponents = makeAnimated();


const EditEvents = () => {

  const navigate = useNavigate();

  const [eventsData, setEventsData] = useState({});
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

  const queryChallenge = async() => {
    const temporalChallenges = [];
    const querySnapshot = await getDocs(collection(firestore, "Challenges"));
    querySnapshot.forEach((doc) => {
      const temporalChallenge = {
        label:doc.data().name,
        value:{
          name:doc.data().name,
          id:doc.data().id,
          description:doc.data().description,
          maxTeams:doc.data().maxTeams,
          minTeams:doc.data().minTeams,
          categories:doc.data().categories,
          type:doc.data().type
        }
      }
      temporalChallenges.push(temporalChallenge);
}
);
setChallengesOptions(temporalChallenges);
  }

  useEffect(() => {
    queryChallenge();
  }, [])

  const handleChanllenge = (selectOption)=>{
    setChallenges(selectOption);
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    console.log(id);
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
       updateDoc(doc(firestore,"Events",`${id}`),{
        name:name, 
        date:date,
        description:description,
        country:country,
        state:state,
        city:city,
        address:address,
        challenges:challenges,
        enable:enable
       })
        Swal.fire(
          'Enviado',
          'Tu información ha sido enviada.',
          'success'
        )
      }
      navigate("/events");
    })
  }

  const {id} = useParams();

// Especifica la colección y el ID del documento que deseas obtener
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

  console.log(enable);

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
      <div className='h-screen
                      w-screen'>
        <form className= 'w-10/12 flex flex-col' onSubmit={handleSubmit}>
          
          <div className="flex items-center justify-end text-[#1097d5] font-bold mb-7">
            <input type="checkbox"
                    defaultChecked ={enable} 
                    checked={enable}
                    onChange={e => setEnable(e.target.checked)}
                    className="w-4 
                              h-4
                              accent-[#1097d5] 
                              focus:accent-[#1097d5b4]" ></input>
       
          
            <label className="ml-2 text-lg">Habilitar evento </label>
          </div>
          <div className=" flex flex-row items-center justify-between">
            <div className="w-3/4 flex flex-col  mr-5">
              <label >Nombre del Evento</label>
              {name !==""
              ?<input className='w-full pl-2 py-2  border rounded-lg' value={name} type='text' placeholder='name' required onChange={e => setName(e.target.value)}></input>
              :<input className='w-full pl-2 py-2  border rounded-lg' type='text' placeholder='name' required onChange={e => setName(e.target.value)}></input>
              }
              </div>

            <div className="w-1/4 flex flex-col ">
              <label className='mr-2'>Fecha</label>
              {date !==""
              ?<input type = "date" value={date}
              onChange={e=>setDate(e.target.value)}
                      required
                      className="border 
                            border-gray-200 
                            text-gray-900 
                            text-sm 
                            rounded-lg 
                            block 
                            w-full
                            p-2.5"></input>
            :<input type = "date" 
            onChange={e=>setDate(e.target.value)}
                    required
                    className="border 
                          border-gray-200 
                          text-gray-900 
                          text-sm 
                          rounded-lg 
                          block 
                          w-full
                          p-2.5"></input>
              }
              </div>
            </div>

            <label className='mt-2' >Descripción del Evento</label>
            {description !==""
            ?<textarea className='pl-2 
                                py-2
                                block 
                                w-full 
                                rounded-lg 
                                border' 
                                rows="4"
                                value={description}
                                required onChange={e => setDescription(e.target.value)}/>
            :<textarea className='pl-2 
                                  py-2
                                  block 
                                  w-full 
                                  rounded-lg 
                                  border' 
                                  rows="4"
                                  required onChange={e => setDescription(e.target.value)}/>
            }
            
            <div className=" mt-2 flex flex-row items-center justify-between">
              <div className="w-1/3 mr-5 flex flex-col ">
                <label >País</label>
                {country !==""
                ?<input className='pl-2 py-2 border rounded-lg' value={country} type='text' required onChange={e => setCountry(e.target.value)}></input>
                :<input className='pl-2 py-2 border rounded-lg'  type='text' required onChange={e => setCountry(e.target.value)}></input>
                }
                </div>
              <div className="w-1/3 mr-5 flex flex-col ">
                <label >Estado</label>
                {state !==""
                ?<input className='pl-2 py-2 border rounded-lg' value={state} type='text' onChange={e => setState(e.target.value)}></input>
                :<input className='pl-2 py-2 border rounded-lg' type='text' onChange={e => setState(e.target.value)}></input>
                }
                </div>
              <div className="w-1/3 flex flex-col ">
                <label>Ciudad</label>
                {city !==""
                ?<input className='pl-2 py-2 border rounded-lg' value={city} type='text' onChange={e => setCity(e.target.value)}></input>
                :<input className='pl-2 py-2 border rounded-lg' type='text' onChange={e => setCity(e.target.value)}></input>
              }
              </div>
            </div>

            <label className='mt-2'>Dirección</label>
            {address !==""
            ?<input className='pl-2 py-2 border rounded-lg' value={address} type='text' onChange={e => setAddress(e.target.value)}></input>
            :<input className='pl-2 py-2 border rounded-lg' type='text' onChange={e => setAddress(e.target.value)}></input>
            }
            <label className='mt-2' >Agrergar Retos</label>
            {challenges !==""
            ?<Select  className='py-2'
              value={challenges}
              id = "challenges"
              required
              closeMenuOnSelect={false}
              components={animatedComponents} 
              isMulti
              getOptionValue={(option)=>option.value}
              getOptionLabel={(option)=>option.label}
              options={challengesOptions}
              onChange={handleChanllenge}
            />
            :<Select  className='py-2'
            id = "challenges"
            required
            closeMenuOnSelect={false}
            components={animatedComponents} 
            isMulti
            getOptionValue={(option)=>option.value}
            getOptionLabel={(option)=>option.label}
            options={challengesOptions}
            onChange={handleChanllenge}
          />
          }
            <div className='w-full flex items-center justify-center'>
              <button className='flex
                                w-32
                                mb-5
                                flex-row 
                                items-center
                                justify-center
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
                              shadow-[#1097d5]/100'>
              <RiMailSendLine/>
              <span className="ml-2">Enviar</span>
              </button>
            </div>
        </form>
      </div>
    </Wrap>
  )
}

export default EditEvents