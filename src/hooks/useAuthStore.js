import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = ()=>{

    const {status, user, errorMessage} = useSelector(state=>state.auth)  
    const dispatch = useDispatch();

    const startLogin = async ({email,password}) => {
        //console.log(email,password + ' Revisaré credenciales');
        dispatch(onChecking());
        //Conexión con el backend    
         try {
             const {data} = await calendarApi.post('/auth', {email,password});
             console.log({data});
             localStorage.setItem('token',data.token);
             localStorage.setItem('token-init-date', new Date().getTime());
             dispatch(onLogin({name: data.name, uid: data.uid}));

         } catch(error) {
          //console.log(error);
          dispatch(onLogout('Error en la autenticación, login no válido.'));
          setTimeout(()=>{
            dispatch(clearErrorMessage());
          },3)
         }
    }

    //Start register

    const startRegister = async({email,password,name})=>{
        //console.log({email,password,name});
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth/new', {email,password,name});
            console.log({data});
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch(error) {
         console.log(error);
         dispatch(onLogout(error.response.data?.msg || '**'));
         setTimeout(()=>{
           dispatch(clearErrorMessage());
         },5)
        }


    } 



const checkAuthToken = async ()=>{

    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {

        const {data} = await calendarApi.get('auth/renew');
        //console.log({data});
        localStorage.setItem('token',data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin({name:data.name, uid:data.uid}));

    } catch(error) {
        localStorage.clear();
        dispatch(onLogout());

    }

}

const startLogout =()=>{
    localStorage.clear();
    dispatch (onLogout());
}


return {
    //*Propiedades
    status, 
    user, 
    errorMessage,
    //*Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister
}

}