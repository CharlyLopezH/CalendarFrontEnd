import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew=()=>{

    const {openDateModal}= useUiStore();
    const {}=useCalendarStore();
    const  {setActiveEvent} = useCalendarStore();

    const handleClickNew=()=>{

        setActiveEvent({        
            title: 'Hola',
            notes: 'desde FAB',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#40ff00',
            user: {
              _id: '12345',
              name: 'Fernando abyz'
            }
        });
        openDateModal();
    }

    return (
        <>
        <button 
        className="btn btn-primary fab"
        onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>

        </button>
        </>
    )
}