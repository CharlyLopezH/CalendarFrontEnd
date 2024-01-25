import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { getEnvVariables } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter=()=>{
    //Validación
    //const authStatus = 'not-authenticated'; //'not-authenticated'; //authenticated
    console.log('Variables de entorno: '+getEnvVariables);

    const {status, checkAuthToken} = useAuthStore();

    useEffect(()=> {
        checkAuthToken();
    },[])
    
    if (status=='checking') {
        return <h2>Cargando...</h2>
    }

    return(
        <Routes>       
            {
                (status==='not-authenticated')

                 ?(
                    <>
                     <Route path="/auth/*" element={<LoginPage/>}/>                  
                     <Route path="/*" element={<Navigate to="/auth/login"/>}/>
                    </>
                 )
                 :(
                    <>
                     <Route path="/" element={<CalendarPage/>} />
                     <Route path="/*" element={<Navigate to="/"/> } /> 
                    </>    
                 )
            }     
        </Routes>
        
    );
}