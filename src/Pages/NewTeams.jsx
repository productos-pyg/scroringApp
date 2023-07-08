import {useState} from 'react' // los estado en nivel son lo mas importante dentro de la funcion
import Wrap from '../components/Wrap'
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import app from '../firebase'
import uuid from 'react-uuid'
import {Link , useNavigate} from 'react-router-dom'
import {TiArrowBackOutline} from "react-icons/ti"
import Swal from 'sweetalert2'
import {RiMailSendLine} from "react-icons/ri"
import { useForm } from 'react-hook-form'
import {TbUserPlus,TbUserMinus} from 'react-icons/tb'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../API/eventsApi'
import Select from 'react-select';
import makeAnimate from 'react-select/animated';
import Tooltip from '@mui/material/Tooltip';
import Edi from "../assets/img/EDI_molesto_azul.png"


const animatedComponents = makeAnimate();
const fireStore = getFirestore(app);

const NewTeams = () => {
  const {isLoading, data, isError, error} = useQuery({
    queryKey:["events"],
    queryFn:getEvents
  });
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
  const [memberName,setMemberName ] = useState("");
  const [memberDate, setMemberDate] = useState("");
  const [memberId, setMemberId] = useState("");
  const [memberSize, setMemberSize] = useState("");
  // const [coachObjet, setCoachObjet] = useState("");
  // const [membersObjet, setMembersObjet] = useState("");
  const [membersInfo, setMembersInfo] = useState([]);
  const [retoPost, setRetoPost] = useState({ value: '', index: -1 });
  
  const navigate = useNavigate();

  function idGeneretor(){
    const IdFull = uuid();
    const Id = IdFull.substring(0,8);
    return Id;
  }

  const handleAddMember = ()=>{
    const newMember ={
      memberName,
      memberDate,
      memberId,
      memberSize
    }
    setMembersInfo(prevMember =>[...prevMember,newMember])
  }

  const handleDeleMembers = (index) =>{
    const copyMembers= [...membersInfo];
    copyMembers.splice(index, 1);
    setMembersInfo(copyMembers);
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

  const handleChanllenge = (selectOption)=>{
    setChallengeType(selectOption);
  }

  if(isLoading)return <div>Loading...</div>
  else if (isError)return <div>Error</div>
  console.log(eventsType.challenges);
  // console.log(data);
  
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
        <form className= 'w-10/12 flex flex-col mt-5'onSubmit={handleSubmit(onSubmit)}>
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
              <select className='pl-2 py-2 border rounded-lg' 
                      required
                      onChange={e => setEventsType(JSON.parse(e.target.value))}>
                {data.map((optionEvents, index)=>
                  <option key={index} value={JSON.stringify(optionEvents)}>{optionEvents.name}</option>
                )}
              </select>
            </div>

            <div className="flex flex-col w-1/2 mr-5">
              <label className='mt-2'>Reto</label>
              {/* <select className='pl-2 py-2 border rounded-lg' required onChange={e => setChallengeType(e.target.value)} {...register("coachSize")}>
              {eventsType.challenges.map((optionEvents, index)=>
                  <option key={index}>{optionEvents.label}</option>
              )}     
              </select> */}

              <Select  className='py-2'
                value={challengeType}
                id = "challenges"
                required
                closeMenuOnSelect={false}
                components={animatedComponents} 
                isMulti
                getOptionValue={(option)=>option.value}
                getOptionLabel={(option)=>option.label}
                options={eventsType.challenges}
                onChange={handleChanllenge}
              />
            </div>
            <div className="flex flex-col w-1/5">
              <label className='mt-2'>Numero de participantes</label>
              <input className='pl-2 py-2 border rounded-lg' type='text' required onChange={e => setTeamsNumbMembers(e.target.value)} {...register("TeamsNumbMembers")}></input>
            </div>
          </div>
            <fieldset className='border rounded-lg border-dashed border-gray-300 px-5 pt-2 pb-3 mb-10'>
            <legend className='text-gray-300 font-bold'>Datos del Entrenador</legend>
              <div className="flex flex-col mb-5">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col w-2/5 mr-5">
                    <label className='mt-2'>Nombre completo</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='Full name' required onChange={e => setCoachName(e.target.value)} {...register("coachName")}></input>
                  </div>
                  <div className="flex flex-col w-1/5 mr-5">
                    <label className='mt-2'>Fecha de nacimiento</label>
                    <input className='pl-2 py-2 border rounded-lg' type='date' required onChange={e => setCoachDate(e.target.value)} {...register("coachDate")}></input>
                  </div>
                  <div className="flex flex-col w-1/5 mr-5">
                    <label className='mt-2'>Numero de identificación</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text'  required onChange={e => setCoachId(e.target.value)} {...register("coachId")}></input>
                  </div>
                  <div className="flex flex-col w-1/5">
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
              </div>
            </fieldset>

            <fieldset className='border rounded-lg border-dashed border-gray-300 px-5 pt-2'>
            <legend className='text-gray-300 font-bold'>Datos de los Participantes</legend>
            <div className="flex flex-row items-center justify-center">
            {membersInfo.map((member,index)=>
            <div className="border rounded-lg shadow-2xl mx-2 mb-3 p-2 flex flex-col items-end justify-end " key={index}>
              <div className=" flex flex-col items-center justify-between text-base leading-tight text-[#1097d5] ">
                <img src={Edi} className='w-32'/>
                <div className='text-[#1097d5] font-extrabold text-xl mb-2'>{member.memberName}</div>
                <div><span className='font-bold'>Doc: </span>{member.memberId}</div>
                <div><span className='font-bold'>Birth: </span>{member.memberDate}</div>
                <div><span className='font-bold'>Talla: </span>{member.memberSize}</div>
              </div>
              <Tooltip title="Delete" placement="top" arrow>
                <button className="mx-2 mb-1 p-2 rounded-lg drop-shadow-2xl
                                  shadow-lg 
                                  shadow-[#1097d5]/100
                                  text-white 
                                  bg-[#1097d5]
                                  hover:bg-[#ffffff]
                                  hover:text-[#d51010]
                                  hover:shadow-[#d51010]/100"
                        onClick={()=>handleDeleMembers(index)}><TbUserMinus/></button>
              </Tooltip>
            </div>
            )}
            </div>

              <div className="flex flex-row mb-8 items-center justify-between">
                <div className="my-5 w-full flex flex-row items-center justify-between">
                  <div className="flex flex-col w-2/5 mr-5">
                    <label className='mt-2'>Nombre completo</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text' placeholder='Full name' required onChange={e => setMemberName(e.target.value)}></input>
                  </div>
                  <div className="flex flex-col w-1/5 mr-5">
                    <label className='mt-2'>Fecha de nacimiento</label>
                    <input className='pl-2 py-2 border rounded-lg' type='date' required onChange={e => setMemberDate(e.target.value)}></input>
                  </div>
                  <div className="flex flex-col w-1/5 mr-5">
                    <label className='mt-2'>Numero de identificación</label>
                    <input className='pl-2 py-2 border rounded-lg' type='text'  required onChange={e => setMemberId(e.target.value)}></input>
                  </div>
                  <div className="flex flex-col w-1/5">
                    <label className='mt-2'>Talla de camiseta</label>
                    <select className='pl-2 py-2 border rounded-lg' required onChange={e => setMemberSize(e.target.value)}>
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
                
                <div>
                  <Tooltip title="Add" placement="top" arrow>
                    <button className="mx-5 mt-6 p-3 rounded-lg drop-shadow-2xl
                                      shadow-lg 
                                      shadow-[#1097d5]/100
                                      text-white 
                                      bg-[#1097d5]
                                      hover:bg-[#ffffff]
                                      hover:text-[#13d510]
                                      hover:shadow-[#13d510]/100"
                            onClick={handleAddMember}><TbUserPlus/></button>
                  </Tooltip>
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