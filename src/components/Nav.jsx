import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Edi from "../assets/img/edi2.png"

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
            <img src={Edi} className='h-full pl-4'/>
        </div>
        <div className='flex justify-end pt-2 gap-3 text-[#ffffff] font-corbel'>
            <div>
                <p className='mt-1'>Hola {user.email}</p>
            </div>
            <div>
                <button onClick={logout} className='border border-teal-400 rounded p-1 hover:bg-teal-400 hover:text-white'>logout</button>
            </div>
        </div>
    </div>
    )
}

export default Nav