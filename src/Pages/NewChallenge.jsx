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

const fireStore = getFirestore(app);
const animatedComponents = makeAnimated();

const NewChallenge = () => {
  const [name,setName] = useState("");
  const [challengeType, setChallengeType] =useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [minTeams, setMinTeams] = useState("");
  const [maxTeams, setMaxTeams] = useState("");

  const navigate = useNavigate();

  function idGeneretor(){
    const IdFull = uuid();
    const Id = IdFull.substring(0,8);
    return Id;
  }
  
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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }navigate("/challenges");
    })
  }

  return (
    <Wrap>
        <Link to="/challenges"><TiArrowBackOutline/></Link>
        <form onSubmit={handleSubmit}>
            <label>Nombre del Reto</label>
            <input type='text' placeholder='name' required onChange={e => setName(e.target.value)}></input>

            <label>Tipo de reto</label>
            <select required onChange={e => setChallengeType(e.target.value)}>
              <option ></option>
              <option >Reto Match</option>
              <option >Reto Task</option>
            </select>

            <label>Descripción del Reto</label>
            <textarea required onChange={e => setDescription(e.target.value)}/>

            <label>Categorias</label>
            <Select 
              value={categories}
              id = "categories"
              required
              closeMenuOnSelect={false}
              components={animatedComponents} //es una libreria que trae recat selec internamnete
              isMulti
              options={categoriesOptions}
              onChange={handleChange}
            />

            <label>Minimo de Equipos</label>
            <input type='number' required onChange={e => setMinTeams(e.target.value)}></input>

            <label>Maximo de Equipos</label>
            <input type='number' required onChange={e => setMaxTeams(e.target.value)}></input>

            <button>Enviar</button>
        </form>
    </Wrap>
  )
}

export default NewChallenge