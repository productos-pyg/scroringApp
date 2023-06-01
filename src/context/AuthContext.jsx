import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged 
        } from "firebase/auth";
import { auth } from "../firebase";

const UsersContext = createContext();

export const AuthContextProvider = ({children}) => {
    const[user, setUser] = useState({});

    const createUser = (email,password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email,password) => signInWithEmailAndPassword(auth, email, password);
    
    const logoutUser = () => signOut(auth);

    useEffect(() => {
      const Salir = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      })
    
      return () => {
        Salir();
      }
    }, [])
    
    console.log(user);
    return(
        <UsersContext.Provider value={{createUser, loginUser, logoutUser, user}}>
            {children}
        </UsersContext.Provider>
    );
}

export const UserAuth = () => useContext(UsersContext);
