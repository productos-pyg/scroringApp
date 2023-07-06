import {useState} from 'react' // los estado en nivel son lo mas importante dentro de la funcion
import Wrap from '../components/Wrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import app from '../firebase'
import uuid from 'react-uuid'
import {Link , useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import {RiMailSendLine} from "react-icons/ri"
import { useForm } from 'react-hook-form'

const fireStore = getFirestore(app);
const animatedComponents = makeAnimated();

const NewTeams = () => {
  const{register, handleSubmit} = useForm();


  const [teamsName,setTeamsName] = useState("");
  const [teamsEntity,setTeamsEntity] = useState("");
  const [teamsCity,setTeamsCity] = useState("");
  const [eventsType, setEventsType] = useState([]);
  const [challengeType, setChallengeType] = useState([]);
  const [teamsNumbMembers, setTeamsNumbMembers] = useState("");
  const [coachName,setCoachName ] = useState("");
  const [coachDate, setCoachDate] = useState("");
  const [coachId, setCoachId] = useState("");
  const [coachSize, setCoachSize] = useState("");
  const [coachPhone, setCoachPhone] = useState("");
  const [coachEmail, setCoachEmail] = useState("");
  const [menberName,setMemberName ] = useState("");
  const [memberDate, setMemberDate] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberSize, setMemberSize] = useState("");
  const [coachObjet, setCoachObjet] = useState("");
  const [membersObjet, setMembersObjet] = useState("");
 

  const navigate = useNavigate();

  function idGeneretor(){
    const IdFull = uuid();
    const Id = IdFull.substring(0,8);
    return Id;
  }

  const onSubmit = (data) =>{
    const id = idGeneretor();
    const teams = data;
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
        setDoc(doc(fireStore,'Teams', id),teams);
        Swal.fire(
          'Enviado',
          'Tu información ha sido enviada.',
          'success'
        )
      }navigate("/teams");
    })
  }


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
              to="/teams">
          <TiArrowBackOutline className=''/>
          <span className='mx-2'>Atras</span>
        </Link>
      </button>

      <div className='h-screen
                      w-screen'>
        <form className= 'w-10/12 flex flex-col mt-5' 
        
        onSubmit={handleSubmit(onSubmit)}>
            <label className='mt-2'>Nombre del Equipo</label>
            <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='Name' required onChange={e => setTeamsName(e.target.value)} {...register("teamsName")}></input>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col w-2/3 mr-5">
                <label className='mt-2'>Entidad a la que pertenece</label>
                <input className='pl-2 py-2 border rounded-lg' type='text' onChange={e => setTeamsEntity(e.target.value)} {...register("teamsEntity")}></input>
              </div>
              <div className="flex flex-col w-1/3">
                <label className='mt-2'>Ciudad</label>
                <input className='pl-2 py-2 border rounded-lg' type='text' required onChange={e => setTeamsCity(e.target.value)} {...register("teamsCity")}></input>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between mb-10">
              <div className="flex flex-col w-2/5 mr-5">
                <label className='mt-2'>Evento</label>
                <input className='pl-2 py-2 border rounded-lg' type='text' required onChange={e => setEventsType(e.target.value)} {...register("EventsType")}></input>
              </div>
              <div className="flex flex-col w-1/2 mr-5">
                <label className='mt-2'>Reto</label>
                <input className='pl-2 py-2 border rounded-lg' type='text' required onChange={e => setChallengeType(e.target.value)} {...register("challengesType")}></input>
              </div>
              <div className="flex flex-col w-1/5">
                <label className='mt-2'>Numero de participantes</label>
                <input className='pl-2 py-2 border rounded-lg' type='text' required onChange={e => setTeamsNumbMembers(e.target.value)} {...register("TeamsNumbMembers")}></input>
              </div>
            </div>

            <fieldset className='border rounded-lg border-dashed border-gray-300 px-5 pt-2 pb-3 mb-10'>
            <legend className='text-gray-300 font-bold'>Datos del Entrenador</legend>
              <div className="flex flex-col mb-5">
                  <label className='mt-2'>Nombre completo</label>
                  <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='Full name' required onChange={e => setCoachName(e.target.value)} {...register("coachName")}></input>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col w-1/3 mr-5">
                    <label className='mt-2'>Numero de contacto</label>
                    <input className='pl-2 py-2 border rounded-lg' type='tel' required onChange={e => setCoachPhone(e.target.value)} {...register("coachPhone")}></input>
                  </div>
                  <div className="flex flex-col w-2/3">
                    <label className='mt-2'>Correo electronico</label>
                    <input className='pl-2 py-2 border rounded-lg' type='email' required onChange={e => setCoachEmail(e.target.value)} {...register("coachEmail")}></input>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col w-1/3 mr-5">
                    <label className='mt-2'>Fecha de nacimiento</label>
                    <input className='pl-2 py-2 border rounded-lg' type='date' required onChange={e => setCoachDate(e.target.value)} {...register("coachDate")}></input>
                  </div>
                  <div className="flex flex-col w-1/3 mr-5">
                    <label className='mt-2'>Numero de identificación</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text'  required onChange={e => setCoachId(e.target.value)} {...register("coachId")}></input>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className='mt-2'>Talla de camiseta</label>
                    <select className='pl-2 py-2 border rounded-lg' required onChange={e => setCoachSize(e.target.value)} {...register("coachSize")}>
                      <option ></option>
                      <option >XS</option>
                      <option >S</option>
                      <option >M</option>
                      <option >L</option>
                      <option >XL</option>
                      <option >XXL</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset className='border rounded-lg border-dashed border-gray-300 px-5 pt-2'>
            <legend className='text-gray-300 font-bold'>Datos de los Participantes</legend>
              <div className="flex flex-col mb-8">
                  <label className='mt-2'>Nombre completo</label>
                  <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='Full name' required onChange={e => setCoachName(e.target.value)} {...register("coachName")}></input>

                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col w-1/3 mr-5">
                    <label className='mt-2'>Fecha de nacimiento</label>
                    <input className='pl-2 py-2 border rounded-lg' type='date' required onChange={e => setCoachDate(e.target.value)} {...register("coachDate")}></input>
                  </div>
                  <div className="flex flex-col w-1/3 mr-5">
                    <label className='mt-2'>Numero de identificación</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text'  required onChange={e => setCoachId(e.target.value)} {...register("coachId")}></input>
                  </div>
                  <div className="flex flex-col w-1/3">
                    <label className='mt-2'>Talla de camiseta</label>
                    <select className='pl-2 py-2 border rounded-lg' required onChange={e => setCoachSize(e.target.value)} {...register("coachSize")}>
                      <option ></option>
                      <option >XS</option>
                      <option >S</option>
                      <option >M</option>
                      <option >L</option>
                      <option >XL</option>
                      <option >XXL</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>
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

export default NewTeams