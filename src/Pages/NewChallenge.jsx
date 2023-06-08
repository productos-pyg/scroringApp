import {useState} from 'react' // los estado en nivel son lo mas importante dentro de la funcion
import Wrap from '../components/Wrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated();

const NewChallenge = () => {
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
  console.log(categories);
  return (
    <Wrap>
        <form>
            <label>Nombre del Reto</label>
            <input type='text' placeholder='name' onChange={e => setName(e.target.value)}></input>
            
            <label>Tipo de reto</label>
            <select onChange={e => setChallengeType(e.target.value)}>
              <option >Reto Match</option>
              <option >Reto Task</option>
            </select>
            
            <label>Descripción del Reto</label>
            <textarea onChange={e => setDescription(e.target.value)}/>
            
            <label>Categorias</label>
            <Select 
              id = "categories"
              closeMenuOnSelect={false}
              components={animatedComponents} //es una libreria que trae recat selec internamnete
              isMulti
              options={categoriesOptions}
              
            />
            <label>Minimo de Equipos</label>
            <input type='number' onChange={e => setMinTeams(e.target.value)}></input>
            <label>Maximo de Equipos</label>
            <input type='number' onChange={e => setMaxTeams(e.target.value)}></input>
            <button>Enviar</button>
        </form>
    </Wrap>
  )
}

export default NewChallenge