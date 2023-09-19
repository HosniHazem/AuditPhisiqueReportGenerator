import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate   } from 'react-router-dom';


export default function AuthUser(){
    const navigate = useNavigate();
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }
    const [last,setLast] = useState();

    useEffect(() => {
      axios.get('http://webapp.smartskills.local:8000/api/LastOne').then((res) => {

            setLast(res.data.lastProjectId);
   
     
        });
    }, []);



    
 

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());


    const saveToken = (user,token) =>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('project_id',last.id);
        sessionStorage.setItem('project_name',last.Nom);
        sessionStorage.setItem('page',1);
     
        setToken(token);
        
    
    setUser(user);
       navigate("/");
        window.location.reload();
    }

    const logout = () => {
        sessionStorage.clear();
       navigate("/login");
    }



    const http = axios.create({
        baseURL:"http://webapp.smartskills.local:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        }
    });


    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        getUser,
        http,
        logout
    }
}