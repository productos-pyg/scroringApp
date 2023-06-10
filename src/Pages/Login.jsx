import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoWhite from "../assets/img/Logo blancoPygmalion-Potencia tus sueños.png"

const Login = () => {
  const[email,setEmail] = useState(""); //estados vacios
  const[password,setPassword] = useState("");
  const {createUser, loginUser} = UserAuth();
  const navigate = useNavigate();

  /* const handleSubmit = async (event) =>{ 
    event.preventDefault(); //evita que el formulario se recargue por defecto 
    console.log(email,password);
    await createUser(email,password);
  }*/

    const handleSubmit = async (event) =>{
      event.preventDefault();
      await loginUser(email,password);
      navigate("/home");
    }
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#063653] to-[#1097d5] ">
      <div className='flex center items-center justify-center '>
        <img className='w-2/5' src={LogoWhite} />
      </div>
      
      <div className="px-10 py-10 mt-4 text-left shadow-2xl rounded-2xl">
        <h3 className="text-4xl font-corbel text-center p-5  text-[#ffffff]">Login</h3>
        <form className='w-max 
                        h-max  
                        rounded-2xl 
                        flex 
                        flex-col 
                        items-center
                        bg-[#1097d557]
                        shadow-2xl' 
                onSubmit={handleSubmit}>

          <div className='p-3 w-full'>
            <label className='text-base font-corbel text-[#ffffff]'>E-mail: </label>
            <input className='w-full
                              pl-3
                              rounded-md' 
                    placeholder="Email"
                    type = "Email"  
                    onChange={(event)=>setEmail(event.target.value)}/>
          </div>

          <div className='p-3 w-full'>
            <label className='text-base font-corbel text-[#ffffff]'>Password: </label>
            <input className='w-full
                              pl-3
                              rounded-md'
                  placeholder="Password" 
                  type = "Password" 
                  onChange={(event)=>setPassword(event.target.value)}
            />
          </div>

          <div className='p-2 pb-5'>
            <button className='px-6 
                              py-2 
                              mt-4
                              font-corbel
                              text-white 
                              bg-[#1097d5]
                              rounded-lg 
                              hover:bg-sky-100
                              hover:text-[#1097d5]'>Enviar</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Login