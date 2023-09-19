import AuthUser from './AuthUser';
import React from 'react'
  
export default function Logout() {
    
    const {token,logout} = AuthUser();

        if(token !== undefined){
            logout();
            window.location.reload();
    }
   
}