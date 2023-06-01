import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const{logoutUser} = UserAuth();
    const logout = async() =>{
        await logoutUser();
        navigate("/");
    }

    return (
    <div className='h-20'>
        <button onClick={logout}>logout</button>
    </div>
    )
}

export default Nav