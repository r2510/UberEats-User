import { createContext, useState, useEffect, useContext } from "react";
import { Auth } from "aws-amplify";

import { DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

//childrem is nothing but rootnavigator as whole application is mounted between AuthContext
const AuthContextProvider = ({ children }) =>{
    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setdBUser] = useState(null);
    const sub = authUser?.attributes?.sub;

    useEffect(()=>{
        Auth.currentAuthenticatedUser({ bypassCache:true }).then(setAuthUser);
        // console.log(authUser);
    }, []);

    useEffect(()=>{
        //this will retur data in array format so we will get 1st element
        DataStore.query(User, (user)=>user.sub.eq(sub)).then((users)=>{
            setdBUser(users[0]);
        });
    }, [sub])
    
    return(
        <AuthContext.Provider value={{authUser, dbUser, sub, setdBUser}}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);