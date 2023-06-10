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

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0c0c0c] to-[#b2b2b2] ">
      <div>
        <img src={LogoWhite} className='h-10 pl-4 '/>
      </div>
      
      <div className="px-10 py-10 mt-4 text-left shadow-2xl rounded-2xl">
        <h3 className="text-4xl font-bold text-center p-5 ">Login</h3>
        <form className='w-max 
                        h-max  
                        rounded-2xl 
                        flex 
                        flex-col 
                        items-center
                        bg-[#626567]
                        shadow-2xl' 
                onSubmit={handleSubmit}>

          <div className='p-3 w-full'>
            <label className='text-base font-medium'>E-mail: </label>
            <input className='w-full
                              rounded-md' 
                    placeholder="   Email"
                    type = "Email"  
                    onChange={(event)=>setEmail(event.target.value)}/>
          </div>

          <div className='p-3 w-full'>
            <label className='text-base font-medium'>Password: </label>
            <input className='w-full
                            rounded-md'
                  placeholder="   Password" 
                  type = "Password" 
                  onChange={(event)=>setPassword(event.target.value)}
            />
          </div>

          <div className='p-2 pb-5'>
            <button className='px-6 
                              py-2 
                              mt-4 
                              text-white 
                              bg-[#0c0c0c]
                              rounded-lg 
                              hover:bg-sky-100
                              hover:text-[#0c0c0c]'>Enviar</button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Login