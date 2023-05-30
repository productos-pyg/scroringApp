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
      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input type = "email"  onChange={(event)=>setEmail(event.target.value)}/>
        <label>Password</label>
        <input type = "password" onChange={(event)=>setPassword(event.target.value)}/>
        <button>Enviar</button>
      </form>
    </div>
  )
}


export default Login