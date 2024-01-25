import { useAuthStore } from "../../hooks"

export const Navbar=()=>{

    const {startLogout, user}=useAuthStore();

    return(
        <div className="navbar navbar-dark bg-dark px-1">
            <span className="navbar-brand"> &nbsp;
            {/* <i className="fas fa fa-calendar fa-spin fa-fw"></i> &nbsp; */}
                <i className="fas fa fa-calendar-alt"></i> &nbsp;
                {user.name}
            </span>                      
            
            <button className="btn btn-outline-warning" 
            onClick={startLogout}
            >
                
                <i className="fas fa-sign-out-alt"/>
                    Salir
                
            </button>
        </div>
    )
}