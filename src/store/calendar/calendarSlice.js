import { createSlice } from "@reduxjs/toolkit";
//import { addDays, addHours } from "date-fns";

// const tempEvent =   {
//     _id: new Date().getTime(),
//     title: 'Slice Evento',
//     notes: 'Nota en el Slice',
//     start: new Date(),
//     end: addHours( new Date(), 3 ),
//     bgColor: '#orange',
//     user: {
//       _id: '12345',
//       name: 'Fernando xx'
//     }
// };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events:[    
            //tempEvent                                
        ],
        activeEvent:null,

    },
    reducers:{
        onSetActiveEvent:(state, {payload})=>{            
            state.activeEvent=payload;

        },
        onAddNewEvent: (state,{payload})=> {
          state.events.push(payload);
          state.activeEvent=null;  
        },
        onUpdateEvent: (state, {payload})=>{
            state.events=state.events.map(event=>{
            if (event.id===payload.id) {
              return payload;
            }        
            return event;
            });
        },
        onDeleteEvent: (state)=> {
          if (state.activeEvent) {  
          state.events=state.events.filter(event=>event.id!==state.activeEvent.id);
          state.activeEvent = null;
          }
        },
        onLoadEvents: (state, { payload = [] }) => {
          state.isLoadingEvents = false;
          // state.events = payload;
          payload.forEach( event => {
              const exists = state.events.some( dbEvent => dbEvent.id === event.id );
              if ( !exists ) {
                  state.events.push( event )
              }
          })
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = false,
            state.events=[],
            state.activeEvent=null

        }

}
});

export const {onSetActiveEvent,
              onAddNewEvent,
              onUpdateEvent,
              onDeleteEvent,
              onLoadEvents,
              onLogoutCalendar  
            }=calendarSlice.actions;