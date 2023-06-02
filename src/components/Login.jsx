import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const[email,setEmail] = useState(""); //estados vacios
  const[password,setPassword] = useState("");
  const {createUser, loginUser} = UserAuth();
  const navigate = useNavigate();
  /* const handleSubmit = async (event) =>{ 
    event.preventDefault(); //evita que el formulario se recargue por defecto 
    console.log(email,password);
    await createUser(email,password);
  }
 */

    const handleSubmit = async (event) =>{
      event.preventDefault();
      await loginUser(email,password);
      navigate("/home");
    }
  return (

    <div>
      <form className='w-max h-max border border-zinc-950 rounded flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='p-1 w-full'>
          <label >E-mail: </label>
        <input className='w-full border border-zinc-950 rounded ' type = "email"  onChange={(event)=>setEmail(event.target.value)}/>
        </div>

        <div className='p-1 w-full'>
          <label>Password: </label>
          <input className='w-full 
                          border 
                          border-zinc-950 
                          rounded' 
                type = "password" 
                onChange={(event)=>setPassword(event.target.value)}
          />
        </div>
        <div className='p-1'>
          <button  className='border border-teal-400 rounded p-1 hover:bg-teal-400 hover:text-whit'>Enviar</button>
        </div>
        
      </form>
    </div>

  )
}

export default Login