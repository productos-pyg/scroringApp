import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Edi from "../assets/img/edi2.png"
import {SlLogout} from "react-icons/sl"
import LogoWhite from "../assets/img/Logo blancoPygmalion-Potencia tus sueños.png"

const Nav = () => {
    const navigate = useNavigate();
    const{logoutUser,user} = UserAuth();
    const logout = async() =>{
        await logoutUser();
        navigate("/");
    }

    return (
    <div className='h-20 flex justify-between shadow-md p-2 bg-gradient-to-r from-[#063653] to-[#1097d5]'>
        <div className='h-14'>
            <img src={LogoWhite} className='h-full pl-4'/>
        </div>
        
        <div className='flex
                        flex-row 
                        items-center
                        justify-end 
                        gap-3 
                        text-xl 
                        text-[#ffffff] 
                        font-corbel'>
            <div className='h-14'>
                <img src={Edi} className='h-full pl-4'/>
            </div>
            <div> 
                <p className='mt-1'>Hola {user.email}</p>
            </div>
            <div>
                <button onClick={logout} className='pt-3
                                                    hover:bg-teal-400   
                                                    hover:text-white
                                                    text-2xl'>
                                                <SlLogout/>
                </button>
            </div>
        </div>
    </div>
    )
}

export default Nav